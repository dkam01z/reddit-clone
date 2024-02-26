import React, { useState } from 'react';
import { Box, Button, Flex, IconButton, Image, useBreakpointValue } from '@chakra-ui/react';
import Login from '../Login';
import SearchBar from '../Searchbar';
import { FaDownload, FaEllipsisH, FaSearch } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
import ResponsiveLogo from '../logos/ResponsiveLogo.svg';
import RedditLogo from '../logos/main-logo.svg';

function NewBar() {
  const [loginForm, setLoginForm] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md:false, lg: false });

  const toggleLogin = () => {
    setLoginForm(!loginForm);
  };

  return (
    <Box as="nav" bg="reddit.dark" py={{ base: 3, md: 2 }} px={2}>
      <Flex   alignItems="center"
      borderBottom={{ base: '2px solid #202329', md: '1px solid #202329' }}
      justifyContent="space-between"
      w="100%"
      pb={{ base: 2, md: 2 }} >
        
    
        <Flex alignItems="center" justifyContent="flex-start" minWidth="10%">

          {isMobile ?           <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            color="gray.200"
            background="none"
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

        {/* Center Section: Logo and SearchBar/SearchIcon */}
        <Flex alignItems="center" justifyContent="center" flexGrow={1}>

          {!isMobile ? <SearchBar /> : null}
        </Flex>

        {/* Right Section: Get App and Login Buttons */}
        <Flex alignItems="center" justifyContent="flex-end" minWidth="10%">



        <Button
                onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.reddit.frontpage&hl=en&gl=US&pli=1'}
                _hover={{ bg: 'reddit.200' }}
                borderRadius="full"
                colorScheme="reddit"
                mr={4}
                leftIcon={<FaDownload/>}
                color="gray.200"
              >
                Get App
              </Button>

              <IconButton
              aria-label="Search"
              icon={<FaSearch />}
              variant="ghost"
              color="gray.200"
              onClick={() => {/* Define action for search icon */}}
              display={{ base: 'flex', md: 'none' }}
              background="none"
              _hover={{background:"none"}}
              
            />

          {!isMobile && (
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
              <IconButton color="gray.300" borderRadius="full" m={3} icon={<FaEllipsisH/>} background="none" _hover={{background: "#202329"}}>

              </IconButton>
            </>
          )}


        </Flex>
      </Flex>
      {loginForm && <Login isOpen={loginForm} onClose={toggleLogin} />}
    </Box>
  );
}

export default NewBar;
