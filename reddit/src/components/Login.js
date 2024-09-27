import React, { useState } from "react";
import {
  Center,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import Swal from 'sweetalert2';
import '../App.css';

import {useDispatch} from 'react-redux';
import { signUpUser, loginUser } from "../slice/FormSlice";
import { useSwalSuccess } from "./Swal/useSwalSuccess";
import { LockIcon } from "@chakra-ui/icons";




function Login({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [Uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  
  const dispatch = useDispatch()

  const toggleComponent = () => {
    setIsSignUp(!isSignUp);
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
  const validateEmail = (email) => emailRegex.test(email);
  const validatePassword = (password) => passwordRegex.test(password);

  const swalSuccess = useSwalSuccess();




  const loginHandle = () => {
    console.log('Logging in with:', Uname, password);
    dispatch(loginUser({ Uname, password }))
      .unwrap()
      .then(() => {
        swalSuccess();
      })
      .catch((error) => {
        console.error('Login error:', error);
        Swal.fire({
          title: 'Error',
          text: error || 'An unexpected error occurred.',
          icon: 'error',
          customClass: {
            container: 'swal-overlay',
            popup: 'dark-theme',
          },
        });
      });
  };
  



    const registerHandle = () => {


      if (!validateEmail(email)) {
        Swal.fire({
          title: "Invalid Email",
          text: "Please enter a valid email address.",
          icon: "warning",
          customClass: {
            container: 'swal-overlay',
            popup: 'dark-theme',
          }
        });
        return;
      }
    
      if (!validatePassword(password)) {
        Swal.fire({
          title: "Invalid Password",
          text: "Password must be at least 8 characters long and include both letters and numbers.",
          icon: "warning",
          customClass: {
            container: 'swal-overlay'
          }
        });
        return;
      }


      dispatch(signUpUser({ Uname, email, password }))
        .unwrap()
        .then(() => {
         swalSuccess()
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error || "An unexpected error occurred.",
            icon: "error",
            customClass: {
              container: 'swal-overlay',
              popup: 'dark-theme',
            }
          });
          return;
        });
    };
    



  return (
    <Modal bg="gray.100" isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay className="overlay" />
      <ModalContent className="modal-content" bg="white">
        <ModalHeader fontWeight={650}  color="#3182ce">{isSignUp ? "Sign Up" : "Log In"}</ModalHeader>

        <ModalCloseButton className="close-modal" />
        <ModalBody>
          <FormControl>
            <FormHelperText color="gray.500" py={3}>
              By continuing, you agree to our User Agreement and acknowledge
              that you understand the Privacy Policy.
            </FormHelperText>
            {isSignUp ? (
                <>
                        
                        <Input border="none" bg="gray.200" focusBorderColor="transparent" borderRadius="15" p={2} my={2} height="50px"   placeholder="Email"  color="black" type="text" onChange={(e) =>setEmail(e.target.value)} />
                       
                        <Input border="none" bg="gray.200" focusBorderColor="transparent" borderRadius="15"  p={2} my={2} height="50px"   color="black" placeholder="Username" onChange={(e) =>setUname(e.target.value)} type="Username" />
                       
                        <Input  border="none"bg="gray.200"focusBorderColor="transparent" borderRadius="15"  p={2} my={2} height="50px" color="black"  placeholder="Password" onChange={(e) =>setPassword(e.target.value)}  type="password" />


                </>
            ) : (
                <>
                      
                        <Input border="none"bg="gray.200" focusBorderColor="transparent" borderRadius="15" placeholder="Username" p={2} my={2} height="50px" onChange={(e) =>setUname(e.target.value)} color="black" type="text" />
                      
                        <Input border="none"  bg="gray.200" focusBorderColor="transparent" borderRadius="15" py={3} color="black"p={2}  my={5} height="50px"  onChange={(e) =>setPassword(e.target.value)} placeholder="Password * " type="password" />
                </>
                
            )}


            <FormHelperText color="black">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <a  onClick={toggleComponent}>
                    Log In
                  </a>
                </>
              ) : (
                <>
                  New to Reddit?{" "}
                  <a onClick={toggleComponent} >
                    Sign Up
                  </a>
                </>
              )}
            </FormHelperText>
            <FormHelperText color="black">
              Forgot your <a>Username</a> and{" "}
              <a>Password</a>?
            </FormHelperText>
            <Center py={3}  >
              <Button bg="#3182ce" color="gray.200"  _hover={{ bg: 'reddit.100' }} borderRadius="50" width={40} onClick={() => {
               isSignUp ? registerHandle() : loginHandle()
              }} alignItems="center">
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>
            </Center>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Login;
