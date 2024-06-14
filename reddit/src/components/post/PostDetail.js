import React, { useEffect , useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Text, Heading, Spinner, VStack, HStack, IconButton , Flex, useBreakpointValue} from '@chakra-ui/react';
import { FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import CalculateDate from '../calculateDate';
import Voting from '../Voting';
import { filterPostById } from '../../slice/PostsSlice';
import ErrorImg from '../logos/ErrorImg.png'; // Example error image


const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { selectedPost: post, loading, error } = useSelector((state) => state.post);
  const iconButtons = useMemo(() => [
    { id: 1, icon: <FaRegComment /> },
    { id: 2, icon: <FaShare /> },
    { id: 3, icon: <FaBookmark /> },
    { id: 4, icon: <FaEllipsisH /> }
  ], []);


  const boxWidth = useBreakpointValue({
    base: '350px',
    sm: '500px',
    md: '600px',
    xl: '700px',
  });



  useEffect(() => {
    dispatch(filterPostById(postId));
  }, [dispatch, postId]);

  if (loading) {
    return (
      <VStack>
        <Spinner thickness="4px" speed="0.65s" emptyColor="reddit.100" color="reddit.200" size="xl" />
        <Text className="loading" as="b">Loading</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <img src={ErrorImg} alt="Error" />
        <Text as="b">Unable to fetch post!</Text>
      </VStack>
    );
  }

  if (!post) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <Text as="b">Post not found!</Text>
      </VStack>
    );
  }



  const { author, title, content, comments, votes, time } = post;

  return (
    <Box
    _hover={{ bg: "#1f1f20" }}
    cursor="pointer"
    width={boxWidth}
    borderWidth="1px"
    borderRadius="5px"
    bg="reddit.400"
    borderColor="gray.600"
   
  >
    <Flex align="stretch">
      <Voting postId={postId} initialVotes={votes} />
      <VStack align="stretch" flex="1">
        <Box overflow="hidden">
          <Box p={4}>
            <Text fontSize="sm" color="gray.500">
              r/TestingSubreddit · Posted by u/{author} · <CalculateDate time={time} />
            </Text>
            <Heading color="gray.200" fontSize="xl" my={2}>
              {title}
            </Heading>
            <Text color="gray.300" fontSize='md'>{content}</Text>
            {iconButtons.map((item) => (
              <IconButton key={item.id} color="gray.300" _hover={{ bg: "reddit.200" }} aria-label="Comment" size="sm" mx={1} variant="ghost" icon={item.icon} />
            ))}
          </Box>
        </Box>
      </VStack>
    </Flex>
  </Box>
  );
};

export default PostDetail;
