import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../../slice/PostsSlice';
import Posts from './posts';
import { Box, VStack, Text, Spinner, Img } from '@chakra-ui/react';
import Login from '../Login';
import ErrorImg from '../logos/ErrorImg.png';

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

  if (loading) return (
    <VStack>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='reddit.100'
        color={'reddit.200'}
        size='xl'
      />
      <Text className="loading" as='b'>Loading</Text>
    </VStack>
  );

  if (error) return (
    <VStack justifyContent="center" alignItems="center">
      <Img src={ErrorImg} />
      <Text as='b'>Unable to fetch Posts!</Text>
    </VStack>
  );

  return (
    <Box>
      {posts && posts.map(post => (
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
      ))}
      <Login isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </Box>
  );
};

export default React.memo(PostList);
