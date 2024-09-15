import { Box, Flex, Button, Text, useBreakpointValue } from "@chakra-ui/react";
import redditImage from "./logos/redditPersonalHome.png"; // Adjust the path as necessary
import { useDispatch, useSelector } from "react-redux";
import { fetchTopCommunities } from "../slice/CommunitySlice";
import { useEffect } from "react";

const CommunityPage = () => {
  const showHeadlines = useBreakpointValue({
    base: false,
    lg: false,
    xl: false,
    "2xl": true, // Show headlines only for 2xl and larger
  });

  const { topCommunities, loading, error } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchTopCommunities());
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [dispatch]);

  console.log(topCommunities);

  return (
    <>
      {showHeadlines && (
        <Box w={{ base: "100%", lg: "320px" }} my={5} ml={3}>
          <Flex direction="column" bg="white" borderRadius={4} borderColor="gray.300">
            {/* Top Communities Banner */}
            <Flex
              align="flex-end"
              color="white"
              p="6px 10px"
              height="70px"
              borderRadius="4px 4px 0px 0px"
              fontWeight={600}
              fontSize="lg"
              bgImage={redditImage}
              bgGradient={`linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url(${redditImage})`}
              backgroundSize="cover"
            >
              Top Communities
            </Flex>

            {/* Loading State */}
            {loading && <Text textAlign="center" p={4}>Loading...</Text>}


            {/* Top Communities List */}
            {!loading && topCommunities && topCommunities.length > 0 && (
              <Box p={4}>
                {topCommunities.map((community, index) => (
                  <Flex
                    key={community.subreddit_id}
                    justify="space-evenly"
                    align="center"
                    my={2}
                    p={2}
                   
                    borderRadius={4}
                  >
                    {/* Rank */}
                    <Text fontSize="sm" color={"black"} fontWeight="bold">{index + 1}</Text>

                    {/* Community Name */}
                    <Text  fontSize="sm" color={"black"}  flex="1" ml={10}>
                      {community.subreddit_name}
                    </Text>

                    {/* Join/Joined Button */}
                    <Button px={5} borderRadius="60px" size="sm" colorScheme="blue">
                      {community.joined ? "Joined" : "Join"}
                    </Button>
                  </Flex>
                ))}

                {/* View All Button */}
                <Button colorScheme="blue" borderRadius="50px" mt={4} w="100%">
                  View All
                </Button>
              </Box>
            )}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default CommunityPage;
