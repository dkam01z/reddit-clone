import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";

export const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await fetch(
          `https://api.goperigon.com/v1/all?apiKey=${apiKey}`
        );
        const data = await response.json();
        const articlesWithImages = data.articles.filter(article => article.imageUrl);

        setHeadlines(articlesWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching headlines:", error);
        setLoading(false);
      }
    }; 

    fetchHeadlines();
  }, [apiKey]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100px">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      {headlines.slice(0, 4).map((article, index) => (
        <Box
          key={index}
          bg="gray.800"
          borderRadius="8px"
          overflow="hidden"
          mb={3}
          mx={2}
          width="300px"
        >
          <Image
            src={article.imageUrl}
            alt={article.title}
            objectFit="cover"
            width="100%"
            height="auto"
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            p={4}
            bgGradient="linear(to-t, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            height="100%"
          >
            <Text fontSize="sm" fontWeight="bold" color="white" noOfLines={2} mb={2}>
              {article.title}
            </Text>
            <Text fontSize="xs" color="gray.300" noOfLines={2}>
              {article.description}...
            </Text>
            <Flex align="center" mt={2}>
              <Text fontSize="xs" color="gray.400" mr={1}>
                {article.source.name}
              </Text>
              <Text fontSize="xs" color="gray.400">
                and more
              </Text>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};
