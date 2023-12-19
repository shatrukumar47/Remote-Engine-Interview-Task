import React, { useState } from 'react'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Text, VStack, useToast } from '@chakra-ui/react'
import { isValidEmail } from '../utils/validators';
import { loginDeveloper } from '../services/developerService';
import { setItemLS } from '../utils/localStorage';
import {useNavigate} from "react-router-dom"

const initialState = {
    email : "",
    password: ""
}

const LoginAsDeveloper = () => {
    const [user, setUser] = useState(initialState);
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);


     //show-hide password
     const [show, setShow] = useState(false)
     const handleClick = () => setShow(!show)

      //navigate
      const navigate = useNavigate()

     //toast feature
     const toast = useToast()




     const handleChange = (e)=>{
        let {value, name} = e.target;

        if(name === "email"){
            const err = isValidEmail(value) ? "" : "enter valid email address";
            setEmailError(err);
        }

        setUser((prev)=>{
            return { ...prev, [name]: value}
        })
    }

    const handleLogin = ()=>{
        if(!emailError && user.password){
            setLoading(true);
            loginDeveloper(user).then((res)=>{
                if(res.data.action){
                    setLoading(false)
                    setItemLS("accessToken", res.data.accessToken)
                    setItemLS("re-role", res.data.role)
                    toast({
                        title:res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                    setUser(initialState)
                    navigate("/")
                }
            }).catch((err)=>{
                setLoading(false)
                if(err.response.status === 400){
                        toast({
                        title: err.response.data.message,
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
        <Text fontSize={"25px"} fontWeight={"bold"} color={"green"} textAlign={"center"} margin={"20px"}>Login as Developer</Text>
        <form>
            <VStack>
                <FormControl isInvalid={emailError}>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' placeholder='Email' name='email' value={user?.email} onChange={handleChange}  />
                    {true && <FormErrorMessage>{emailError}</FormErrorMessage>} 
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={show ? 'text' : 'password'} placeholder='Password' name='password' value={user?.password} onChange={handleChange}  />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button isLoading={loading} isDisabled={loading} onClick={handleLogin} colorScheme='green' marginTop={"30px"}>Login</Button>
            </VStack>
        </form>
</Box>
  )
}

export default LoginAsDeveloper
