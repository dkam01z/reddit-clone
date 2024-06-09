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
    Checkbox, CheckboxGroup,
    Text,
    Icon
  } from '@chakra-ui/react'


  import { GoPeople   } from "react-icons/go";
  import { FaEyeSlash,FaLock  } from "react-icons/fa";
import { useState } from 'react';

function Community({isUse, onSwitch}) {

    const [number, setNumber] = useState(250);
    

    const maxHandler = (e) => {

        let max = 250;
        var updatedNumber = max - e.target.value.length;
        setNumber(updatedNumber);
    }
    return (
      <>
    
        <Modal bg="reddit.200"  isOpen={isUse} onClose={onSwitch}  isCentered>
          <ModalOverlay  className="overlay" />
          <ModalContent className="modal-content" bg="#282c34"> 
            <ModalHeader color="gray.100">Create a New Community</ModalHeader>
            <ModalCloseButton className="close-modal" />
            <ModalBody>
            <FormControl>
              <FormLabel color="gray.300" fontSize={"20px"}>Name</FormLabel>
              <FormHelperText color="gray.500">
              Community names including capatilization cannot be changed.           
            </FormHelperText>

            <Input  border="none" bg="#393c47"  onInput={maxHandler} focusBorderColor="transparent" borderRadius="10" mt={5} height="40px"   placeholder="r/"  color="gray.200" type="text"/>
            <FormHelperText color="gray.500">
              {number} Characters left.      
            </FormHelperText>


            <Box>
            <FormLabel my={5} color="gray.300" fontSize={"20px"}>Community type</FormLabel>
                <Flex direction="column" my={2}>
                    <Flex my={1}>
                        
                    <Checkbox colorScheme='orange'  as='b'  textColor="gray.200" mr={2}> <Icon as={GoPeople} mr={1}/>Public</Checkbox> 
                   
                    <Text textColor="gray.400" >Anyone can view, post and comment. </Text>

                    </Flex>
                    <Flex  my={1}>

                    <Checkbox colorScheme='orange'  as='b'  textColor="gray.200" mr={2}><Icon mr={1} as={FaEyeSlash  }/>Restricted</Checkbox> 
                    <Text whiteSpace={"nowrap"} textColor="gray.400" >Only approved can comment </Text>

                    </Flex >
                    <Flex  my={1}>

                    <Checkbox colorScheme='orange'  as='b'  textColor="gray.200" mr={2}><Icon mr={1} as={FaLock }/>Private</Checkbox> 
                    <Text textColor="gray.400" >Only private viewers can post content.</Text>
                    </Flex>
                </Flex>
            </Box>
            
            </FormControl>


            </ModalBody>
            <Center>
            <ModalFooter>
              
              <Button   bg="reddit.100" color="gray.200"  _hover={{ bg: 'reddit.100' }} borderRadius="50" width={40} onClick={onSwitch}>
                Close
              </Button>
             
            </ModalFooter>
            </Center>
          </ModalContent>
        </Modal>
      </>
    )
  }


export default Community;