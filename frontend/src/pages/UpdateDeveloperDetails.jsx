import React, { useEffect, useState } from 'react'
import { getDeveloperDetails } from '../services/developerService';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Container, Text, VStack } from '@chakra-ui/react';
import EditDeveloperPersonalDetail from '../components/EditDeveloperPersonalDetail';
import EditDeveloperEdExperience from '../components/EditDeveloperEdExperience';
import EditDeveloperProfessExp from '../components/EditDeveloperProfessExp';

const UpdateDeveloperDetails = () => {
    const [developer, setDeveloper] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

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
    <Container maxW={"600px"} padding={"30px 10px"}>
        {/* Personal Details  */}
        
        {loading && !errorMsg && <CircularProgress isIndeterminate color='green.300' />}
        {!loading && errorMsg && <Text color={"red"} fontWeight={"bold"}>{errorMsg}</Text>}
        {!loading && !errorMsg &&   <VStack gap={"10px"}>

            <Box width={"100%"} shadow={"lg"} rounded={"xl"} padding={"10px"}>
                <Text color={"green"} fontWeight={"bold"} fontSize={"18px"}>Personal Details</Text>
                <EditDeveloperPersonalDetail developer={developer} />
            </Box>

            <Box width={"100%"} shadow={"lg"} rounded={"xl"} padding={"20px"}>
                <Text color={"green"} fontWeight={"bold"} fontSize={"18px"}>Educational Experience</Text>
                <EditDeveloperEdExperience developer={developer} />
            </Box>

            <Box width={"100%"} shadow={"lg"} rounded={"xl"} padding={"20px"}>
                <Text color={"green"} fontWeight={"bold"} fontSize={"18px"}>Professional Experience</Text>
                <EditDeveloperProfessExp developer={developer} />
            </Box>

        </VStack>}
      
        
    </Container>
  )
}

export default UpdateDeveloperDetails
