import React, {useRef} from 'react';
import { Box, Flex, VStack, Heading, Text, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import CalculateDate from '../calculateDate';
import Voting from '../Voting';
import { useNavigate } from 'react-router-dom';


const Posts = ({ author, title, content, comments, votes, time, id, onVoteAttempt }) => {

  const boxWidth = useBreakpointValue({
    base: '350px',
    sm: '500px',
    md: '600px',
    xl: '700px',
  });

  const renderCount = useRef(0); // Initialize useRef for render count

  // Increment render count on each render
  renderCount.current += 1;

  // Log the render count to the console
  console.log(`Posts component with id ${id} has rendered ${renderCount.current} times`);
 

  const iconButtons = [
    { id: 1, icon: <FaRegComment />, count: { comments } },
    { id: 2, icon: <FaShare /> },
    { id: 3, icon: <FaBookmark /> },
    { id: 4, icon: <FaEllipsisH /> }
  ];

  return (

    <Box width={boxWidth} borderWidth="1px" borderRadius="5px" bg="reddit.400" borderColor="gray.600">
      
      <Flex align="stretch">
        <Voting postId={id} initialVotes={votes} onVoteAttempt={onVoteAttempt} />
        <VStack align="stretch" flex="1">
          <Box overflow="hidden">
            <Box p={4}>
              <Text fontSize="sm" color="gray.500">
                r/TestingSubreddit · Posted by u/{author} · <CalculateDate time={time} />
              </Text>
              <Heading color="gray.200" fontSize="xl" my={2}>
                {title}
              </Heading>
              <Text color="gray.300" fontSize='md'>{content}</Text>
              {iconButtons.map((item) => (
                <IconButton key={item.id} color="gray.300" _hover={{ bg: "reddit.200" }} aria-label="Comment" size="sm" mx={1} variant="ghost" icon={item.icon} />
              ))}
            </Box>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};


export default Posts;
