import React, { useState } from "react";
import { Stack, Input, InputGroup, InputLeftElement, Box, useBreakpointValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar() {
  const searchWidth = useBreakpointValue({ base: '100%', sm: '100%', md: '400px', xl: '900px' });
  const [term, setTerm] = useState(false);
  

  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Box as={SearchIcon} color="gray.100" />
        </InputLeftElement>

        <Input
          placeholder="Search Reddit"
          size="lg"
          variant="filled"
          borderRadius="20px"
          bg="#202329"
          height="40px"
          width={searchWidth}
          color="gray.300"
          _hover={{ bg: "#202329" }} 
          _focus={{ borderColor: "#202329", boxShadow: "none" }}

        />
      </InputGroup>
    </Stack>
  );
}

export default SearchBar;
