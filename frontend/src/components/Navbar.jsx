import React, { useEffect, useState } from 'react'
import {Button, HStack, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text} from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"
import { getItemLS } from '../utils/localStorage';

const Navbar = () => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
      const accessToken = getItemLS("accessToken") || "";
      setToken(accessToken)
    }, [])


  return (
    <HStack justifyContent={"space-between"} p={"10px 40px"} shadow={"lg"} bg={"black"} color={"white"}>
        <Text fontSize={"25px"} fontWeight={"bold"} onClick={()=> navigate("/")} cursor={"pointer"}>Remote Engine</Text>
    </HStack>
  )
}

export default Navbar
