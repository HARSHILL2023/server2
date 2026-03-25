const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/codingGita")
.then(() => console.log("MongoDB Connection Successfully"))
.catch(() => console.log("MongoDB Connection Failed"));



const userSchema = new mongoose.Schema({
  name : {
type:String,
required: true,

type:String,
required:true,
uniqe: true
  }
});


const Student = mongoose.model("Student", studentSchema);



