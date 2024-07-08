import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Spinner, VStack, Input, Button, Flex } from '@chakra-ui/react';
import { fetchCommentsByPostId } from '../slice/commentSlice';


const Comment = ({ comment }) => {
  return (
    <Box key={comment.id} mb={2}>
      <Text color="gray.500" fontSize="sm">u/{comment.author}</Text>
      <Text fontSize='lg' color="gray.300" mt={2}>{comment.content}</Text>
      <Box pl={5}>
        {comment.subcomments.map(subcomment => (
          <Comment key={subcomment.id} comment={subcomment} />
        ))}
      </Box>
    </Box>
  );
};

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));
  }, [dispatch, postId]);

  
 
  if (loading) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="reddit.100" color="reddit.200" size="xl" />
        <Text className="loading" as="b">Loading comments...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <Text as="b">Unable to fetch comments!</Text>
      </VStack>
    );
  }

  return (
    <Box mt={5}>
      <VStack spacing={4} align="stretch">
        <Flex>
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add a Comment..."
            _hover={{ bg: "#1f1f20" }}
            _focus={{ borderColor: "gray.600", boxShadow: "none" }}
            size="md"
            bg="reddit.400"
            border="1px solid"
            borderColor="gray.600"
            color="gray.200"
            borderRadius="10px"
          />
    
        </Flex>
        <Box p={3} borderWidth="1px" borderRadius="5px" bg="reddit.400" mb={2}>
        {comments.map(comment => (
          <Comment  key={comment.id} comment={comment} />
        ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default Comments;
