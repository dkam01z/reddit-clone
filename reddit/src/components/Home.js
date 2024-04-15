import React from "react";
import { HomeCreate } from "./post/Homecreate";
import AllPosts from "./post/allPosts";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Category } from "./post/Category";
import { useSelector } from "react-redux";



export const Home = () => {

    const isDesktop = useBreakpointValue({ base: false, md:true, lg: true });
    const loggedIn = useSelector((state) => state.form.isLoggedIn);
    
    return (
        
        <div >
        
        {loggedIn && isDesktop && ( <Box><HomeCreate/> <Category/></Box>)}
        
       
        <AllPosts/>
        </div>

        
    )
}