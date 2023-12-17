import axios from 'axios';

const skillsAPI = "https://remoteengine.onrender.com/skills"

export const getAllSkills = async ()=>{
    try {
        const res = await axios.get(skillsAPI)
        return res;
    } catch (error) {
        console.log(error)
    }
}