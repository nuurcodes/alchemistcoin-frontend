import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { Button } from '../styles/button';
import { Heading } from '../styles/heading';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  colors: {
    gray: {
      50: '#EFEFF6',
      100: '#D4D2E5',
      200: '#B8B5D4',
      300: '#9C98C3',
      400: '#807BB2',
      500: '#645EA1',
      600: '#504B81',
      700: '#3C3960',
      800: '#24223A',
      900: '#141320',
    },
    yellow: {
      50: '#FFF9E5',
      100: '#FFEDB8',
      200: '#FFE28A',
      300: '#FFD65C',
      400: '#FFCB2E',
      500: '#FFBF00',
      600: '#CC9900',
      700: '#997300',
      800: '#664C00',
      900: '#332600',
    },
    cyan: {
      50: '#E6F9FE',
      100: '#B9EEFD',
      200: '#8DE3FC',
      300: '#60D8FB',
      400: '#33CDFA',
      500: '#06C2F9',
      600: '#059BC7',
      700: '#047495',
      800: '#034D63',
      900: '#012732',
    },
  },
  textStyles: {
    body: {
      fontFamily: 'Poppins, sans-serif',
    },
    heading: {
      fontFamily: 'Poppins, sans-serif',
    },
    mono: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  components: {
    Heading,
    Button,
  },
});

export default customTheme;
