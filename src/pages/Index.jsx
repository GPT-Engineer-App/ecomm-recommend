import React, { useEffect, useState } from "react";
import { Box, Container, Heading, SimpleGrid, Skeleton, Text, Image } from "@chakra-ui/react";

const Index = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch recommended items from your backend API
    fetch("/api/recommendations")
      .then((response) => response.json())
      .then((data) => {
        setRecommendedItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recommended items:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container maxW="container.xl">
      <Heading as="h1" mb="8">
        Recommended for You
      </Heading>
      {isLoading ? (
        <Skeleton height="20px" />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {recommendedItems.map((item) => (
            <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
              <Image src={item.imageUrl} alt={item.name} />
              <Heading as="h3" size="lg" mt="4">
                {item.name}
              </Heading>
              <Text mt="2">{item.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Index;
