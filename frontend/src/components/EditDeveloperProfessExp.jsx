import { Box, Button, HStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getAllSkills } from '../services/skillsService';
import ProfessionalExpForm from './ProfessionalExpForm';
import {isProfessionalExperiencesValid, mapSkillsInProfessionalExperiences} from "../utils/validators"
import {addProfessionalExperience} from "../services/developerService"


const initialState = {
    companyName: '',
    techStack: '',
    skills: [],
    duration: '',
};

const EditDeveloperProfessExp = ({developer}) => {
    const [professionalExperiences, setProfessionalExperiences] = useState([initialState]);
    const [skillData, setSkillData] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);

    //toast feature
    const toast = useToast()

    useEffect(()=>{
        getAllSkills().then((res)=>{
           setSkillData(res.data)
        })

        setProfessionalExperiences(developer?.professionalExperience)
    }, [developer])


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
            setLoading(true)
            addProfessionalExperience(payload).then((res)=>{
                if(res.data.action){
                    setLoading(false)
                    toast({
                        title:res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
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
        <Box>
            {
                professionalExperiences?.map((item, index)=>{
                    return <ProfessionalExpForm key={index} item={item} handleAddMore={handleAddMore} index={index} length={professionalExperiences.length} handleRemove={handleRemove} onChange={handleChange} skillData ={skillData} skills={skills} setSkills={setSkills} />
                })
            }
        </Box>

        <HStack justifyContent={"center"} borderTop={"1px solid grey"} marginTop={"20px"}>
            <Button isLoading={loading} isDisabled={loading} colorScheme='orange' marginTop={"10px"} onClick={handleSubmitDetails}>Update Professional Details</Button>
        </HStack>

    </Box>
  )
}

export default EditDeveloperProfessExp
