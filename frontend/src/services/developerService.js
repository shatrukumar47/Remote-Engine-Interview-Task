import axios from 'axios';
import { getItemLS } from '../utils/localStorage';

const developerAPI = "https://remoteengine.onrender.com/developer"

//registeration
export const registerDeveloper = async (payload)=>{
    try {
        const res = await axios.post(`${developerAPI}/register`, payload);
        return res;
    } catch (error) {
        console.log("Error while registering Developer : ", error)
    }
}

//add educational details
export const addEducationalExperience = async (payload)=>{
    try {
        const token = getItemLS("accessToken") || "";
        const res = await axios.post(`${developerAPI}/add-education`, {"educationalExperience": payload}, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        return res;
    } catch (error) {
        console.log("Error adding educational Experience : ", error)
    }
}

//add professional details
export const addProfessionalExperience = async (payload)=>{
    try {
        const token = getItemLS("accessToken") || "";
        const res = await axios.post(`${developerAPI}/add-profession`, {"professionalExperience": payload}, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        return res;
    } catch (error) {
        console.log("Error adding professional Experience : ", error)
    }
}