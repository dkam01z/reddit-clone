import React from "react";
import { HomeCreate } from "./post/Homecreate";
import AllPosts from "./post/allPosts";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Category } from "./post/Category";
import { useSelector } from "react-redux";
import { Headlines } from "./Headlines";

export const Home = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true, lg: true, xl: true });
  const loggedIn = useSelector((state) => state.form.isLoggedIn);


  return (
    <Flex my={3}>
      <Flex direction="column">
        { (
          <Headlines />
        )}
        
        {loggedIn && isDesktop && (
          <Box mb={2}>
            <HomeCreate />
            <Category />
          </Box>
        )}
        <AllPosts />
      </Flex>
    </Flex>
  );
};
