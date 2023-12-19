import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, Select, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { isPasswordValid, isValidEmail, isValidMobileNumber } from '../utils/validators';
import { getAllSkills } from '../services/skillsService';
import { updateDeveloperDetails } from '../services/developerService';


const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    skills: []
}

const EditDeveloperPersonalDetail = ({developer}) => {

    const [user, setUser] = useState(initialState);
    const [skills, setSkills] = useState([]);
    const [skillData, setSkillData] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [loading, setLoading] = useState(false);


    //show-hide password
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    //toast feature
    const toast = useToast()

    useEffect(()=>{
        //Skills
        getAllSkills().then((res)=>{
           setSkillData(res.data)
        })

        setUser({
            firstName: developer?.firstName,
            lastName: developer?.lastName,
            email: developer?.email,
            password: "",
            phoneNumber: developer?.phoneNumber,
            skills: developer?.skills
        }) 

        setSkills(developer?.skills)
    }, [developer])


    const handleChange = (e)=>{
        let {value, name} = e.target;

        if(name === "email"){
            const err = isValidEmail(value) ? "" : "enter valid email address";
            setEmailError(err);
          }
      
          if(name === "password"){
            const err = isPasswordValid(value) ? "" : "must contain one uppercase, one number, one special character";
            setPassError(err);
          }

          if(name === "phoneNumber"){
            // Allow only numeric input
            const numericInput = value.replace(/\D/g, '');

            // Restrict the length to 10 digits
            value = numericInput.slice(0, 10);

            const err = isValidMobileNumber(value) ? "" : "Enter a valid 10-digit mobile number";
            setPhoneError(err);
          }

        setUser((prev)=>{
           return { ...prev, [name]: value}
        })
    }

    const handleSkillChange = (e)=>{
        const [skillID, name] = e.target.value.split(",")
        const skill = {
            _id: skillID,
            name: name
        }

        let existingSkill = skills.find((item)=> item.name === name)

        if(!existingSkill){
            setSkills((prev)=>{
                return [...prev, skill]
            })
        }

    }

    const handleUpdate = ()=>{
        if(user.firstName && user.lastName && !emailError && !passError && !phoneError && skills.length >= 1){
            let skillsWithSkillIDs = skills.map((item)=> item._id);
            let developer = {...user, skills: skillsWithSkillIDs};
            setLoading(true);
            updateDeveloperDetails(developer).then((res)=>{
                if(res.data.action){
                    setLoading(false)
                    toast({
                        title: res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                }
            }).catch((err)=> {
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
        }
    }

    const handleRemoveSkill = (skillID, name)=>{
        let filterSkills = skills.filter((item)=> item._id !== skillID)
        setSkills(filterSkills)
    }


  return (
    <form>
    <VStack padding={"10px"}>
        <HStack width={"100%"} gap={"20px"} marginTop={"20px"}>
            <FormControl>
                <FormLabel>Firstname</FormLabel>
                <Input type='text' placeholder='Firstname' name='firstName' value={user?.firstName} onChange={handleChange}  />
            </FormControl>

            <FormControl>
                <FormLabel>Lastname</FormLabel>
                <Input type='text' placeholder='Lastname' name='lastName' value={user?.lastName} onChange={handleChange}  />
            </FormControl>
        </HStack>

        <FormControl isInvalid={passError}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={show ? 'text' : 'password'} placeholder='Password' name='password' value={user?.password} onChange={handleChange}  />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {passError && <FormErrorMessage>{passError}</FormErrorMessage>} 
        </FormControl>

        <FormControl isInvalid={phoneError}>
            <FormLabel>Mobile</FormLabel>
            <Input type='tel' placeholder='10 digits mobile number' name='phoneNumber' value={user?.phoneNumber} onChange={handleChange} />
            {phoneError && <FormErrorMessage>{phoneError}</FormErrorMessage>} 
        </FormControl>

        <Box width={"100%"}>
            <FormLabel>Multiple Skills</FormLabel>
            <Select type='text' onChange={handleSkillChange}  >
                {
                    skillData.map((item)=>{
                        return <option key={item._id} value={`${item._id},${item.name}`}>{item.name}</option>
                    })
                }
            </Select>
            <Flex flexWrap={"wrap"} gap={"5px"}  width={"100%"} marginTop={"10px"}>
            {
                skills?.map((item, index)=>{
                    return <HStack key={index} shadow={"md"} bg={"blue.50"} rounded={"md"} padding={"5px"}>
                        <Text>{item.name}</Text>
                        <Text cursor={"pointer"} fontSize={"13px"} color={"blue.200"} onClick={()=> handleRemoveSkill(item._id, item.name)}>X</Text>
                    </HStack>
                })
            }
            </Flex>
        </Box>

        <Button onClick={handleUpdate} isLoading={loading} isDisabled={loading} colorScheme='orange' marginTop={"30px"}>Update Personal Details</Button>
    </VStack>
</form>
  )
}

export default EditDeveloperPersonalDetail;
