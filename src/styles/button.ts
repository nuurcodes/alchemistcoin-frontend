export const Button = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'xl',
  },
  sizes: {
    sm: {
      fontSize: '12px',
      padding: '16px',
    },
    md: {
      fontSize: '18px',
      padding: '24px',
    },
    lg: {
      fontSize: '24px',
      padding: '32px',
    },
  },
  variants: {
    solid: {
      bg: 'yellow.500',
      color: 'gray.800',
      _hover: {
        bg: 'yellow.400',
      },
      _active: {
        bg: 'yellow.400',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};
