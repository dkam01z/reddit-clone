import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, VStack, Heading, Text, IconButton, Image, useBreakpointValue } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import dog from '../post/dog.jpg';
import { BiUpvote, BiDownvote } from "react-icons/bi";

const Posts = () => {
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
    <Box width={boxWidth} my={10} borderWidth="1px" borderRadius="5px" bg="reddit.400" borderColor="gray.600">

      <Flex align="stretch">

        <VStack borderRight="1px solid" spacing={0} align="center" bg="reddit.500" borderColor="reddit.500">

          <IconButton _hover={{ bg: "reddit.200", color: "reddit.100" }} color="gray.300" size="md" icon={<BiUpvote />} onClick={() => countHandler('upvote')} aria-label="Upvote" variant="ghost" />
          <Text fontSize="lg" fontWeight={500}>{count}</Text>
          <IconButton _hover={{ bg: "reddit.200", color: "blue.400" }} color="gray.300" size="md" icon={<BiDownvote />} onClick={() => countHandler('downvote')} aria-label="Downvote" variant="ghost" />
        </VStack>

        <VStack align="stretch" flex="1">
          <Box overflow="hidden">
            <Box p={4}>
              <Text fontSize="sm" color="gray.500">
                r/TestingSubreddit · Posted by u/Test 1 day ago
              </Text>
              <Heading color="gray.200" fontSize="xl" my={2}>
                This is a test using Chakra UI and react
              </Heading>
              <Image objectFit='cover' width={['100%', '100%']} boxSize='512px' src={dog} />
              <IconButton color="gray.300" _hover={{ bg: "reddit.200" }} icon={<FaRegComment />} aria-label="Comment" size="sm" mx={1} variant="ghost" />
              <IconButton color="gray.300" _hover={{ bg: "reddit.200" }} icon={<FaShare />} aria-label="Share" size="sm" mx={1} variant="ghost" />
              <IconButton color="gray.300" _hover={{ bg: "reddit.200" }} icon={<FaBookmark />} aria-label="Save" size="sm" mx={1} variant="ghost" />
              <IconButton color="gray.300" _hover={{ bg: "reddit.200" }} icon={<FaEllipsisH />} aria-label="More options" size="sm" ml="auto" variant="ghost" />
            </Box>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Posts;
