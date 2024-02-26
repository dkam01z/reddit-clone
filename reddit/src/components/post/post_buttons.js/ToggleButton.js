import React from 'react';
import { Button } from '@chakra-ui/react';

const ToggleButton = ({ isActive, onClick, icon, children, ...props }) => {
  return (
    <Button
      {...props}
      bg={isActive ? 'gray.700' : "reddit.400"}
      _hover={{ bg: 'gray.700' }}
      onClick={onClick}
    >
      {icon} {children}
    </Button>
  );
};

export default ToggleButton;
