import React, { useState } from "react";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import axiosInstance from "../axiosInstance";
import { Photo } from "./types";

interface PhotoModalProps {
  selectedPhoto: Photo | null;
  closeModal: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  selectedPhoto,
  closeModal,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const downloadImage = async () => {
    try {
      const response = await axiosInstance.get(`/photos/${selectedPhoto?.id}`);
      const downloadUrl = response.data.links.download;
      console.log("download url", downloadUrl)  
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  
  

  if (isFullScreen && selectedPhoto) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
        onClick={toggleFullScreen}
      >
        <Image
          src={selectedPhoto?.urls.regular || ""}
          alt={selectedPhoto?.alt_description || ""}
          width="100%"
          height="100%"
          objectFit="contain"
          cursor="pointer"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <Modal isOpen={selectedPhoto !== null} onClose={closeModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <IconButton
            icon={<ExternalLinkIcon />}
            onClick={toggleFullScreen}
            aria-label="Toggle Full Screen"
            mr={2}
          />
          <IconButton
            icon={<DownloadIcon />}
            onClick={downloadImage}
            aria-label="Download Image"
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="15px">
          <Image
            src={selectedPhoto?.urls.regular || ""}
            alt={selectedPhoto?.alt_description || ""}
            borderRadius="sm"
            width="100%"
            height="auto"
            objectFit="cover"
            onClick={toggleFullScreen}
            cursor="pointer"
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhotoModal;
