import React, { useState } from "react";
import {
  Card,
  Flex,
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axiosInstance from "../axiosInstance";
import PhotoModal from "./PhotoModal";

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

const Cards: React.FC<SearchResultProps> = ({ searchResults, loading }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openModal = async (photo: Photo) => {
    try {
      const response = await axiosInstance.get(`/photos/${photo.id}`);
      setSelectedPhoto(response.data);
    } catch (error) {
      console.error("Error fetching photo details:", error);
    }
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Flex flexWrap="wrap" justify="center" align="center" gap={4}>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} width="300px">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" height="200px" />
              </Card>
            ))
          : searchResults.map((photo) => (
              <Card
                key={photo.id}
                width="300px"
                onClick={() => openModal(photo)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  borderRadius="sm"
                  width="100%"
                  height="200px"
                  loading="lazy"
                />
              </Card>
            ))}
      </Flex>

      <PhotoModal selectedPhoto={selectedPhoto} closeModal={closeModal} />
    </>
  );
};

export default Cards;
