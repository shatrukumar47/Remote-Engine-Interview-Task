import axios from 'axios';
import { getItemLS } from '../utils/localStorage';

const developerAPI = "https://remoteengine.onrender.com/developer"
// const developerAPI = "http://localhost:8080/developer"

const getHeaders = ()=>{
  const token = getItemLS("accessToken") || "";
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
}

//registeration
export const registerDeveloper = async (payload)=>{
    return axios.post(`${developerAPI}/register`, payload);
}

//login developer
export const loginDeveloper = async (user)=>{
  return axios.post(`${developerAPI}/login`, user);
}

//add educational details
export const addEducationalExperience = async (payload)=>{
    return  await axios.post(`${developerAPI}/add-education`, {"educationalExperience": payload}, getHeaders())
}

//add professional details
export const addProfessionalExperience = async (payload)=>{
    return await axios.post(`${developerAPI}/add-profession`, {"professionalExperience": payload}, getHeaders())
}

//get developer details
export const getDeveloperDetails = async()=>{
  return await axios.get(`${developerAPI}/profile-details`, getHeaders())
}

//update developer details
export const updateDeveloperDetails = async (payload)=>{
  return await axios.patch(`${developerAPI}/update-developer-details`, payload, getHeaders())
}

