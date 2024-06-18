import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex, IconButton, Image, Button, Box, Spacer, Menu, MenuButton, MenuList, MenuItem, VStack, Text, useMediaQuery, useBreakpointValue, Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, Icon, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { IoMdAdd, IoIosArrowDown, IoMdSettings } from 'react-icons/io';
import { FiArrowRightCircle, FiBell, FiMessageCircle } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';
import RedditLogo from "../logos/main-logo.svg"
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import ResponsiveLogo from '../logos/ResponsiveLogo.svg';
import { logout } from '../../slice/FormSlice';
import SearchBar from '../Searchbar';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import Community from '../CommunityModal';
import { resetUserVotes } from '../../slice/userVoteSlice';

const LoggedBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isUse, onUse, onSwitch } = useDisclosure();
  const dispatch = useDispatch();
  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");
  const username = useSelector((state) => state.form.user.user);
  

  
  const drawerWidth = useBreakpointValue({ base: 'full', lg: '400px' });

  const logoutHandler = async () => {
    try {
     
      dispatch(resetUserVotes());
  
      
      await dispatch(logout()).unwrap();
  
      
      window.location.href = '/';
    } catch (error) {
    
      console.error('Logout failed:', error);
    }
  };
  

  const iconButtons = [
    { icon: <FiArrowRightCircle size="1.5em" />, label: 'Home', to: '/' },
    { icon: <FiMessageCircle size="1.5em" />, label: 'Messages', to: '/messages' },
    { icon: <FiBell size="1.5em" />, label: 'Notifications', to: '/notifications' },
    { icon: <IoMdAdd size="1.5em" />, label: 'Create Post', to: '/submit' },
  ];

  const IconButtonComponent = ({ icon, label, to }) => (
    <Link to={to || '#'}>
      <Button variant="unstyled">
        <Flex align="center">
          {icon}
        </Flex>
      </Button>
    </Link>
  );


  const [toggle, setToggle] = useState(false);

  const toggleCommunityModal = () => {
    setToggle(!toggle)
    console.log(toggle)
  }
  

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex bg="reddit.dark" borderBottom={{ base: '2px solid #202329', md: '1px solid #202329' }} color="white" align="center" justifyContent="space-between" px={2}>
      <Flex alignItems="center" justifyContent="flex-start" minWidth="10%">
        {isMobile && (
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            color="gray.200"
            background="none"
            fontSize="30px"
            _hover={{ background: "none" }}
            display={{ base: 'flex', md: 'flex' }}
          />
        )}
        <Image
          src={isMobile ? ResponsiveLogo : RedditLogo}
          alt="Reddit Logo"
          width={isMobile ? '60px' : '100px'}
          height={isMobile ? '35px' : '60px'}
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="reddit.dark" width={drawerWidth}>
          <DrawerCloseButton color="white" />
          <DrawerHeader></DrawerHeader>
          <DrawerBody padding={0}>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Menu isLazy color="reddit.400">
        <MenuButton p={2} borderRadius="5px" _hover={{ background: "#202329" }}>
          <Box _hover={{ background: "#202329" }}>
            <Flex align="center">
              <FaHome style={{ fontSize: "28px" }} />
              {!isMobile && (<Text mx={2}>Home</Text>)}
              <Spacer />
              <IoIosArrowDown />
            </Flex>
          </Box>
        </MenuButton>
        <MenuList background="#202329" color="reddit.400">
          <MenuItem onClick={toggleCommunityModal} background="#202329" color="gray.300"><Icon as={AddIcon} mr={2}/> Create a new Community</MenuItem>
          
        </MenuList>
      </Menu>
        


      <Box flex={1} display="flex" justifyContent="center">
        {!isMobile && (
          <Box>
            <SearchBar />
          </Box>
        )}
      </Box>

      {!isMobile && iconButtons.map((button, index) => (
        <IconButtonComponent key={index} icon={button.icon} label={!isSmallScreen && button.label} to={button.to} />
      ))}

      <Menu isLazy background="#202329" color="reddit.400">
        <MenuButton>
          <VStack>
            <Box fontWeight="bold" pr={2}>
              <Text fontSize='xs'>{username}</Text>
            </Box>
            <Box ml={1} pr={2} color="orange.400" fontSize="sm">
              <Flex> <IoMdSettings /> <Text fontSize='xs' ml={1}>1 Karma</Text></Flex>
            </Box>
          </VStack>
        </MenuButton>
        <IoIosArrowDown />
        <MenuList background="#202329" color="gray.300">
          <MenuItem background="#202329" color="gray.300" onClick={logoutHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
      {toggle && <Community isUse={toggle} onSwitch={toggleCommunityModal} />}
    </Flex>
  );
};

export default LoggedBar;
