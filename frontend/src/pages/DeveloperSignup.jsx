import { Box, Container, useSteps } from '@chakra-ui/react'
import React from 'react'
import OnboardingStepper from '../components/OnboardingStepper'
import DeveloperForm1 from '../components/DeveloperForm1'
import DeveloperForm3 from '../components/DeveloperForm3'
import DeveloperForm2 from '../components/DeveloperForm2'

const steps = [
    { title: 'Registeration', description: 'Basic Details' },
    { title: 'Education', description: 'Educational Details' },
    { title: 'Work Experience', description: 'Professional Experience' },
]
  

const DeveloperSignup = () => {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    })



  return (
    <Box minH={"90vh"} padding={"50px 10px"}>
        <Container minW={"5xl"} padding={"40px 20px"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} border={"1px solid skyblue"} shadow={"lg"} rounded={"md"}>
            <OnboardingStepper activeStep={activeStep} steps={steps} />
            <Box width={"600px"}>
                { activeStep === 0  && <DeveloperForm1 goToNext={goToNext} />}
                { activeStep === 1  && <DeveloperForm2 goToPrevious={goToPrevious} goToNext={goToNext} />}
                { activeStep === 2  && <DeveloperForm3 goToPrevious={goToPrevious} goToNext={goToNext} />}

            </Box>
        </Container>
    </Box>
  )
}

export default DeveloperSignup
