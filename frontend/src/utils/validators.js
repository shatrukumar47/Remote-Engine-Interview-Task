 //check email validation
 export const isValidEmail = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//check password strength
export const isPasswordValid = (password)=>{
     // Minimum length of 6, at least 1 special character, 1 number, and 1 uppercase letter
     const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[A-Z]).{6,}$/;

     return passwordRegex.test(password)
}

//check phone number validation
export const isValidMobileNumber = (mobileNumber) => {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
};

//checking education details should be filled
export const isEducationalExperiencesValid = (educationalExperiences) => {
    return educationalExperiences.every((experience) => {
      return Object.values(experience).every((value) => value.trim() !== '');
    });
};

//checking professional details should be filled
export const isProfessionalExperiencesValid = (professionalExperiences) => {
  return professionalExperiences.every((experience) => {
    const areStringsFilled = Object.values(experience)
      .filter((value) => typeof value === 'string') // Only consider string values
      .every((value) => value.trim() !== ''); // Check that each string is not an empty string

    const areArraysNotEmpty = Object.values(experience)
      .filter(Array.isArray) // Only consider array values
      .every((array) => array.length !== 0); // Check that each array has a length greater than zero

    return areStringsFilled && areArraysNotEmpty;
  });
};


//mapping skills out of skills from each experience
export const mapSkillsInProfessionalExperiences = (professionalExperiences) => {
  return professionalExperiences.map((experience) => {
    const mappedExperience = { ...experience };

    // Map out the skill IDs in the 'skills' array
    mappedExperience.skills = mappedExperience.skills.map((skill) => skill._id);

    return mappedExperience;
  });
};
