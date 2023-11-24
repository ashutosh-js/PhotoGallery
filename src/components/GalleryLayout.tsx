import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  HStack,
} from "@chakra-ui/react";
import Cards from "./Cards";
import axiosInstance from "../axiosInstance";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface SearchResultProps {
  searchResults: Photo[];
  loading: boolean;
}

const GalleryLayout: React.FC<SearchResultProps> = ({
  searchResults,
  loading,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [nature, setNature] = useState([]);
  const [house, setHouse] = useState([]);

  const handleTabClick = useCallback(async (category: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/search/photos", {
        params: { query: category, per_page: 100 },
      });

      switch (category) {
        case "cars":
          setCars(response.data.results || []);
          break;
        case "nature":
          setNature(response.data.results || []);
          break;
        case "house":
          setHouse(response.data.results || []);
          break;
        default:
          setCars(response.data.results || []);
          setNature(response.data.results || []);
          setHouse(response.data.results || []);
          break;
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error instanceof Error ? error.message : error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleTabClick("All"); 
  }, [handleTabClick]);

  const CardsMemoized = React.memo(Cards);

  return (
    <Box w="100%">
      <Flex direction="column" justify="center" align="center">
        <Heading as="h3" mt="25px" size="lg">
          Photo Gallery
        </Heading>
        <Text padding="10px">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          mt="10px"
          align="center"
        >
          <TabList>
            <HStack spacing="15px">
              <Tab border="1px" onClick={() => handleTabClick("All")}>
                All
              </Tab>
              <Tab border="1px" onClick={() => handleTabClick("cars")}>
                Cars
              </Tab>
              <Tab border="1px" onClick={() => handleTabClick("nature")}>
                Nature
              </Tab>
              <Tab border="1px" onClick={() => handleTabClick("house")}>
                House
              </Tab>
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CardsMemoized searchResults={searchResults} loading={loading} />
            </TabPanel>
            <TabPanel>
              <CardsMemoized searchResults={cars} loading={isLoading} />
            </TabPanel>
            <TabPanel>
              <CardsMemoized searchResults={nature} loading={isLoading} />
            </TabPanel>
            <TabPanel>
              <CardsMemoized searchResults={house} loading={isLoading} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default GalleryLayout;
