import React, { useEffect } from 'react';
import { VStack, IconButton, Text, HStack } from '@chakra-ui/react';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserVote, fetchUserVotes } from '../slice/userVoteSlice';

const PostVoting = ({ postId, initialVotes, onVoteAttempt }) => {
  const dispatch = useDispatch();
  const userVotes = useSelector((state) => state.userVotes.userVotes);
  const userId = useSelector((state) => state.form.id);
  const loggedIn = useSelector((state) => state.form.isLoggedIn);

  

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchUserVotes(userId));
    }
  }, [dispatch, userId, loggedIn]);

  const handleVote = (voteType) => {
    if (!loggedIn) {
      return alert("Not logged In"); 
    }

    const newVote = voteType === 'upvote' ? 1 : -1;

    dispatch(updateUserVote({ postId, userId, voteType: newVote }))
      .then(() => {
        dispatch(fetchUserVotes(userId));
      });
  };

  const currentVote = userVotes[postId] || 0;

   

  return (
    <HStack spacing={0} align="center" >
      <IconButton
        _hover={{  color: "none" }}
        color={currentVote === 1 ? "reddit.100" : "gray.300"}
        size="md"
        icon={<BiUpvote />}
        onClick={() => handleVote('upvote')}
        aria-label="Upvote"
        variant="ghost"
      />
      <Text fontSize="lg" color={currentVote === -1 ? "blue.400" : currentVote === 1 ? "reddit.100": "gray.300" } fontWeight={500}>{initialVotes}</Text>
      <IconButton
        _hover={{  color: "none" }}
        color={currentVote === -1 ? "blue.400" : "gray.300"}
        size="md"
        icon={<BiDownvote />}
        onClick={() => handleVote('downvote')}
        aria-label="Downvote"
        variant="ghost"
      />
    </HStack>
  );
};

export default PostVoting;
