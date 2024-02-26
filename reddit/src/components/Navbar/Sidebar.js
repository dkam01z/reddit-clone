import React, { useState } from 'react';
import { Box, VStack, Flex, Text, Link, Icon, Divider, Collapse, Button } from '@chakra-ui/react';
import { SidebarData } from './SidebarData';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Box ml={2} background="reddit.dark" borderRight="1px solid #202329" w="250px" color="white" h="100vh" overflowY="auto">
      <VStack spacing={0} align="stretch">
        {SidebarData.map((item, index) => (
          <Box key={index}>
            <Flex
              align="center"
              p={3}
              role="group"
              cursor="pointer"
              onClick={() => {
                item.subNav && handleToggle(index);
              }}
              _hover={{ background: "#202329" }}
            >
              <Icon as={item.icon} fontSize="24px" color="gray.300" mr={2} />
              <Text color="gray.200" flex={1}>{item.title}</Text>
              {item.subNav &&
                (activeIndex === index ? <ChevronUpIcon /> : <ChevronDownIcon />)
              }
            </Flex>
            {item.subNav && (
              <Collapse in={activeIndex === index} animateOpacity>
                <VStack pl={8} pb={2} align="start">
                  {item.subNav.map((subItem, subIndex) => (
                    <Link key={subIndex} p={2} href={subItem.link} _hover={{ textDecoration: 'none', bg: '#202329' , w:"100%", borderRadius:"10px" }}>
                       
                       <Flex align="center" gap="2">
                        {<subItem.icon/>}
                        <Text>{subItem.title}</Text>
                        </Flex>
                    </Link>
                  ))}
                </VStack>
              </Collapse>
            )}
            {item.subNav ? <Divider borderColor="#202329" /> : null}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
