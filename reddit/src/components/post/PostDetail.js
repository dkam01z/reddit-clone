import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Text, Heading, Spinner, VStack, Flex, useBreakpointValue, IconButton, Input } from '@chakra-ui/react';
import { FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import CalculateDate from '../calculateDate';
import Voting from '../Voting';
import { filterPostById } from '../../slice/PostsSlice';
import ErrorImg from '../logos/ErrorImg.png'; // Example error image
import PostVoting from '../PostVoting';
import Comments from '../comments';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { selectedPost, loading, error } = useSelector((state) => state.post);
  const {isLoggedIn} = useSelector((state) => state.form)

  const iconButtons = useMemo(() => [
    { id: 1, icon: <FaRegComment /> },
    { id: 2, icon: <FaShare />, name: "Share"},
    { id: 3, icon: <FaBookmark /> , name: "Save"},
    { id: 4, icon: <FaEllipsisH />, name: "More" }
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
      <VStack justifyContent="center" alignItems="center">
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

  if (!selectedPost) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <Text as="b">Post not found!</Text>
      </VStack>
    );
  }

  const { author, title, content, votes, time } = selectedPost;


  return (
    <Box py={5} >
      <Flex alignItems="start" justifyContent="flex-start">
        <Box
          width={boxWidth}
          boxShadow={"lg"}
         borderRadius="5px"
          bg="white"
          borderColor="gray.300"
          
        >
          <Flex align="stretch">
            <VStack>
              <Box >
                <Box p={4}>
                  <Text fontSize="sm" color="gray.500">
                    r/TestingSubreddit · Posted by u/{author} · <CalculateDate time={time} />
                  </Text>
                  <Heading color={"black"} fontWeight={600} fontSize={"12pt"} my={2}>
                    {title}
                  </Heading>
                  <Text color="black" mt={5} fontSize='md'>{content}</Text>

                  <Flex pr={5} mt={5}>
                    <PostVoting mx={1} p={5} postId={postId} initialVotes={votes} />
                    {iconButtons.map((item) => (
                      <IconButton  key={item.id} color="gray.400" _hover={{ bg: "reddit.200" }} aria-label="Comment" size="md" mx={1} variant="ghost" borderRadius={"15px"} icon={item.icon} /> 
                                          ))}
                  </Flex>

                </Box>
              </Box>
            </VStack>
          </Flex>
        </Box>
      </Flex>
      <Box width={boxWidth} mx="auto">
        <Comments postId={postId} />
      </Box>
    </Box>
  );
};

export default PostDetail;
