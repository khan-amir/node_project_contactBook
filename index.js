const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const userContact = require('./routes/contact');
const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();

app.use(express.json());

mongoose.connect('mongodb://localhost/my_database')
    .then(() => console.log('Mongodb successfully connected...'))
    .catch(err => console.log('Connection could not connectd...', err));

app.use('/', userContact)


app.listen(PORT,()=>console.log(`Server is Running on localhost:${PORT}`))
