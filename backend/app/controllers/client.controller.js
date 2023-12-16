const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ClientModel } = require("../models/client.model");
require("dotenv").config();


//Initial Registration of Client
const registerClient = async (req, res)=>{
    try {
        const { companyName, email } = req.body;
    
        // Check if the client with the given email already exists
        const existingClient = await ClientModel.findOne({ email });
        if (existingClient) {
          return res.status(400).json({ message: 'Client already exists with this email.' });
        }
    
        // Create a new client instance
        const newClient = new ClientModel({ companyName, email });
    
        // Save the client to the database
        await newClient.save();
    
        res.status(201).json({ message: 'Client registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}



module.exports = {
    registerClient
}