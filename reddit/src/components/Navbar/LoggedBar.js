import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, IconButton, Image, Button, Box, Spacer, Menu, MenuButton, MenuList, MenuItem, VStack, Text, useMediaQuery, useBreakpointValue } from '@chakra-ui/react';
import { IoMdAdd, IoIosArrowDown, IoMdSettings } from 'react-icons/io';
import { FiArrowRightCircle, FiBell, FiMessageCircle } from 'react-icons/fi';
import { FaHome, FaSearch } from 'react-icons/fa';
import RedditLogo from "../logos/main-logo.svg"
import { HamburgerIcon } from '@chakra-ui/icons';
import ResponsiveLogo from '../logos/ResponsiveLogo.svg';
import { logout } from '../../slice/FormSlice';
import SearchBar from '../Searchbar';
import { Link } from 'react-router-dom';



const LoggedBar = () => {


  const dispatch = useDispatch();
  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");
  const username = useSelector((state) => state.form.user.user); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoutHandler = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  const iconButtons = [
    { icon: <FiArrowRightCircle size="1.5em" />, label: 'Home', to: '/' },
    { icon: <FiMessageCircle size="1.5em" />, label: 'Messages', to: '/messages' },
    { icon: <FiBell size="1.5em" />, label: 'Notifications', to: '/notifications' },
    { icon: <IoMdAdd size="1.5em" />, label: 'Create Post', to: '/submit' },
  ];

  const IconButtonComponent = ({ icon, label, to }) => (
    <Link to={to || '#'}>
      <Button  variant="unstyled">
        <Flex align="center">
          {icon}        
        </Flex>
      </Button>
    </Link>
  );

  const isMobile = useBreakpointValue({ base: true, md:true, lg: false });

  return (
    <Flex bg="reddit.dark" borderBottom={{ base: '2px solid #202329', md: '1px solid #202329' }} color="white" align="center" justifyContent="space-between" px={2}>
        <Flex  alignItems="center" justifyContent="flex-start" minWidth="10%">

        {isMobile ?           <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="gray.200"
          background="none"
          fontSize="30px"
          _hover={{background:"none"}}
          display={{ base: 'flex', md: 'flex' }}
        />: null}
                <Image
          src={isMobile ? ResponsiveLogo : RedditLogo}
          alt="Reddit Logo"
          width={isMobile ? '60px' : '100px'}
          height={isMobile ? '35px' : '60px'}
        />
        </Flex>

      {!isMobile && (<Menu isLazy color="reddit.400">
      <MenuButton p={2} borderRadius="5px" _hover={{background:"#202329"}} >
        <Box _hover={{background: "#202329"}}>
      <Flex  align="center">
            
            <FaHome style={{ fontSize: "28px" }}  />
            {!isSmallScreen && < Text mx={2}>Home</Text>}
            <Spacer />
            <IoIosArrowDown />
            
      </Flex>
      </Box>
      </MenuButton  >
        
        <MenuList  background="#202329" color="reddit.400">
          <MenuItem background="#202329" color="gray.300" >Home</MenuItem>

        </MenuList>
      </Menu>)}

      <Spacer />

      {!isMobile && (      <Box flex={1} maxW="600px">
        <SearchBar />
      </Box>)}

      <Spacer />

       {isMobile && (
      <Box mr={5}>
      <FaSearch/>
      </Box>)}     

     

      {!isMobile && iconButtons.map((button, index) => (
     
        <IconButtonComponent  key={index} icon={button.icon} label={!isSmallScreen && button.label} to={button.to} />
      
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
        <MenuList background="#202329" color="gray.300"  >
          <MenuItem background="#202329" color="gray.300"  onClick={logoutHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>




    </Flex>
  );
};

export default LoggedBar;
