import React from 'react';
import {
  Box,
  VStack,
  Text,
  Link,
  Icon,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex 
} from '@chakra-ui/react';
import { SidebarData } from './SidebarData';

const Sidebar = () => {
  return (
    <Box ml={2} background="reddit.dark" borderRight="1px solid #202329" w="250px" color="white" h="100vh" overflowY="auto">
      <Accordion allowToggle>
        {SidebarData.map((item, index) => (
          <AccordionItem key={index} border="none">
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton _hover={{ background: "#202329" }} p={3}>
                    <Flex flex={1} >
                      <Icon as={item.icon} fontSize="24px" color="gray.300" mr={2} />
                      <Text color="gray.200">{item.title}</Text>
                    </Flex>
                    {item.subNav && <AccordionIcon />}
                  </AccordionButton>
                </h2>
                {item.subNav && (
                  <AccordionPanel pl={8} pb={4}>
                    <VStack align="start">
                      {item.subNav.map((subItem, subIndex) => (
                        <Link key={subIndex} href={subItem.link} _hover={{ textDecoration: 'none', bg: '#202329', w: "100%", borderRadius: "10px" }}>
                          <Flex align="center" gap={2}>
                            <Icon as={subItem.icon} mr={2} />
                            <Text>{subItem.title}</Text>
                          </Flex>
                        </Link>
                      ))}
                    </VStack>
                  </AccordionPanel>
                )}
                {item.subNav ? <Divider borderColor="#202329" /> : null}
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default Sidebar;
