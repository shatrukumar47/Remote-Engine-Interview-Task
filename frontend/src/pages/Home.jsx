import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteItemLS, getItemLS } from '../utils/localStorage';

const Home = () => {
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
      const accessToken = getItemLS("accessToken") || "";
      const role = getItemLS("re-role") || "";
      setToken(accessToken)
      setRole(role)
    }, [])

   
    const handleProfile = ()=>{
      if(role && role === "developer"){
        navigate("/developer-profile")
      }else if(role && role === "client"){
        navigate("/client-profile")
      }
    }

    const handleLogout = ()=>{
      deleteItemLS("accessToken")
      deleteItemLS("re-role")
      navigate("/login-developer")
    }
  return (
    <Box padding={"40px 20px"} bg={"blue.100"}>
      
        <Flex justify={"center"} align={"center"} minH={"80vh"} direction={"column"} gap={"20px"}>
          {token && <Heading>Welcome to Remote Engine Assignment</Heading> }
          {token && <Button colorScheme='orange' onClick={handleProfile}>Go to Profile</Button> }
          {token && <Button colorScheme='red' onClick={handleLogout}>Logout</Button> }

          {/* Register  */}
          {!token && <Button onClick={()=> navigate("/register-client")} colorScheme='orange' shadow={"lg"}>Register as Client</Button> }
          {!token && <Button onClick={()=> navigate("/register-developer")} colorScheme='twitter' shadow={"lg"}>Register as Developer</Button>}

          {!token && <Box p={"2px"} bg={"black"} width={"100%"} shadow={"lg"} rounded={"lg"}></Box>}

          {/* Login  */}
          {!token && <Button onClick={()=> navigate("/login-developer")} colorScheme='twitter' shadow={"lg"}>Login as Developer</Button>}
          {!token && <Button onClick={()=> navigate("/login-client")} colorScheme='orange' shadow={"lg"}>Login as Client</Button> }
            
        </Flex>
    </Box>
  )
}

export default Home
