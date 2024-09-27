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
  Flex, 
  useBreakpointValue
} from '@chakra-ui/react';
import { SidebarData } from './SidebarData';


const Sidebar = ({sidebarWidth}) => {
  const drawerWidth = useBreakpointValue({ base: 'full', lg: '300px' });

  return (
    <Box  width={drawerWidth}  background="white"  borderRight="1px solid #E2E8F0" color="white" overflowY="auto">
      <Accordion allowToggle>
        {SidebarData.map((item, index) => (
          <AccordionItem key={index} border="none">
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton _hover={{ background: "gray.100" }} p={3}>
                    <Flex flex={1} >
                      <Icon  as={item.icon} fontSize="24px" color="gray.400" mr={2} />
                      <Text fontWeight={500} color="black">{item.title}</Text>
                    </Flex>
                    {item.subNav && <AccordionIcon color={"gray.400"} />}
                  </AccordionButton>
                </h2>
                {item.subNav && (
                  <AccordionPanel pl={8} pb={4}>
                    <VStack align="start">
                      {item.subNav.map((subItem, subIndex) => (
                        <Link key={subIndex} href={subItem.link} _hover={{ textDecoration: 'none', w: "100%", borderRadius: "10px" }}>
                          <Flex align="center" gap={2}>
                            <Icon color={"gray.400"} as={subItem.icon} mr={2} />
                            <Text fontWeight={400} color="black">{subItem.title}</Text>
                          </Flex>
                        </Link>
                      ))}
                    </VStack>
                  </AccordionPanel>
                )}
                {item.subNav ? <Divider  /> : null}
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default Sidebar;
