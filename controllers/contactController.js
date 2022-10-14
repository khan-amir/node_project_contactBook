const ContactModel = require("../models/Contact");
const userModel = require('../models/Users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.ACCESSKEY || 'USERCONTACTAPI';

const getContact = async (req, res)=>{
    const emailAddress = req.params.email;
    try {
        const contact = await ContactModel.findOne({ emailAddress});
        if(contact){
          res.status(200).json(contact);
        }
        else{
          res.status(400).json({message: `No contact found by email: ${emailAddress}`});
        }
      } catch (err) {
        res.status(500).json(err);
      }
};

const getPaginated = async(req, res)=>{

    try {
      
      if(!req.query.page){
        return res.status(400).json({message: 'Please add page number in the url query'})
      }
      if(!req.query.limit){
        return res.status(400).json({message: 'Please add limit number in the url query'})
      }
      
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
  
      const startIndex = (page -1) * limit;
      const endIndex = page * limit;
  
      const results = {}
  
      const user = await ContactModel.find();
  
      if(endIndex < user.length) {
          results.next = {
          page: page + 1,
          limit: limit
      }}
  
      if(startIndex > 0) {
          results.previous = {
              page: page - 1,
              limit: limit
      }}
  
      results.results= user.slice(startIndex, endIndex);
      res.json(results)
    } catch (err) {
      res.status(500).json(err);
    }
};

const addUser = async(req, res)=>{
    const contactData = req.body;
    const newContact = new ContactModel(contactData);

  try {
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addBulkUser = async(req, res)=>{
    const contactData = req.body;
    if(!Array.isArray(contactData)){
        return res.status(400).json({message: 'Please provide contact information in an Array'})
    }

  try {
    const newContact = await ContactModel.insertMany(contactData);
    res.status(200).json(newContact);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
    const emailAddress = req.params.email;
    const updateContact = req.body;
    const updated = await ContactModel.findOneAndUpdate({emailAddress}, updateContact)
    res.status(200).send(updated);
};

const deleteUser = async(req, res)=>{
    try {
        const emailAddress = req.params.email;
        const contactRemoved = await ContactModel.findOneAndRemove({emailAddress});
        if(contactRemoved){
            res.status(200).json(contactRemoved);
        }
        else{
            res.status(400).json({message:`Unable to deleted ${emailAddress}`});
        }
      } catch (err) {
        res.status(500).json(err);
      }
};

const userSignUp = async(req, res) => {
   try {
    const {username, password} = req.body;

    const existingUser = await userModel.findOne({ username })
    if(existingUser){
        return res.status(400).json({message:  `User '${username}' already exists.`})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
        username: username,
        password: hashedPassword
    })

    const token = jwt.sign({username: result.username, id: result._id}, SECRET_KEY)
    res.status(201).json({user: result, token: token})
   } catch (err) {
    res.status(500).json(err);
    
   }
}

const userSignIn = async(req, res) => {
    try {
        const {username, password} = req.body;

        const existingUser = await userModel.findOne({ username })
        if(!existingUser){
            return res.status(404).json({message:  `User '${username}' not found.`})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message: 'Invalid Credentials'})
        }

        const token = jwt.sign({username: existingUser.username, id: existingUser._id}, SECRET_KEY, {expiresIn: '1h'})
        res.status(201).json({user: existingUser, token: token})
    } catch (err) {
        res.status(500).json(err);
        
    }
}

module.exports = {
    getContact,
    getPaginated,
    addUser,
    addBulkUser,
    updateUser,
    deleteUser,
    userSignUp,
    userSignIn,
    SECRET_KEY
}