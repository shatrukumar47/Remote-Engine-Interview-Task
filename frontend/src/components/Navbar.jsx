import React from 'react'
import {Button, HStack, Text} from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <HStack justifyContent={"space-between"} p={"10px 40px"} shadow={"lg"} bg={"black"} color={"white"}>
        <Text fontSize={"25px"} fontWeight={"bold"} onClick={()=> navigate("/")} cursor={"pointer"}>Remote Engine</Text>
        <Button colorScheme='blue'>Login</Button>
    </HStack>
  )
}

export default Navbar
