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
            addEducationalExperience(educationalExperiences).then((res)=>{
                if(!res.data.action){
                    toast({
                        title: res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "error",
                    });
                    
                }

                if(res.data.action){
                    toast({
                        title:res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                    goToNext()
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
            <Button colorScheme='blue' marginTop={"10px"} onClick={handleSubmitDetails}>Submit Details</Button>
        </HStack>

    </Box>
  )
}

export default DeveloperForm2
