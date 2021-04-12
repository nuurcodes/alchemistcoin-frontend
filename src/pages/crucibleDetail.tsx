import { Center, Flex, Box, HStack, Text } from '@chakra-ui/layout';
import { Button, IconButton } from '@chakra-ui/button';
import { useHistory } from 'react-router-dom';
import { IoArrowBack, IoSendSharp } from 'react-icons/io5';

const CrucibleDetail = () => {
  const history = useHistory();
  return (
    <Center>
      <Flex
        p={8}
        bg='gray.800'
        flexDir='column'
        mt={[32, 32, 40]}
        textAlign='center'
        width={['100%', '100%', 480]}
        borderRadius='3xl'
        boxShadow='xl'
        minH='400px'
      >
        <Flex justifyContent='space-between' alignItems='center'>
          <Button
            aria-label='Back to all crucibles'
            size='sm'
            bg='none'
            fontSize='lg'
            color='gray.300'
            leftIcon={<IoArrowBack />}
            onClick={() => history.push('/')}
            _hover={{ bg: 'none', color: 'gray.800' }}
            _active={{ bg: 'none' }}
          >
            All Crucibles
          </Button>
          <Button
            aria-label='Transfer Crucible'
            size='sm'
            bg='none'
            fontSize='lg'
            color='gray.300'
            leftIcon={<IoSendSharp />}
            onClick={() => history.push('/')}
            _hover={{ bg: 'none', color: 'gray.800' }}
            _active={{ bg: 'none' }}
          >
            Transfer Crucible
          </Button>
        </Flex>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box flexGrow={1} mt={8}>
            <HStack>
              <Box
                boxSize='38px'
                bgGradient='linear(to-tr, cyan.200, yellow.500)'
                borderRadius='md'
              />
              <Box textAlign='left'>
                <Text>ID: 0x123</Text>
                {/* TODO, make sure all the data is in context */}
                <Text fontSize='sm' color='gray.400'>
                  Minted 3 March 2021
                </Text>
              </Box>
            </HStack>
          </Box>
          {/* <Box>
          <IconButton
            aria-label='Manage crucible'
            size='sm'
            bg='none'
            fontSize='2xl'
            color='gray.300'
            icon={<IoArrowRedoCircleSharp />}
            onClick={() => history.push('/crucible', { crucible })}
            _hover={{ bg: 'none', color: 'gray.800' }}
            _active={{ bg: 'none' }}
          />
          <IconButton
            aria-label='Quick view'
            size='sm'
            bg='none'
            fontSize='2xl'
            color='gray.300'
            icon={<IoChevronDownCircle />}
            onClick={() => setShowDetails(!showDetails)}
            _hover={{ bg: 'none', color: 'gray.800' }}
            _active={{ bg: 'none' }}
          />
        </Box> */}
        </Flex>
      </Flex>
    </Center>
  );
};

export default CrucibleDetail;
