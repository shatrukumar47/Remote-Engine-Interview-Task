import React, { useEffect, useState } from 'react'
import { getClientDetails} from '../services/clientService';
import { Box, Button, CircularProgress, HStack, Image, Text, VStack} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom"

const ClientProfile = () => {
  const [clientDetails, setClientDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const navigate = useNavigate()

   
 
   useEffect(()=>{
     setLoading(true)
     getClientDetails().then((res)=>{
       if(res.data.action){
         setLoading(false)
         setClientDetails((prev)=> {
           return {...prev, ...res.data.client, password: ""}
         })
       }
     }).catch((err)=>{
       setLoading(false)
       if(err.response.status === 400){
          setErrorMsg(err.response.data.message)
       }
     })
   }, [])

  return (
    <Box width={"500px"} margin={"auto"} minHeight={"500px"} marginTop={"20px"} shadow={"lg"} rounded={"lg"} padding={"10px 30px"}>
      { loading && !errorMsg && <CircularProgress isIndeterminate color='green.300' />}
      { errorMsg && !loading && <Text color={"red"} fontWeight={"bold"}>{errorMsg}</Text> }
      {
        !loading && !errorMsg &&  <VStack alignItems={"flex-start"}>
          <HStack width={"100%"} justifyContent={"space-between"}>
            <Image src='https://cdn-icons-png.flaticon.com/128/3816/3816036.png?ga=GA1.1.1257944628.1683352118&semt=ais' rounded={"full"} />
            <Button colorScheme='green' onClick={()=> navigate("/client-profile-update")}>Update Profile</Button>
          </HStack>
          <Text fontSize={"20px"} fontWeight={"bold"}>{clientDetails?.companyName}</Text>
          <Text fontWeight={"semibold"} color={"gray"}>{clientDetails?.email}</Text>
        </VStack>  
 
      } 
    </Box>
  )
}

export default ClientProfile

