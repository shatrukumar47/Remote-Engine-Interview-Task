import React from 'react'
import { HStack, Text} from "@chakra-ui/react"

const Footer = () => {
    return (
        <HStack justifyContent={"space-between"} p={"10px 40px"} bg={"grey"}>
            <Text fontWeight={"bold"}>All Rights Reserved @Remote Engine 2023</Text>
        </HStack>
      )
}

export default Footer
