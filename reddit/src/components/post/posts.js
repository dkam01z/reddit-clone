import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, VStack, Heading, Text, IconButton, Image, useBreakpointValue } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import dog from '../post/dog.jpg';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import CalculateDate from '../calculateDate';

const Posts = ({author, title, content, comments, votes, time }) => {
  const [count, setCount] = useState(0);
  const [upvoteDisabled, setUpvoteDisabled] = useState(false);
  const [downvoteDisabled, setDownvoteDisabled] = useState(false);
  const voteTypeRef = useRef(null);



  const boxWidth = useBreakpointValue({
    base: '350px', 
    sm: '500px',   
    md: '600px',   
    xl: '640px',   
  });


  const iconButtons = [
    {id: 1,icon: <FaRegComment /> , count: {comments}},
    {d: 2, icon:<FaShare /> },
    {d: 3, icon: <FaBookmark />},
    {d: 4, icon: <FaEllipsisH />}
  ]




  const countHandler = (voteType) => {
    voteTypeRef.current = voteType;
    setCount((currentCount) => {
      if (voteType === 'upvote' && !upvoteDisabled) {
        return currentCount + (downvoteDisabled ? 2 : 1);
      } else if (voteType === 'downvote' && !downvoteDisabled) {
        return currentCount - (upvoteDisabled ? 2 : 1);
      } else if (voteType === 'upvote' && upvoteDisabled) {
        return currentCount - 1;
      } else if (voteType === 'downvote' && downvoteDisabled) {
        return currentCount + 1;
      }
      return currentCount;
    });
  };

  useEffect(() => {
    const voteType = voteTypeRef.current;

    if (voteType === 'upvote') {
      setUpvoteDisabled(!upvoteDisabled);
      setDownvoteDisabled(false);
    } else if (voteType === 'downvote') {
      setDownvoteDisabled(!downvoteDisabled);
      setUpvoteDisabled(false);
    }
  }, [count]);

  return (
    <Box width={boxWidth}  borderWidth="1px" borderRadius="5px" bg="reddit.400" borderColor="gray.600">

      <Flex align="stretch">

        <VStack borderRight="1px solid" spacing={0} align="center" bg="reddit.500" borderColor="reddit.500">

        <IconButton _hover={{ bg: "reddit.200", color: "reddit.100" }} color="gray.300" size="md" icon={<BiUpvote />} onClick={() => countHandler('upvote')} aria-label="Upvote" variant="ghost" />
          <Text fontSize="lg" fontWeight={500}>{votes}</Text>
          <IconButton _hover={{ bg: "reddit.200", color: "blue.400" }} color="gray.300" size="md" icon={<BiDownvote />} onClick={() => countHandler('downvote')} aria-label="Downvote" variant="ghost" />
        </VStack>

        <VStack align="stretch" flex="1">
          <Box overflow="hidden">
            <Box p={4}>
              <Text fontSize="sm" color="gray.500">
                r/TestingSubreddit · Posted by u/{author} · <CalculateDate time={time}/>
              </Text>
              <Heading color="gray.200" fontSize="xl" my={2}>
                {title}
              </Heading>
            
              <Text color="gray.300" fontSize='md'>{content}</Text>
             
              {iconButtons.map((item) =>(      
                
                <IconButton key={item.id} color="gray.300" _hover={{ bg: "reddit.200" }} aria-label="Comment" size="sm" mx={1} variant="ghost" icon={item.icon}  />  
                       
              ))}

            </Box>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Posts;
