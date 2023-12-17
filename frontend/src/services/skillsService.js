import axios from 'axios';

const skillsAPI = "http://localhost:8080/skills"

export const getAllSkills = async ()=>{
    try {
        const res = await axios.get(skillsAPI)
        return res;
    } catch (error) {
        console.log(error)
    }
}