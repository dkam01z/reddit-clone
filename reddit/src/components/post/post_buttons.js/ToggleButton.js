import React from 'react';
import { Button } from '@chakra-ui/react';

const ToggleButton = ({ isActive, onClick, icon, children, ...props }) => {
  return (
    <Button
      {...props}
      
      bg={isActive ? 'gray.100' : "white"}
      color={isActive ? "#3182ce" : "gray.500"}
      onClick={onClick}
    >
      {icon} {children}
    </Button>
  );
};

export default ToggleButton;
