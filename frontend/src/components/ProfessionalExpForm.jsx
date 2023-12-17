import { Box,  Button,  Flex,  FormControl, FormLabel, HStack, Input, Select, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const ProfessionalExpForm = ({item, handleAddMore, onChange, handleRemove, index, length, skillData, skills, setSkills}) => {
    

    const handleChange = (e) => {
        onChange(e, index);
    };

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
            onChange({ target: { name: 'add-skills', value: skill } }, index)
        }

    }

    const handleRemoveSkill = (skillID, name)=>{
        let filterSkills = skills.filter((item)=> item._id !== skillID)
        onChange({ target: { name: 'remove-skills', value: skillID } }, index)
        setSkills(filterSkills)
    }


  return (
     <Box>  
        <form>
            <VStack marginTop={"20px"}>
                <FormControl>
                    <FormLabel>Company</FormLabel>
                    <Input type='text' placeholder='Company name' name='companyName' value={item?.companyName} onChange={handleChange}  />
                </FormControl>

                <FormControl>
                    <FormLabel>Tech Stack</FormLabel>
                    <Input type='text' placeholder='Tech Stack' name='techStack' value={item?.techStack} onChange={handleChange}  />
                </FormControl>

                <FormControl>
                    <FormLabel>Duration</FormLabel>
                    <Input type='text' placeholder='Time period' name='duration' value={item?.duration} onChange={handleChange}  />
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
                    item?.skills?.map((item, index)=>{
                        return <HStack key={index} shadow={"md"} bg={"blue.50"} rounded={"md"} padding={"5px"}>
                            <Text>{item.name}</Text>
                            <Text cursor={"pointer"} fontSize={"13px"} color={"blue.200"} onClick={()=> handleRemoveSkill(item._id, item.name)}>X</Text>
                        </HStack>
                    })
                   }
                </Flex>
            </Box>
            </VStack>
        </form>
        {/* Remove  */}
        <HStack justifyContent={"flex-end"}>
            {length > 1 && <Button colorScheme='red' marginTop={"10px"} onClick={()=> handleRemove(index)}>Remove</Button>}
        </HStack>
        {/* Add  */}
        <HStack justifyContent={"flex-end"}>
            {length - 1 === index && <Button colorScheme='green' marginTop={"10px"} onClick={handleAddMore}>+ Add More</Button>}
        </HStack>
    </Box>
  )
}

export default ProfessionalExpForm
