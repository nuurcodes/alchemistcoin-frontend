import { ethers, Signer } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { config } from '../config/variables';
import { aludelAbi } from '../abi/aludelAbi';
import { _abi } from '../interfaces/Erc20DetailedFactory';

const { aludelAddress, mistTokenAddress, wethAddress, rewardPool } = config;

interface EtherRewards {
  currStakeRewards: string;
  currVaultRewards: string;
  stakeRewardsIn30Days: string;
  vaultRewardsIn30Days: string;
}

interface Rewards {
  etherRewards: number;
  tokenRewards: number;
}

interface Crucible {
  id: string;
  balance: string;
  lockedBalance: string;
}

export async function getNetworkStats(signer: Signer) {
  const aludel = new ethers.Contract(aludelAddress, aludelAbi, signer);
  const [
    ,
    ,
    ,
    rewardScaling, // arrray of big numbers, floor ceiling time
    rewardSharesOutstanding,
    totalStake,
    totalStakeUnits,
    lastUpdate,
    rewardSchedules,
  ] = await aludel.getAludelData();

  const [duration, start, shares] = rewardScaling;
  const [floor, ceiling, time] = rewardSchedules[0];
  return {
    duration: duration.toNumber(),
    start: start.toNumber(),
    shares: formatUnits(shares),
    floor: formatUnits(floor),
    ceiling: formatUnits(ceiling),
    time: formatUnits(time),
    rewardSharesOutstanding: formatUnits(rewardSharesOutstanding),
    totalStake: formatUnits(totalStake),
    totalStakeUnits: formatUnits(totalStakeUnits),
    lastUpdate: lastUpdate.toNumber(),
  };
}

// 1. (current rewards / available rewards) * (available eth / total eth) * total mist
// 2. Your portion of reward pool * fraction of eth pool currently unlocked * total mist
// 3. (Your staking units / Total units) * (getCurrentUnlockedRewards: Eth / total reward pool in Eth) * total mist

// Returns array with vault rewards (current and projected)
export async function getUserRewards(
  signer: any,
  crucibles: Crucible[]
): Promise<EtherRewards[]> {
  let plusOneMonth = Date.now() + 60 * 60 * 24 * 30;
  const aludel = new ethers.Contract(aludelAddress, aludelAbi, signer);
  const crucibleRewards = [];
  for (let i = 0; i < crucibles.length; i++) {
    let [
      currStakeRewards,
      currVaultRewards,
      stakeRewardsIn30Days,
      vaultRewardsIn30Days,
    ] = await Promise.all([
      aludel
        .getCurrentStakeReward(crucibles[i].id, crucibles[i].lockedBalance)
        .then(formatUnits),
      aludel.getCurrentVaultReward(crucibles[i].id).then(formatUnits),
      aludel
        .getFutureStakeReward(
          crucibles[i].id,
          crucibles[i].lockedBalance,
          plusOneMonth
        )
        .then(formatUnits),
      aludel
        .getFutureVaultReward(crucibles[i].id, plusOneMonth)
        .then(formatUnits),
    ]);
    crucibleRewards.push({
      currStakeRewards,
      currVaultRewards,
      stakeRewardsIn30Days,
      vaultRewardsIn30Days,
    });
  }
  return crucibleRewards;
}

// Calculate mist rewards based on eth
// eth rewards / total eth pool * total mist rewards (remaining rewards)
export async function calculateMistRewards(
  signer: any,
  weiRewards: number
): Promise<Rewards> {
  // const aludel = new ethers.Contract(args.aludel, aludelAbi, signer);
  // Bonus token (mist) & Reward Pool Addreess
  let weth = new ethers.Contract(
    wethAddress, // bonus token address
    _abi,
    signer
  );
  let bonusMistToken = new ethers.Contract(
    mistTokenAddress, // bonus token address
    _abi,
    signer
  );

  let [totalWeiRewards, totalMistRewards] = await Promise.all([
    weth.balanceOf(rewardPool),
    bonusMistToken.balanceOf(rewardPool),
  ]);

  let mistRewards = (totalMistRewards * weiRewards) / totalWeiRewards;
  return { tokenRewards: mistRewards, etherRewards: weiRewards };
}
