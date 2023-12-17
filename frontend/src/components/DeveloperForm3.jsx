import { Box, Button, HStack, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import ProfessionalExpForm from './ProfessionalExpForm';
import { getAllSkills } from '../services/skillsService';
import { isProfessionalExperiencesValid, mapSkillsInProfessionalExperiences } from '../utils/validators';
import { addProfessionalExperience } from '../services/developerService';
import { useNavigate } from 'react-router-dom';


const initialState = {
    companyName: '',
    techStack: '',
    skills: [],
    duration: '',
  };

const DeveloperForm3 = ({goToNext, goToPrevious}) => {
    const [professionalExperiences, setProfessionalExperiences] = useState([initialState]);
    const [skillData, setSkillData] = useState([]);
    const [skills, setSkills] = useState([]);

     //toast feature
     const toast = useToast()

     //navigate
     const navigate = useNavigate()

     useEffect(()=>{
        getAllSkills().then((res)=>{
           setSkillData(res.data)
        })
    }, [])

    const handleAddMore = ()=>{
        setSkills([])
        setProfessionalExperiences([...professionalExperiences, { companyName: '', techStack: '', skills: [], duration: '' }])
    }

    const handleRemove = (index)=>{
        const newProfessionalExperiences = [...professionalExperiences];
        newProfessionalExperiences.splice(index, 1);
        setProfessionalExperiences(newProfessionalExperiences)
    }

    const handleChange = (e, index)=>{
        const {name, value} = e.target;
        const newProfessionalExperiences = [...professionalExperiences];
        if (name === 'companyName' || name === 'techStack' || name === 'duration') {
            newProfessionalExperiences[index][name] = value;
        }else
        if(name === 'add-skills'){
            newProfessionalExperiences[index].skills.push(value)
        }else
        if(name === 'remove-skills'){
            newProfessionalExperiences[index].skills = skills.filter((item)=> item._id !== value)
        }
        setProfessionalExperiences(newProfessionalExperiences)
    }

    const handleSubmitDetails = ()=>{
        if(isProfessionalExperiencesValid(professionalExperiences)){
            const payload = mapSkillsInProfessionalExperiences(professionalExperiences);
            addProfessionalExperience(payload).then((res)=>{
                
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
                    navigate("/")
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
        <Text fontWeight={"semibold"} fontSize={"20px"}>Professional Experience</Text>
        <Text color={"gray"} >Fill out the details carefully!</Text>
        <Box>
            {
                professionalExperiences.map((item, index)=>{
                    return <ProfessionalExpForm key={index} item={item} handleAddMore={handleAddMore} index={index} length={professionalExperiences.length} handleRemove={handleRemove} onChange={handleChange} skillData ={skillData} skills={skills} setSkills={setSkills} />
                })
            }
        </Box>

        <HStack justifyContent={"center"} borderTop={"1px solid grey"} marginTop={"20px"}>
            <Button colorScheme='blue' marginTop={"10px"} onClick={handleSubmitDetails}>Submit Details</Button>
        </HStack>

    </Box>
  )
}

export default DeveloperForm3
