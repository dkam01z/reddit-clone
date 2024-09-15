import React, { useState } from "react";
import { Box, Textarea, Input,} from "@chakra-ui/react";



function Post_filter({onTitle , onDescription}) {

   


    return (

        <Box p="2">
        <Input mx="auto" onChange={(e) => onTitle(e.target.value)}  width={['100%', '98%']} borderColor="gray.300" mt={3} placeholder="Title" color="black" type="text" />
        <Textarea onChange={(e) => onDescription(e.target.value)} width={['100%', '98%']} borderColor="gray.300" mt={3} size="md" color={"black"}  placeholder='Add your description here..' />

        </Box>

    )
}



export default Post_filter