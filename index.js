const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/codingGita")
.then(() => console.log("MongoDB Connection Successfully"))
.catch(() => console.log("MongoDB Connection Failed"));



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




app.post("/addmultipleusers", async (req, res) => {

    try {

        const students = await Student.insertMany(req.body);

        res.status(201).json(students);

    }
    catch (err) {

        res.status(400).json({ error: err.message });

    }

});




app.get("/students", async (req, res) => {

    const data = await Student.find({});

    res.status(200).json(data);

});




app.get("/", (req, res) => {

    res.send("Student server is running...");

});

//pagination

app.get("/students-pagination", async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const students = await Student.find().skip(skip).limit(limit);

        res.status(200).json(students);

    } catch (error) {
        res.status(404).send(error);
    }
});

app.listen(3000, () => {

    console.log("Server started on port 3000");

});