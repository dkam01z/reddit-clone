import React from "react";
import { Box, Flex, Image, Input, Button, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaChartBar, FaChevronDown, FaFire, FaRocket, FaSun } from "react-icons/fa";

export const Category = () => {

    const containerWidth = useBreakpointValue({ base: "100%", sm: "100%", md: "100%" });
    const fontWidth = useBreakpointValue({ base: "10px", sm: "20px", md: "17px" });

    const buttons = [
        {title: "Best", icon: <FaRocket/>, to: "/best" },
        {title: "Hot", icon: <FaFire/>, to: "/hot" },
        {title: "New", icon: <FaSun/>, to: "/new" },
        {title: "Top", icon: <FaChartBar/>, to: "/top" }
    ]

    const boxWidth = useBreakpointValue({
        base: '350px',
        sm: '500px',
        md: '600px',
        xl: '700px',
      });
    

    return (


        <Flex
      
        justifyContent="flex-start"
        w={boxWidth}
        py={4}
    >
        <Box
            boxShadow="lg"
            borderWidth="1px"
            borderRadius="5px"
            bg="white"
            borderColor="gray.300"
            p={2}
            w={containerWidth}
            display="flex"
            justifyContent="flex-start"
            height="auto"
            

        >
           
            
              
           
            {buttons.map((items,key) => (
                <Link to={items.to} key={key}>
                    <Flex>
                        <Button fontSize={fontWidth}  color="gray.400" background="none" leftIcon={items.icon}>
                            {items.title}
                        </Button>
                    </Flex>
                </Link>
            ))}

        
                <Button borderRadius="20px" rightIcon={<FaChevronDown/>} background="none" color="gray.400">
                    Today
                </Button>
                
      
        </Box>
    </Flex>
    )
}