import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { isPasswordValid, isValidEmail } from '../utils/validators';
import { registerClient } from '../services/clientService';

const initialState = {
    companyName: "",
    email: "",
    password: ""
}

const ClientSignup = () => {
    const [client, setClient] = useState(initialState);
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");

    //show-hide password
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

     //toast feature
     const toast = useToast()

    const handleChange = (e)=>{
        let {value, name} = e.target;

        if(name === "email"){
            const err = isValidEmail(value) ? "" : "enter valid email address";
            setEmailError(err);
        }
      
        if(name === "password"){
            const err = isPasswordValid(value) ? "" : "must contain one uppercase, one number, one special character";
            setPassError(err);
        }

        setClient((prev)=>{
            return { ...prev, [name]: value}
        })
    }

    const handleSignup = ()=>{
        if(client.companyName && !emailError && !passError){
            registerClient(client).then((res)=>{
                if(res.data.action){
                    toast({
                        title: `Registered successfully`,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                    setClient(initialState)
                }

                if(!res.data.action){
                    toast({
                        title: res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "error",
                    });
                }
            })
        }
    }



  return (
    <Box width={"400px"} margin={"40px auto"} shadow={"lg"} padding={"20px 10px"}>
      <form>
        <VStack>
            <FormControl>
                <FormLabel>Organization</FormLabel>
                <Input type='text' placeholder='Company' name='companyName' value={client?.companyName} onChange={handleChange}  />
            </FormControl>

            <FormControl isInvalid={emailError}>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='Email' name='email' value={client?.email} onChange={handleChange}  />
                {true && <FormErrorMessage>{emailError}</FormErrorMessage>} 
            </FormControl>

            <FormControl isInvalid={passError}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Password' name='password' value={client?.password} onChange={handleChange}  />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {passError && <FormErrorMessage>{passError}</FormErrorMessage>} 
            </FormControl>

            <Button onClick={handleSignup} colorScheme='green' marginTop={"30px"}>Signup</Button>
        </VStack>
      </form>
    </Box>
  )
}

export default ClientSignup
