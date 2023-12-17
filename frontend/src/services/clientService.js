import axios from 'axios';

const clientAPI = "https://remoteengine.onrender.com/client"

//registeration
export const registerClient = async (payload)=>{
    try {
        const res = await axios.post(`${clientAPI}/register`, payload);
        return res;
    } catch (error) {
        console.log("Error while registering Client : ", error)
    }
}


