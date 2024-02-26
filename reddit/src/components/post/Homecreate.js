import React from "react";
import { Box, Flex, Image, Input, Button, useBreakpointValue } from "@chakra-ui/react";
import pfp from '../logos/pfp.png';
import { FaImage, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

export const HomeCreate = () => {
    // Responsive width for the input box and the container
    
    const containerWidth = useBreakpointValue({ base: "80%", sm: "100%", md: "100%" });

    return (
        <Flex
            direction="column"
            w="full"
            alignItems="center"
            justifyContent="center"
            py={4}
        >
            <Box
                borderWidth="1px"
                borderRadius="5px"
                bg="reddit.400"
                borderColor="gray.600"
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
                        bg="reddit.secondary"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "reddit.secondary" }}
                        _focus={{ outline: "none" }}
                        mr={2} 
                    />
                </Link>
                <Button  _hover={{ bg: "reddit.secondary" }} variant="ghost" color="gray.200" mr={2}>
                    <FaImage />
                </Button>
                <Button   _hover={{ bg: "reddit.secondary" }} variant="ghost" color="gray.200">
                    <FaLink />
                </Button>
            </Box>
        </Flex>
    );
};
