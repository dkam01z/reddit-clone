import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Text, Heading, Spinner, VStack, Flex, useBreakpointValue, IconButton } from '@chakra-ui/react';
import { FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import CalculateDate from '../calculateDate';
import Voting from '../HomeVoting';
import { filterPostById } from '../../slice/PostsSlice';
import ErrorImg from '../logos/ErrorImg.png'; // Example error image
import PostVoting from '../PostVoting';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { selectedPost: post, loading, error } = useSelector((state) => state.post);
  const iconButtons = useMemo(() => [
    { id: 1, icon: <FaRegComment /> },
    { id: 2, icon: <FaShare /> },
    { id: 3, icon: <FaBookmark /> },
    { id: 4, icon: <FaEllipsisH /> }
  ], []);

  const boxWidth = useBreakpointValue({
    base: '340px',
    sm: '450px',
    md: '650px',
    xl: '800px',
  });

  useEffect(() => {
    dispatch(filterPostById(postId));
  }, [dispatch, postId]);

  if (loading) {
    return (
      <VStack  justifyContent="center" alignItems="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="reddit.100" color="reddit.200" size="xl" />
        <Text className="loading" as="b">Loading</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <img src={ErrorImg} alt="Error" />
        <Text as="b">Unable to fetch post!</Text>
      </VStack>
    );
  }

  if (!post) {
    return (
      <VStack height="100vh" justifyContent="center" alignItems="center">
        <Text as="b">Post not found!</Text>
      </VStack>
    );
  }

  const { author, title, content, comments, votes, time } = post;

  return (
    <Flex height="100vh" justifyContent="center" alignItems="flex-start" >
      <Box
        width={boxWidth}
        borderWidth="1px"
        borderRadius="5px"
        bg="reddit.400"
        borderColor="gray.600"
      >
        <Flex align="stretch">
      
          <VStack >
            <Box>
              <Box p={4}>
                <Text fontSize="sm" color="gray.500">
                  r/TestingSubreddit · Posted by u/{author} · <CalculateDate time={time} />
                </Text>
                <Heading color="gray.200" fontSize="xxl" my={2}>
                  {title}
                </Heading>
                <Text  color="gray.300" mt={5} fontSize='md'>{content}</Text>

                <Flex mt={5}>
                <PostVoting postId={postId} initialVotes={votes} />
                {iconButtons.map((item) => (
                  <IconButton key={item.id}  color="gray.300" _hover={{ bg: "reddit.200" }} aria-label="Comment" size="sm" mx={1} variant="ghost" borderRadius={"10px"} icon={item.icon} />
                ))}
                  
                </Flex>

              </Box>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PostDetail;
