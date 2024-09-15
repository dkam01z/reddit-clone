import React, { useState } from "react";
import { Stack, Input, InputGroup, InputLeftElement, Box, useBreakpointValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar() {
  const searchWidth = useBreakpointValue({ base: '100%', sm: '100%', md: '500px', xl: "700px"});
  const [term, setTerm] = useState(false);
  

  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Box as={SearchIcon} color="gray.400" />
        </InputLeftElement>

        <Input
          placeholder="Search Reddit"
          size="lg"
          variant="filled"
          borderRadius="20px"
          bg="gray.200"
          height="40px"
          width={searchWidth}
          color="black"
         
          _focus={{ borderColor: "gray.400", boxShadow: "none" }}

        />
      </InputGroup>
    </Stack>
  );
}

export default SearchBar;
