import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Box,
  Flex,
  Text,
  Icon,
  Radio,
  RadioGroup,
  useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {postCommunity} from "../slice/CommunitySlice"
import { GoPeople } from "react-icons/go";
import { FaEyeSlash, FaLock } from "react-icons/fa";
import { useState } from 'react';

function Community({ isUse, onSwitch }) {
  const [number, setNumber] = useState(250);
  const [communityType, setCommunityType] = useState('public');
  const dispatch = useDispatch();
  const [communityName, setName] = useState('')
  const user_id = useSelector((state) => state.form.user.user_id)
  const toast = useToast();

  const maxHandler = (e) => {
    let max = 250;
    var updatedNumber = max - e.target.value.length;
    setNumber(updatedNumber);
  };

  const submitCommunity = () => {

    if (!communityName  || !communityType || !user_id ) {
      toast({
        title: 'Missing Parameters, please check your details.',
        status: 'error',
        duration: 9000,
        isClosable: true, 
      });

      return;
    }

    dispatch(postCommunity({ communityName, communityType, user_id }))
      .unwrap()
      .then(() => {
        toast({
          title: 'Community Successfully Added.',
          status: 'success',
          duration: 9000,
          isClosable: true, 
        });
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Modal bg="white" isOpen={isUse} onClose={onSwitch} isCentered>
        <ModalOverlay className="overlay" />
        <ModalContent className="modal-content" bg="white">
          <ModalHeader color="black">Create a New Community</ModalHeader>
          <ModalCloseButton className="close-modal" />
          <ModalBody>
            <FormControl>
              <FormLabel color="black" fontSize={"20px"}>Name</FormLabel>
              <FormHelperText color="gray.500">
                Community names including capitalization cannot be changed.
              </FormHelperText>

              <Input
                border="none"
                bg="gray.100"
                onInput={maxHandler}
                focusBorderColor="transparent"
                borderRadius="10"
                mt={5}
                height="40px"
                placeholder="r/"
                color="black"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText color="black">
                {number} Characters left.
              </FormHelperText>

              <Box>
                <FormLabel my={5} color="black" fontSize={"20px"}>Community type</FormLabel>
                <RadioGroup onChange={setCommunityType} value={communityType}>
                  <Flex direction="column" my={2}>
                    <Flex color={"gray.200"}  my={1}>
                      <Radio value="public" colorScheme='blue' mr={2}>
                        <Icon  color={"#3182ce"} as={GoPeople} mr={1}/>Public
                      </Radio>
                      <Text  textColor="gray.400">Anyone can view, post and comment.</Text>
                    </Flex>
                    <Flex color={"gray.200"} my={1}>
                      <Radio value="restricted" colorScheme='orange' mr={2}>
                        <Icon mr={1} color={"#3182ce"}  as={FaEyeSlash}/>Restricted
                      </Radio>
                      <Text whiteSpace={"nowrap"} textColor="gray.400">Only approved users can comment.</Text>
                    </Flex>
                    <Flex  color={"gray.200"} my={1}>
                      <Radio value="private" colorScheme='orange' mr={2}>
                        <Icon mr={1}color={"#3182ce"}  as={FaLock}/>Private
                      </Radio>
                      <Text textColor="gray.400">Only private viewers can post content.</Text>
                    </Flex>
                  </Flex>
                </RadioGroup>
              </Box>
            </FormControl>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button
                bg="#3182ce"
                color="gray.100"
                _hover={{bg: "#3182ce"}}
                borderRadius="50"
                width={40}
                onClick={submitCommunity}
                
              > 
                Submit
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Community;
