// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Flex, useBreakpointValue, Box } from '@chakra-ui/react';
import NewBar from './components/Navbar/NewBar';
import LoggedBar from './components/Navbar/LoggedBar';
import CreatePost from './components/post/createPost';
import AllPosts from './components/post/allPosts';
import Sidebar from './components/Navbar/Sidebar';
import { useSelector } from 'react-redux';
import { HomeCreate } from './components/post/Homecreate';
import { Home } from './components/Home';
import ProgressBar from './components/ProgressBar'; 
import PostDetail from './components/post/PostDetail';
import CommunityHome from './components/CommunityHome';

function App() {
  const loggedIn = useSelector((state) => state.form.isLoggedIn);
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });

  return (
    <Router>
      <ProgressBar /> 
      <Flex background="reddit.dark" direction="column">
        {loggedIn ? <LoggedBar /> : <NewBar />}
        <Flex>
          {!isMobile ? <Sidebar /> : null}
          <Flex direction="column" flexGrow={1}>
            <div className="App-header">
           
              <Box>
             
              <Routes>
                <Route path="/submit" element={<CreatePost />} />
                <Route path="/" element={<Home />} />
                <Route path="/post/:postId" element={<PostDetail />}/>
                <Route path="r/:communityName" element={<CommunityHome/>}/>
              </Routes>
              </Box>
       
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Router>
  );
}

export default App;
