import React, { useEffect, useState } from 'react'
import { getClientDetails, updateClientDetails } from '../services/clientService';
import { Box, Button, CircularProgress, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, Text, VStack, useToast } from '@chakra-ui/react';
import { isPasswordValid } from '../utils/validators';

const UpdateClientProfile = () => {
  const [clientDetails, setClientDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [edit, setEdit] = useState(false);

   //toast feature
   const toast = useToast()

  const handleChange = (e)=>{
    let {value, name} = e.target;

    if(name === "password"){
        const err = isPasswordValid(value) ? "" : "must contain one uppercase, one number, one special character";
        setPassError(err);
      }

    setClientDetails((prev)=>{
        return { ...prev, [name]: value}
    })
  }

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

  const handleUpdate = ()=>{
    if(!passError && clientDetails?.companyName){
      updateClientDetails(clientDetails).then((res)=>{
        if(res.data.action){
          setLoading(false)
          toast({
              title: res.data.message,
              position: "top",
              isClosable: true,
              duration: 1000,
              status: "success",
          });
          setEdit(false)
      }
      }).catch((err)=>{
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
    <Box width={"500px"} margin={"auto"} minHeight={"500px"} marginTop={"20px"} shadow={"lg"} rounded={"lg"} padding={"10px 30px"}>
        {loading && !errorMsg && <CircularProgress isIndeterminate color='green.300' />}
        {errorMsg && !loading && <Text color={"red"} fontWeight={"bold"}>{errorMsg}</Text> }
        {!loading && !errorMsg && <Box>

            <Text color={"green"} fontWeight={"bold"} fontSize={"18px"}>Organization Details</Text>
            <HStack justifyContent={"flex-end"}>
                <Button marginTop={"20px"} colorScheme='green' onClick={()=> setEdit((prev)=> !prev)}>Edit</Button>
            </HStack>
        

          <form>
            <VStack marginTop={"30px"}>
              <FormControl>
                  <FormLabel>Organization</FormLabel>
                  <Input type='text' placeholder='Company' name='companyName' value={clientDetails?.companyName} onChange={handleChange} isDisabled={!edit}  />
              </FormControl>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' placeholder='Email' name='email' value={clientDetails?.email} isDisabled={true} />
                </FormControl>

                <FormControl isInvalid={passError}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type="password" placeholder='Password' name='password' value={clientDetails?.password} onChange={handleChange} isDisabled={!edit} />
                    </InputGroup>
                    {passError && <FormErrorMessage textAlign={"left"}>{passError}</FormErrorMessage>} 
                </FormControl>

                <Button isLoading={loading} onClick={handleUpdate} colorScheme='orange' marginTop={"30px"} isDisabled={!edit}>Update</Button>
            </VStack>
        </form>
        </Box>
      }

      

      
    </Box>
  )
}

export default UpdateClientProfile;

