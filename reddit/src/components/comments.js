import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Text,
  Spinner,
  VStack,
  Input,
  useToast,
  Button,
  Flex,
  Textarea,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { fetchCommentsByPostId, submitComment } from "../slice/commentSlice";
import Swal from "sweetalert2";
import CalculateDate from "./calculateDate";
import { ChatIcon } from "@chakra-ui/icons";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

const Comment = ({ comment, level = 0 }) => {
  return (
    <Box my={2} ml={level * 30 + "px"} position="relative">
     
      {level > 0 && (
        <Box
          position="absolute"
          top="-2"
          bottom="-5px"
          left="-20px" // Adjust position to match the line correctly
          width="3px"
          backgroundColor="gray.400"
        />
      )}
      <Flex>
        <Box
          backgroundColor="white"
          border="1px solid"
          borderColor="gray.300"
          boxShadow="md"
          borderRadius="5px"
          p={5}
          width="100%"
        >
          <HStack>
            <VStack spacing={1} mr={2} alignItems="center" color="gray.400">
              <BiUpArrow />
              <Spacer/>
              <Text color={"gray.400"} fontWeight={600} fontSize={"md"}>0</Text>
              <BiDownArrow />
            </VStack>
            <Box>
              <Text color="black" my={1} fontSize="sm">
                {comment.author} · <CalculateDate time={comment.time} />
              </Text>
              <Text  fontSize='10pt' color="black" mt={2}>
                {comment.content}
              </Text>
              <Text
                fontSize="sm"
                color="gray.400"
                mt={3}
                _hover={{ color: "gray.300", cursor: "pointer" }}
              >
                <ChatIcon mr={1} /> Reply
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>

      {/* Render subcomments recursively */}
      {comment.subcomments.map((subcomment) => (
        <Comment key={subcomment.id} comment={subcomment} level={level + 1} />
      ))}
    </Box>
  );
};

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const { user, id } = useSelector((state) => state.form);
  const userName = user?.user;
  const [commentContent, setCommentContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));
  }, [dispatch, postId]);

  const submitCommentHandler = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      dispatch(submitComment({ postId, id, commentContent }))
        .unwrap()
        .then(() => {
          setCommentContent("");
          toast({
            title: "Comment Successfully Added.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error || "An unexpected error occurred.",
            icon: "error",
            customClass: {
              container: "swal-overlay",
              popup: "dark-theme",
            },
          });
        });
    }
  };

  if (loading) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="reddit.100"
          color="reddit.200"
          size="xl"
        />
        <Text className="loading" as="b">
          Loading comments...
        </Text>
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
              Comment as{" "}
              <Text as="span" color="black">
                {userName}
              </Text>
            </Text>
            <Textarea
              boxShadow="lg"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add a Comment..."
        
              _focus={{ borderColor: "gray.600", boxShadow: "none" }}
              size="md"
              height="120px"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              color="black"
              borderRadius="10px"
              onKeyDown={submitCommentHandler}
              opacity={0.6}
            />
            <Button
              size="sm"
              mt={2}
              onClick={submitCommentHandler}
              colorScheme="blue"
            
              
            >
              Comment
            </Button>
          </Box>
        </Flex>

        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </VStack>
    </Box>
  );
};

export default Comments;
