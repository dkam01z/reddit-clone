import React from "react";
import { HomeCreate } from "./post/Homecreate";
import AllPosts from "./post/allPosts";
import { useBreakpointValue } from "@chakra-ui/react";
import { Category } from "./post/Category";



export const Home = () => {

    const isDesktop = useBreakpointValue({ base: false, md:true, lg: true });
    
    return (
        
        <div>
        
        {isDesktop && ( <HomeCreate/>)}
        <Category/>
       
        <AllPosts/>
        </div>

        
    )
}