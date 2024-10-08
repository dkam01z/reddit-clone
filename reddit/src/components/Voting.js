import React, { useEffect } from 'react';
import { VStack, IconButton, Text } from '@chakra-ui/react';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserVote, fetchUserVotes } from '../slice/userVoteSlice';

const Voting = ({ postId, initialVotes, onVoteAttempt }) => {
  const dispatch = useDispatch();
  const userVotes = useSelector((state) => state.userVotes.userVotes);
  const userId = useSelector((state) => state.form.user.user_id);
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
    <VStack borderRight="1px solid" spacing={0} align="center" bg="gray.100" borderColor="gray.100">
      <IconButton
        _hover={{ color: "reddit.100" }}
        color={loggedIn ? (currentVote === 1 ? "reddit.100" : "gray.400"): "gray.400" }
        size="md"
        icon={<BiUpvote />}
        onClick={() => handleVote('upvote')}
        aria-label="Upvote"
        variant="ghost"
      />
      <Text fontSize="lg" color={ loggedIn ? ( currentVote === -1 ? "blue.400" : currentVote === 1 ? "reddit.100": "gray.500"): "gray.500" } fontWeight={500}>{initialVotes}</Text>
      <IconButton
        _hover={{color: "blue.400" }}
        color={loggedIn ? (currentVote === -1 ? "blue.400" : "gray.400"): "gray.400" }
        size="md"
        icon={<BiDownvote />}
        onClick={() => handleVote('downvote')}
        aria-label="Downvote"
        variant="ghost"
      />
    </VStack>
  );
};

export default Voting;
