// API NEEDED 

// add student with personal profile and education profile
// get all students 
// get one student 
// Update one student 
// Delete one student 

// Add education for one student 
// Update one student education 
// Delete one student education 

// Edit personal details
// No delete and no add personal details


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 9090;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello world Successfully connected to the database !");
})

mongoose.connect("mongodb://localhost:27017/Students",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to the database!");
    app.listen(port,()=>{
        console.log(`Connected to the server on port ${9090}`);
    });
})
.catch(()=>{
    console.log("connection error!");
})