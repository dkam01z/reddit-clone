import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Spinner, VStack, Input, useToast, Button, Flex, Textarea } from '@chakra-ui/react';
import { fetchCommentsByPostId, submitComment } from '../slice/commentSlice';
import Swal from 'sweetalert2';
import CalculateDate from './calculateDate';
import { ChatIcon } from '@chakra-ui/icons';

const Comment = ({ comment, level = 0 }) => {
  return (
    <Box
      position="relative"
      my={2}
      ml={level * 30 + "px"} // Indentation based on the comment level
    >
      {/* Vertical line for nested comments */}
      {level > 0 && (
        <Box
          position="absolute"
          top="0"
          bottom={0}
          left="-15px"  // Position the line slightly left of the comment box
          width="2px"
          backgroundColor="gray.600"
        />
      )}
      
      <Box
        backgroundColor="reddit.400"
        border="1px solid"
        borderColor="reddit.400"
        boxShadow="md"
        borderRadius="5px"
        p={2}
        mb={5}
        zIndex={1}  // Ensure the comment box appears above the line
      >
        <Text color="gray.500" my={1} fontSize="sm">
          {comment.author} · <CalculateDate time={comment.time} />
        </Text>
        <Text fontSize="lg" color="gray.200" mt={2}>
          {comment.content}
        </Text>
        <Text color="gray.400" ml={2} fontSize="sm">
          <ChatIcon /> Reply
        </Text>
      </Box>

      {/* Render subcomments recursively */}
      <Box>
        {comment.subcomments.map((subcomment, index) => (
          <Comment key={subcomment.id} comment={subcomment} level={level + 1} />
        ))}
      </Box>
    </Box>
  );
};

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const { user, id } = useSelector((state) => state.form);

  const userName = user?.user;
  const [commentContent, setCommentContent] = useState('');
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));
  }, [dispatch, postId]);

  const submitCommentHandler = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      dispatch(submitComment({ postId, id, commentContent }))
        .unwrap()
        .then(() => {
          setCommentContent('');
          toast({
            title: 'Comment Successfully Added.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error',
            text: error || 'An unexpected error occurred.',
            icon: 'error',
            customClass: {
              container: 'swal-overlay',
              popup: 'dark-theme',
            },
          });
        });
    }
  };

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
        <Flex width="100%">
          <Box width="100%">
            <Text color={"gray.400"} mb={2} fontSize={"sm"}>
              Comment as {userName}
            </Text>
            <Textarea
              boxShadow="lg"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add a Comment..."
              _hover={{ bg: "#1f1f20" }}
              _focus={{ borderColor: "gray.600", boxShadow: "none" }}
              size="md"
              bg="reddit.400"
              border="1px solid"
              borderColor="reddit.400"
              color="gray.200"
              borderRadius="10px"
              onKeyDown={submitCommentHandler}
            />
            <Button
              size='sm'
              mt={2}
              onClick={submitCommentHandler}
              colorScheme='reddit.200'
            >
              Comment
            </Button>
          </Box>
        </Flex>

        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </VStack>
    </Box>
  );
};

export default Comments;
