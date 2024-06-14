import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Flex,
  Spacer,
  Input,
  Textarea,
  Select,
  Checkbox,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  IoMdAdd,
  IoMdImage,
  IoMdLink,
  IoMdPaper,
  IoMdList,
} from "react-icons/io";
import Post_filter from "./post_types/Post_filter";
import ImageFilter from "./post_types/Image_filter";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginStatus } from "../../slice/FormSlice";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import ToggleButton from "./post_buttons.js/ToggleButton";
import { submitPost } from "../../slice/PostsSlice";
import { useSwalSuccess } from "../Swal/useSwalSuccess";
import Swal from "sweetalert2";

const CreatePost = () => {
  const buttonStyles = {
    bg: "reddit.400",
    color: "white",
    rounded: 0,
    border: "1px",
    borderColor: "gray.500",
    height: "50",
  };
  const categoriesStyles = {
    mt: "40px",
    bg: "reddit.400",
    color: "white",
    rounded: "40px",
    border: "1px",
    borderColor: "gray.100",
    height: "40px",
  };
  const boxWidth = useBreakpointValue({
    base: "300px",
    sm: "100%",
    md: "700px",
    xl: "800px",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [community, setCommunity] = useState("");
  const [image, setImage] = useState("")
  const searchBoxWidth = useBreakpointValue({
    base: "250px",
    sm: "300px",
    md: "50%",
    xl: "50%",
  });
  const [activeButton, setActiveButton] = useState('Post');
  

  const swalSuccess = useSwalSuccess();
  const [selectedCategories, setSelectedCategories] = useState({
    OC: false,
    Spoiler: false,
    NFSW: false,
    Flair: false,
  });

  const buttons = [
    {
      name: "Post",
      icon: <IoMdPaper />,
      
    },
    { name: "Image", icon: <IoMdImage /> },
    { name: "Link", icon: <IoMdLink /> },
    { name: "Poll", icon: <IoMdList /> },
  ];

  const dispatch = useDispatch();

  const buttonData = {
    'Post': { title, description, community, selectedCategories },
    'Image': { /* image data here */ },
    Link: { /* link data here */ },
    Poll: { /* poll data here */ },
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
 
  };

  const handleIcon = (category) => {
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
  };
  const submitForm = () => {
   
    const categoriesToSubmit = Object.entries(selectedCategories)
      .filter(([key, value]) => value) 
      .map(([key]) => key);
  
    const dataToSubmit = {
      ...buttonData[activeButton],
      selectedCategories: categoriesToSubmit, 
    };
  
    console.log(dataToSubmit);
  
    if (dataToSubmit) {
      dispatch(submitPost({ activeButton, dataToSubmit }))
        .unwrap()
        .then(() => {
          swalSuccess();
        })
        .catch((error) => {
          console.error('Submission error:', error);
        });
    }
  };
  



  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.form.isLoggedIn);

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);



  return (
    <Box alignItems="center" p={4} width={boxWidth}>
      <Flex borderBottom="2px"  width="100%">
        <Heading  mb={4} size="md">
          Create a New Post
        </Heading>
        <Spacer />
        <Heading mb={4} size="sm">
          Draft
        </Heading>
      </Flex>

      <Select
        color="gray.300"
        backgroundColor="reddit.400"
        borderColor="gray.400"
        _focus={{ borderColor: "gray.400", boxShadow: "none" }}
        m={5}
        isSearchable
        placeholder="Choose a community.."
        width={searchBoxWidth}
      />

      <Box borderRadius="10px" bg="reddit.400">
        <Flex alignItems="center" justifyContent="space-between">
          {buttons.map((button) => (
            <ToggleButton
              key={button.name}
              {...buttonStyles}
              flex={1}
              isActive={activeButton === button.name}
              onClick={() => handleButtonClick(button.name)}
              icon={button.icon}
            >
              {button.name}
            </ToggleButton>
          ))}
        </Flex>

        {activeButton === "Post" && (
          <Post_filter onTitle={setTitle} onDescription={setDescription} />
        )}

        {activeButton === "Image" && (
          <ImageFilter onImage={setImage} onTitle={setTitle}/>
        )}

        <Flex p="2" alignItems="center" mb="2">
          {Object.keys(selectedCategories).map((category) => (
            <Button
              ml="1"
              {...categoriesStyles}
              onClick={() => handleIcon(category)}
              _hover={{ bg: "gray.700" }}
              key={category}
            >
              {selectedCategories[category] ? <FaCheck /> : <IoMdAdd />}{" "}
              {category}
            </Button>
          ))}
        </Flex>

        <Box mt={3} borderTop="1px">
          <Flex p="2" justifyContent="flex-end" mr={2} alignItems="center">
            <Button ml="1" {...categoriesStyles} _hover={{ bg: "gray.700" }}>
              Save Draft
            </Button>
            <Button
              onClick={() => submitForm()}
              ml="1"
              {...categoriesStyles}
              _hover={{ bg: "gray.700" }}
            >
              Submit
            </Button>
          </Flex>

          <Box ml={10} p="2">
            <Checkbox defaultChecked>Send me post reply notifications</Checkbox>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
