import React, { useMemo } from 'react';
import { Box, Flex, VStack, Heading, Text, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import CalculateDate from '../calculateDate';
import Voting from '../Voting';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCommentsByPostId } from '../../slice/commentSlice';

const Posts = ({ author, title, content, comments, votes, time, id, onVoteAttempt }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const boxWidth = useBreakpointValue({
    base: '350px',
    sm: '500px',
    md: '600px',
    xl: '700px',
  });

  const iconButtons = useMemo(() => [
    { id: 1, icon: <FaRegComment />, name: comments },
    { id: 2, icon: <FaShare />, name: "Share" },
    { id: 3, icon: <FaBookmark />, name: "Save" },
    { id: 4, icon: <FaEllipsisH />, name: "More" }
  ], [comments]);

  const handleNavigation = () => {
    dispatch(fetchCommentsByPostId(id));
    navigate(`/post/${id}`);
  };

  return (
    <Flex  my={1}>
      <Box
        boxShadow="lg"
        _hover={{ bg: "gray.100" }}
        cursor="pointer"
        width={boxWidth}
        borderWidth="1px"
        borderRadius="5px"
        bg="white"
        borderColor="gray.300"
      >
        <Flex align="stretch">
          <Voting postId={id} initialVotes={votes} onVoteAttempt={onVoteAttempt} />
          <VStack onClick={handleNavigation} align="stretch" flex="1">
            <Box overflow="hidden">
              <Box p={4}>
                <Text fontSize="sm" color="black">
                  r/TestingSubreddit · Posted by u/{author} · <CalculateDate time={time} />
                </Text>
                <Text  fontWeight={600} fontSize={"12pt"} color="black" my={3}>
                  {title}
                </Text>
                <Text color="black" mb={5} fontSize='10pt'>{content}</Text>

                <Flex mt={2} align="flex-end">
                  {iconButtons.map((item) => (
                    <Flex key={item.id} align="center" mr={2}>
                      <IconButton
                        color="gray.400"
                        _hover={{ bg: "reddit.200" }}
                        aria-label={item.name}
                        size="sm"
                        variant="ghost"
                        icon={item.icon}
                      />
                      <Text color="gray.400" fontSize="sm" ml={1}>
                        {item.name}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default React.memo(Posts);
