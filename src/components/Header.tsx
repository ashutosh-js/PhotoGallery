import React from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";

interface SearchInputProps {
    searchterm: string;
    setSearchterm: React.Dispatch<React.SetStateAction<string>>;
  }

const Header: React.FC<SearchInputProps> = ({searchterm, setSearchterm}) => {
  return (
    <Box as="header" color="black" py="4" >
      <Flex
        maxW="1200px"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading
          as="h1"
          fontSize="2xl"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Photo Gallery
        </Heading>

        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search photos..."
            borderRadius="full"
            value={searchterm}
            onChange={(e)=>setSearchterm(e.target.value)}
          />
        </InputGroup>

        <IconButton
          aria-label="Open Menu"
          display={{ base: "block", md: "none" }}
          icon={<HamburgerIcon />}
        />
      </Flex>
    </Box>
  );
};

export default Header;
