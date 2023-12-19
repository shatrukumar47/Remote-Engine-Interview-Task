import { Box,  Button,  FormControl, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import React from 'react'


const EducationExpForm = ({item, handleAddMore, onChange, handleRemove, index, length}) => {

    const handleChange = (e) => {
        onChange(e, index);
    };

  return (
    <Box width={"100%"}>  
        <form>
            <VStack width={"100%"} marginTop={"20px"}>
                <FormControl>
                    <FormLabel>Degree</FormLabel>
                    <Input type='text' placeholder='Degree name' name='degreeName' value={item?.degreeName} onChange={handleChange}  />
                </FormControl>

                <FormControl>
                    <FormLabel>School</FormLabel>
                    <Input type='text' placeholder='School name' name='schoolName' value={item?.schoolName} onChange={handleChange}  />
                </FormControl>

                <FormControl>
                    <FormLabel>Duration</FormLabel>
                    <Input type='text' placeholder='Time period' name='duration' value={item?.duration} onChange={handleChange}  />
                </FormControl>
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

export default EducationExpForm
