import React, { useEffect, useState } from 'react'
import { getDeveloperDetails } from '../services/developerService';
import {Box, Button, CircularProgress, Container, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";


const DeveloperProfile = () => {
  const [developer, setDeveloper] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();


  useEffect(()=>{
    setLoading(true)
    getDeveloperDetails().then((res)=>{
      if(res.data.action){
        setLoading(false)
        setDeveloper((prev)=> {
          return {...prev, ...res.data.developer, password: ""}
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
    <Container maxW={"6xl"} minH={"90vh"} padding={"30px 20px"}>
      <Box w={"600px"} margin={"auto"} padding={"30px 20px"} shadow={"xl"} rounded={"lg"} minH={"600px"}>
        {loading && <CircularProgress isIndeterminate color='green.300' />}
        {errorMsg && !loading && <Text color={"red"} fontWeight={"bold"}>{errorMsg}</Text>}
        { !loading && !errorMsg && <VStack alignItems={"flex-start"}>

          <HStack width={"100%"} justifyContent={"space-between"}>
            <Text color={"green"} fontWeight={"bold"} fontSize={"18px"}>Personal Details</Text>
            <Button colorScheme='green' onClick={()=> navigate("/developer-profile-update")}>Update Details</Button>
          </HStack>
          <Image src='https://cdn-icons-png.freepik.com/128/3135/3135715.png?ga=GA1.1.1257944628.1683352118' rounded={"full"} />
          <Text fontSize={"20px"} fontWeight={"bold"}>{developer?.firstName} {developer?.lastName} </Text>
          <Text color={"gray"} fontWeight={"semibold"}>Developer</Text>
          <Text color={"gray"} fontWeight={"semibold"}>{developer?.email}</Text>
          <Text fontWeight={"semibold"}>Phone : {developer?.phoneNumber}</Text>
          <Flex flexWrap={"wrap"} gap={"5px"}>
            {
              developer?.skills?.map((item, index)=>{
                return <Text key={index} bg={"tomato"} rounded={"md"} padding={"5px 10px"} color={"white"}>{item.name}</Text>
              })
            }
          </Flex>

          <Text color={"green"} fontWeight={"bold"} fontSize={"18px"}>Educational Exprience</Text>
          <VStack width={"100%"} gap={"10px"}>
            {
              developer?.educationalExperience?.map((item, index)=>{
                return <Box width={"100%"} key={index}  fontWeight={"semibold"} shadow={"lg"} rounded={"lg"} padding={"10px"} bg={"tomato"} textAlign={"left"}>
                  <Text color={"white"}>{item?.degreeName}</Text>
                  <Text color={"white"}>{item?.schoolName}</Text>
                  <Text>{item?.duration}</Text>
                </Box>
              })
            }
          </VStack>

          
          <Text color={"green"} fontWeight={"bold"} fontSize={"18px"}>Professional Exprience</Text>
          <VStack width={"100%"} gap={"10px"}>
            {
              developer?.professionalExperience?.map((item, index)=>{
                return <Box width={"100%"} key={index}  fontWeight={"semibold"} shadow={"lg"} rounded={"lg"} padding={"10px"} bg={"tomato"} textAlign={"left"}>
                  <Text color={"white"}>{item?.companyName}</Text>
                  <Text color={"white"}>{item?.techStack}</Text>
                  <Text>{item?.duration}</Text>
                  <Flex flexWrap={"wrap"} gap={"5px"}>
                    {
                      item?.skills?.map((item, index)=>{
                        return <Text key={index} bg={"white"} rounded={"md"} padding={"5px 10px"} color={"black"}>{item.name}</Text>
                      })
                    }
                  </Flex>
                </Box>
              })
            }
            </VStack>
          </VStack>
        }
      </Box>
    </Container>
  )
}

export default DeveloperProfile
