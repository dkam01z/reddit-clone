import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  IconButton,
  Image,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import Login from '../Login';
import SearchBar from '../Searchbar';
import { FaDownload, FaSearch } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
import ResponsiveLogo from '../logos/ResponsiveLogo.svg';
import RedditLogo from '../logos/main-logo.svg';
import Sidebar from './Sidebar';

function NewBar() {
  const [loginForm, setLoginForm] = useState(false);
  const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleLogin = () => {
    setLoginForm(!loginForm);
  };

  return (
    <Box as="nav" bg="reddit.dark" py={{ base: 3, md: 2 }} px={2}>
      <Flex
        alignItems="center"
        borderBottom={{ base: '2px solid #202329', md: '1px solid #202329' }}
        justifyContent="space-between"
        w="100%"
        pb={{ base: 2, md: 2 }}
      >
        <Flex alignItems="center" justifyContent="flex-start" minWidth="10%">
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
              color="gray.200"
              fontSize="30px"
              background="none"
              _hover={{ background: "none" }}
              display={{ base: 'flex', md: 'none' }}
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
          <DrawerContent bg="reddit.dark">
            <DrawerCloseButton color="white" />
            <DrawerHeader></DrawerHeader>
            <DrawerBody padding={0}>
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

    
        <Box flex={1} display={{ base: 'none', md: 'flex' }} justifyContent="center">
          <SearchBar />
        </Box>

    
        <Flex alignItems="center" justifyContent="flex-end" minWidth="10%">
          <Button
            onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.reddit.frontpage&hl=en&gl=US&pli=1'}
            _hover={{ bg: 'reddit.200' }}
            borderRadius="full"
            colorScheme="reddit"
            mr={4}
            leftIcon={<FaDownload />}
            color="gray.200"
          >
            Get App
          </Button>

          {isMobile ? (
            <IconButton
              aria-label="Search"
              icon={<FaSearch />}
              onClick={toggleLogin}
              variant="ghost"
              color="gray.200"
              display={{ base: 'flex', md: 'none' }}
              background="none"
              _hover={{ background: "none" }}
            />
          ) : (
            <>
              <Button
                onClick={toggleLogin}
                borderRadius="full"
                bg="reddit.100"
                color="white"
                _hover={{ bg: 'reddit.100' }}
              >
                Login
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {loginForm && <Login isOpen={loginForm} onClose={toggleLogin} />}
    </Box>
  );
}

export default NewBar;
