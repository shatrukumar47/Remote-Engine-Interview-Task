import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleClient = ()=>{
      navigate("/register-client")
    }
    const handleDeveloper = ()=>{
        navigate("/register-developer")
    }
  return (
    <Box padding={"40px 20px"} bg={"blue.100"}>
        <Flex justify={"center"} align={"center"} minH={"80vh"} direction={"column"} gap={"20px"}>
            <Button onClick={handleClient} colorScheme='orange' shadow={"lg"}>Register as Client</Button>
            <Button onClick={handleDeveloper} colorScheme='twitter' shadow={"lg"}>Register as Developer</Button>
        </Flex>
    </Box>
  )
}

export default Home
