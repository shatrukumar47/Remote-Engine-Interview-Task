import React, { useState } from 'react'
import EducationExpForm from './EducationExpForm'
import { Box, Button, HStack, Text, useToast } from '@chakra-ui/react'
import { isEducationalExperiencesValid } from '../utils/validators'
import { addEducationalExperience } from '../services/developerService'

const initialState = {
    degreeName: '', schoolName: '', duration: ''
}

const DeveloperForm2 = ({goToNext, goToPrevious}) => {
    const [educationalExperiences, setEducationalExperiences] = useState([initialState]);
    const [loading, setLoading] = useState(false);

     //toast feature
     const toast = useToast()

    const handleAddMore = ()=>{
        setEducationalExperiences([...educationalExperiences, { degreeName: '', schoolName: '', duration: '' }])
    }

    const handleRemove = (index)=>{
        const newEducationalExperiences = [...educationalExperiences];
        newEducationalExperiences.splice(index, 1);
        setEducationalExperiences(newEducationalExperiences)
    }

    const handleChange = (e, index)=>{
        const {name, value} = e.target;
        const newEducationalExperiences = [...educationalExperiences];
        newEducationalExperiences[index][name] = value;
        setEducationalExperiences(newEducationalExperiences)

    }

    const handleSubmitDetails = ()=>{
        if(isEducationalExperiencesValid(educationalExperiences)){
            setLoading(true);
            addEducationalExperience(educationalExperiences).then((res)=>{
                if(res.data.action){
                    setLoading(false)
                    toast({
                        title:res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                    goToNext()
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
        }else{
            toast({
                title: "All fields are required !",
                position: "top",
                isClosable: true,
                duration: 1000,
                status: "warning",
            });
        }
    }


  return (
    <Box>
        <Text fontWeight={"semibold"} fontSize={"20px"}>Educational Experience</Text>
        <Text color={"gray"} >Fill out the details carefully!</Text>
        <Box>
            {
                educationalExperiences.map((item, index)=>{
                    return <EducationExpForm key={index} item={item} handleAddMore={handleAddMore} index={index} length={educationalExperiences.length} handleRemove={handleRemove} onChange={handleChange} />
                })
            }
        </Box>

        <HStack justifyContent={"center"} borderTop={"1px solid grey"} marginTop={"20px"}>
            <Button isLoading={loading} isDisabled={loading} colorScheme='blue' marginTop={"10px"} onClick={handleSubmitDetails}>Submit Details</Button>
        </HStack>

    </Box>
  )
}

export default DeveloperForm2
