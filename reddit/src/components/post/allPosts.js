import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../../slice/Hotslice';
import Posts from './posts';
import { Box } from '@chakra-ui/react';
import Login from '../Login';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post || { posts: [], loading: false, error: null });
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const handleVoteAttempt = useCallback(() => {
    setLoginModalOpen(true);
  }, [setLoginModalOpen]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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

export default PostList;
