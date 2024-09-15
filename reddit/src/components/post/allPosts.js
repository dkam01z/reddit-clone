import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../../slice/PostsSlice';
import Posts from './posts'; // Adjust the path as necessary
import { Box, VStack, Text, Skeleton, SkeletonText, Img, Flex, useBreakpointValue } from '@chakra-ui/react';
import Login from '../Login'; // Adjust the path as necessary
import redditImage from "../logos/redditPersonalHome.png"; // Adjust the path as necessary
import ErrorImg from '../logos/ErrorImg.png'; // Adjust the path as necessary

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post || { posts: [], loading: false, error: null });
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const handleVoteAttempt = useCallback(() => {
    setLoginModalOpen(true);
  }, []);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-between"
      maxW="90vw" // Set the max width to control the outer container width
      mx="auto" // Center the container horizontally
    >
      <Box flex="1" mr={{ lg: 3 }}> {/* Reduced margin-right */}
        {loading ? (
          // Display skeletons while loading
          <>
            {[...Array(5)].map((_, index) => (
              <Box key={index} mb={6}>
                <Skeleton height="20px" mb={4} />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            ))}
          </>
        ) : error ? (
          <VStack>
            <Img src={ErrorImg} alt="Error" />
            <Text color="red.500">Failed to load posts</Text>
          </VStack>
        ) : (
          posts && posts.map(post => (
            <Posts 
              key={post.id}
              title={post.title}
              time={post.time}
              content={post.content}
              author={post.author}
              comments={post.comments}
              votes={post.votes}
              id={post.id}
              onVoteAttempt={handleVoteAttempt}
            />
          ))
        )}
      </Box>

      <Login isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </Flex>
  );
};

export default React.memo(PostList);
