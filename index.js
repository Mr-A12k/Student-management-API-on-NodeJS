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
const PersonalDetails = require('./models/personalDetails');
const Student = require('./models/studentDetails');
const Work = require('./models/workDetails');

const app = express();
const port = 9090;

app.use(express.json());

// Test the connection to server
app.get('/', (req, res) => {
    res.send("Hello world! Successfully connected to the database!");
});

//post the details of a student 
app.post('/postPersonalDetails', async (req, res) => {
    try {
        const { name, fatherName, dateOfBirth, mobile, email, role, student, work } = req.body;

        if (!name || !fatherName || !dateOfBirth || !mobile || !email || !role) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Check if personal details already exist
        const existingPerson = await PersonalDetails.findOne({ mobile, email });
        if (existingPerson) {
            return res.status(400).json({ message: "Personal details already exist!" });
        }

        // Create new Student and Work documents
        let savedStudent;
        if (student) {
            const newStudent = new Student(student);
            savedStudent = await newStudent.save();
        }

        let savedWork;
        if (work) {
            const newWork = new Work(work);
            savedWork = await newWork.save();
        }

        // Create new PersonalDetails document
        const newPerson = new PersonalDetails({
            name,
            fatherName,
            dateOfBirth,
            email,
            mobile,
            role,
            student: savedStudent ? [savedStudent._id] : {},
            work: savedWork ? [savedWork._id] : []
        });

        const savedPerson = await newPerson.save();

        res.status(200).json({
            message: "Successfully saved!",
            personalDetails: savedPerson,
            studentDetails: savedStudent,
            workDetails: savedWork
        });

    } catch (error) {
        console.error("Error!", error);
        res.status(500).json({ message: "Can't save the details to the database!" });
    }
});

//get all the data with the get method

app.get('/getPersonalData', async (req, res) => {
    try {
        const PersonalData = await PersonalDetails.find().populate('student').populate('work');

        if (PersonalData.length == 0) {
            res.status(500).json({ message: "NO data found!" });
        }
        res.status(200).json({ message: "Data founded !", PersonalData });
    } catch (error) {
        res.status(404).json({ message: "Error finding data!" });
    }
});

//get the details with an id
app.get('/personalDataWithID/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const personData = await PersonalDetails.findById(id).populate('student').populate('work');
        if (!personData) {
            return res.status(500).json({ message: "No data available!" });
        }
        const savedPersonData = personData;
        return res.status(200).json({ message: "Data available!", savedPersonData });

    } catch (error) {
        console.error("Can't get the data from the database!", error);
        return res.status(404).json({ message: "Error! Can't find data" });
    }
});


//get educational details with the person id

app.get('/getStudentWithPersonId/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const personalData = await PersonalDetails.findById(id).populate('student');
        if (!personalData) {
            res.status(404).json({ message: "No Student data availabe for the personal id" });
        }
        const studentDetails = personalData.student;
        //const workDetails = workDetails.work;
        res.status(200).json({ message: "Student details found!", studentDetails });
    } catch (error) {
        console.error("error finding student using parent id", error);
        res.status(500).json({ message: "Error finding student with person id" });
    }
});

//get work with person id
app.get('/getWorkWithPersonalID/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const personalData = await PersonalDetails.findById(id).populate('work');
        if (!personalData) {
            res.status(404).json({ message: "No data found!" });
        }
        const workDetails = personalData.work;
        res.status(200).json({ message: "Data found", workDetails });
    } catch (error) {
        console.error("Error finding the data on work", error);
        res.status(500).json({ message: "error!" });
    }
});


//edit the only personal details with person id
app.put('/editPersonalDetails/:id', async (req, res) => {
    const { id } = req.params;
    const { name, fatherName, dateOfBirth, mobile, email, role } = req.body;

    try {
        // Find the existing personal details document by ID
        const updatedPerson = await PersonalDetails.findByIdAndUpdate(id, { name, fatherName, dateOfBirth, mobile, email, role }, { new: true, runValidators: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: "Personal details not found!" });
        }
        return res.status(200).json({ message: "Successfully updated!", PersonalDetails: updatedPerson })
    } catch (error) {
        console.error("Error while updating the person details!", error);
        res.status(500).json({ message: "Can't update the details in the database!" });
    }
});


//edit only the education details with the person id
app.put('/editEduDetails/:id', async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    try{ 
    const updatedEducation = await PersonalDetails.findByIdAndUpdate(id,
        {$set:{'student.educationHistory':student.educationHistory}},
        {new:true,runValidators:true}).populate('student');
    return res.status(200).json({message:"Successfully edited!",student});
    }
    catch(error){
    console.error("Can't update the education details",error);
    return res.status(404).json({message:"Can't update the education details !"});
    }
});

//deletre educationdetails with a student id
app.delete('/deleteEducation/:id', async(req,res)=>{
    const {id}= req.params;
    const {student}= req.body;
    try {
        const deleteEducation = await Student.findByIdAndDelete(id).populate(student);
        if(!deleteEducation){
        res.status(404).json({message:"No data found on this id"});     
        }
        res.status(200).json({messasage:"Successfully Deleted!"});
    } catch (error) {
        console.log("Error delete the student Details",error);
        return res.status(404).json({message:"Error!"});
    }
})


mongoose.connect("mongodb://localhost:27017/Students", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => {
            console.log(`Connected to the server on port ${port}`);
        });
    })
    .catch(() => {
        console.log("Connection error!");
    });

