import axios from 'axios';
import { getItemLS } from '../utils/localStorage';

const clientAPI = "https://remoteengine.onrender.com/client"
// const clientAPI = "http://localhost:8080/client"

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
export const registerClient = async (payload)=>{
    return await axios.post(`${clientAPI}/register`, payload);   
}

//login as client
export const loginClient = async(client)=>{
    return await axios.post(`${clientAPI}/login`, client)
}

//get client details
export const getClientDetails = async()=>{
    return await axios.get(`${clientAPI}/profile-details`, getHeaders())
}

//update client details
export const updateClientDetails = async (payload)=>{
    return await axios.patch(`${clientAPI}/update-details`, payload, getHeaders())
}
