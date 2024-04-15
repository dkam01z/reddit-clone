import React from 'react';
import {
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  useToast,
  Center,
  Text
} from '@chakra-ui/react';
import { MdImage } from 'react-icons/md';

const PostCreator = () => {
  const toast = useToast();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Handle the file upload process here
    toast({
      title: 'File uploaded.',
      description: "We've received your file.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box  p={4}>
      <FormControl id="post-title" isRequired mb={4}>
        <FormLabel>Title</FormLabel>
        <Input borderColor="gray.500" placeholder="Title" />
      </FormControl>
      
      <FormControl >
        <FormLabel>Image Upload</FormLabel>
        <Input  borderColor="gray.500" type="file" onChange={handleFileUpload} hidden id="file-upload" />
        <Center
        
          py={16}
          px={4}
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="gray.500"
          borderRadius="md"
          cursor="pointer"
          as="label"
          htmlFor="file-upload"
        >
          <Box textAlign="center">
            <Box display="flex" alignItems="center" justifyContent="center"><Text  fontSize='md' >Drag and drop image or <Button onClick={handleFileUpload} borderRadius={20} mt={2}>
              Upload
            </Button></Text></Box>

          </Box>
        </Center>
      </FormControl>
    </Box>
  );
};

export default PostCreator;
