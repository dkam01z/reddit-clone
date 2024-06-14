import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { VStack, IconButton, Text } from '@chakra-ui/react';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { updateCounter, fetchLatestVoteCount } from '../slice/PostsSlice';

const Voting = ({ postId, initialVotes, onVoteAttempt }) => {
  const [count, setCount] = useState(initialVotes);
  const [userVote, setUserVote] = useState(null);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.form.isLoggedIn);
  const user_id = useSelector((state) => state.form.id);

  useEffect(() => {
    setCount(initialVotes);
  }, [initialVotes]);

  const handleVote =  useCallback( async (voteType) => {
    
    if (!loggedIn) {
      onVoteAttempt();
      return;
    }

    let increment = 0;

    if (voteType === 'upvote') {
      if (userVote === 'up') {
        increment = -1;
        setUserVote(null);
      } else if (userVote === 'down') {
        increment = 2;
        setUserVote('up');
      } else {
        increment = 1;
        setUserVote('up');
      }
    } else if (voteType === 'downvote') {
      if (userVote === 'down') {
        increment = 1;
        setUserVote(null);
      } else if (userVote === 'up') {
        increment = -2;
        setUserVote('down');
      } else {
        increment = -1;
        setUserVote('down');
      }
    }

    const newCount = count + increment;
    setCount(newCount);

    try {
      await dispatch(updateCounter({ postId, newCount: increment, user_id })).unwrap();
      dispatch(fetchLatestVoteCount(postId));
    } catch (error) {
      console.error("Failed to update the vote:", error);
    }
  }, []);

  return (
    <VStack  borderRight="1px solid" spacing={0} align="center" bg="reddit.500" borderColor="reddit.500">
      <IconButton
        _hover={{ bg: "reddit.200", color: "reddit.100" }}
        color="gray.300"
        size="md"
        icon={<BiUpvote />}
        onClick={() => handleVote('upvote')}
        aria-label="Upvote"
        variant="ghost"
      />
      <Text fontSize="lg" fontWeight={500}>{count}</Text>
      <IconButton
        _hover={{ bg: "reddit.200", color: "blue.400" }}
        color="gray.300"
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
