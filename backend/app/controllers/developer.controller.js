const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DeveloperModel } = require("../models/developer.model");
require("dotenv").config();


//initial registeration
const registerDeveloper = async (req, res)=>{
    const { firstName, lastName, phoneNumber, email, password, skills } = req.body;
    try {
        const existingDeveloper = await DeveloperModel.findOne({ email });
        if (existingDeveloper) {
            return res.status(200).json({ message: 'Account already exists', action: false });
        }

        //password hashing
        bcrypt.hash(password, +process.env.saltRounds, async (err, hash)=>{
            if(err){
                res.status(400).send({error: err});
            }
            
            //new developer
            const newDeveloper = new DeveloperModel({firstName, lastName, phoneNumber, email, password: hash, skills});
            await newDeveloper.save();

            //jwt accessToken
            const accessToken = jwt.sign({userID: newDeveloper._id, email: email}, process.env.JWT_SECRET)

            res.status(200).json({ message: 'Registered successfully', accessToken ,action: true });
        })

    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}


//Add educational experience
const addEducationalExperience  = async (req, res)=>{
    const educationalExperience = req.body.educationalExperience || []
    try {

        const developer = await DeveloperModel.findOne({email: req.body.email})
        if(!developer){
            return res.status(200).json({ message: 'Developer not found', action: false });
        }

        //add education details
        developer.educationalExperiences.push(...educationalExperience);
        await developer.save();

        res.status(200).json({ message: 'Educational experience added successfully', action: true });
        
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}


// Add professional experience
const addProfessionalExperience = async (req, res)=>{
    const professionalExperience  = req.body.professionalExperience  || []
    try {

        const developer = await DeveloperModel.findOne({email: req.body.email})
        if(!developer){
            return res.status(200).json({ message: 'Developer not found', action: false });
        }

        //add education details
        developer.professionalExperience.push(...professionalExperience );
        await developer.save();

        res.status(200).json({ message: 'Professional experience added successfully', action: true });
        
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}

module.exports = {
    registerDeveloper, addEducationalExperience, addProfessionalExperience
}