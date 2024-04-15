import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import NewBar from './components/Navbar/NewBar';
import LoggedBar from './components/Navbar/LoggedBar';
import CreatePost from './components/post/createPost';
import AllPosts from './components/post/allPosts';
import Sidebar from './components/Navbar/Sidebar';
import { useSelector } from 'react-redux';
import { HomeCreate } from './components/post/Homecreate';
import { Home } from './components/Home';

function App() {
  const loggedIn = useSelector((state) => state.form.isLoggedIn);
  const isMobile = useBreakpointValue({ base: true, md:true, lg: false });
 
  

  return (
    <Router>
      <Flex background="reddit.dark" direction="column" h="100vh">
        {loggedIn ? <LoggedBar /> : <NewBar />}
        <Flex overflow="hidden">
          {!isMobile ? <Sidebar /> : null }
         
          <Flex direction="column" flexGrow={0.8} overflowY="none">
            <div className="App-header">
            
              <Routes>
                <Route path="/submit" element={<CreatePost />} />
                <Route path="/" element={ <Home />} />
              </Routes>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Router>
  );
}

export default App;
