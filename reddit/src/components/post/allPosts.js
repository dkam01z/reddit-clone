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
  const showHeadlines = useBreakpointValue({
    base: false,
    lg: false,
    xl: false,
    "2xl": true // Show headlines only for xl and larger
  });

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

      {showHeadlines && (
        <Box
          w={{ base: "100%", lg: "300px" }}
          my={{ base: 5, lg: 0 }}
          ml={{ lg: 3 }}
        >
          <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            borderColor="gray.300"
          >
            <Flex
              align="flex-end"
              color="white"
              p="6px 10px"
              height="70px"
              borderRadius="4px 4px 0px 0px"
              fontWeight={600}
              fontSize="lg"
              bgImage={redditImage}
              bgGradient={`linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url(${redditImage})`}
              backgroundSize="cover"
            >
              Top communities
            </Flex>
            {/* Add any additional community content here */}
          </Flex>
        </Box>
      )}

      <Login isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </Flex>
  );
};

export default React.memo(PostList);
