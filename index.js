const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/codingGita')
.then(()=>console.log("MongoDB Connection Successfully"))
.catch(()=> console.log("MongoDB Connection Failed"));


const studentSchema = new mongoose.Schema({
    name: String,
    branch: String,
    cgpa: Number
});


const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {

    try {

        const data = new Student(req.body);

        await data.save();

        res.status(201).json(data);

    }
    catch (error) {

        res.status(400).json({ error: error.message });

    }

});

 
app.get("/students", async (req, res) => {

    const data = await Student.find({});

    res.status(200).json(data);

});


// Home Route
app.get("/", (req, res) => {

  res.send("Student server is running...");

});


app.listen(3000, () => {

  console.log("Server started on port 3000");

});