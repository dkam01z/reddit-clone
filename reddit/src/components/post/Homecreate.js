import React from "react";
import { Box, Flex, Image, Input, Button, useBreakpointValue } from "@chakra-ui/react";
import pfp from '../logos/pfp.png';
import { FaImage, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

export const HomeCreate = () => {
    // Responsive width for the input box and the container
    const boxWidth = useBreakpointValue({
        base: '350px',
        sm: '500px',
        md: '600px',
        xl: '700px',
      });
    
    const containerWidth = useBreakpointValue({ base: "80%", sm: "100%", md: "100%" });

    return (
        <Flex paddingTop={5}  
            maxW={boxWidth}
            boxShadow="lg"
        >
            <Box
                borderWidth="1px"
                borderRadius="5px"
                bg="white"
                borderColor="gray.300"
                p={2}
                w={containerWidth} 
                display="flex"
                alignItems="center"
            >
                <Image borderRadius="full" boxSize="40px" src={pfp} mr={4} />
                <Link to="/submit" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Input
                        placeholder="What's on your mind?"
                        border="none"
                        bg="gray.100"
                        _placeholder={{ color: "gray.500" }}
                       
                        _focus={{ outline: "none" }}
                        mr={2} 
                    />
                </Link>
                <Button  _hover={{ bg: "gray.400" }} variant="ghost" color="gray.300" mr={2}>
                    <FaImage />
                </Button>
                <Button   _hover={{ bg: "gray.400" }} variant="ghost" color="gray.300">
                    <FaLink />
                </Button>
            </Box>
        </Flex>
    );
};
