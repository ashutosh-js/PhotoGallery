import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import GalleryLayout from "./components/GalleryLayout";
import { Box } from "@chakra-ui/react";
import axiosInstance from "./axiosInstance";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ApiResponse {
  results: Photo[];
}

const App: React.FC = () => {
  const [searchterm, setSearchterm] = useState<string>("");
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [searchResults, setSearchResults] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axiosInstance.get("/photos", {
          params: { per_page: 100 },
        });
        setAllPhotos(response.data);
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching photos:",
          error instanceof Error ? error.message : error
        );
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    const filterPhoto = async () => {
      try {
        if (searchterm === "") {
          setSearchResults(allPhotos);
          return;
        }
        setLoading(true);
        const filterResponse = await axiosInstance.get<ApiResponse>(
          "/search/photos",
          {
            params: { query: searchterm, per_page: 100 },
          }
        );
        setSearchResults(filterResponse.data.results || []);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching photos:",
          error instanceof Error ? error.message : error
        );
      }
    };

    const debounce = setTimeout(() => {
      filterPhoto();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [allPhotos, searchterm]);

  return (
    <>
      <Box bg="gray.100" maxHeight="100%">
        <Header searchterm={searchterm} setSearchterm={setSearchterm} />
        <GalleryLayout loading={loading} searchResults={searchResults} />
      </Box>
    </>
  );
};

export default App;
