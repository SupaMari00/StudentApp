const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());



const port = process.env.PORT || 3000;

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT 
});

db.getConnection((err, connection) => {
if (err) {
console.error("DB CONNECTION ERROR:", err);
} else {
console.log("DB CONNECTED SUCCESSFULLY");
connection.release();
}
});


app.post("/api/adduser", (req,res) => {
  const sql = "INSERT INTO student_details (name, email, age, gender) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender
  ]
  db.query(sql,values, (err, result)=>{
    if(err) res.status(500).json({message: "something unexpected has occured" + err})
      return res.status(201).json({success: "Student added successfully"})
  } )
});

app.get("/api/students",(req,res)=>{
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result)=>{
    if (err) res.json({message: "Server error"});
    return res.json(result);
  })
});


app.get("/api/get_student/:id",(req,res)=>{
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE id = ?";
  db.query(sql,[id], (err,result)=>{
    if (err) res.json({message: "Server error"});
    return res.json(result);
  })
});

app.delete("/api/delete/:id", (req,res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id = ?";
  db.query(sql,[id], (err, result)=>{
    if(err) return res.json({message: "something unexpected has occured" + err})
      return res.json({success: "Student deleted successfully"})
  } )
});

app.put("/api/edit_student/:id", (req,res) => {
  const sql = "UPDATE student_details SET name = ?, email = ?, age = ?, gender = ? WHERE id = ?";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender, req.params.id];
  db.query(sql,values, (err, result)=>{
    if(err) 
      return res.status(500).json({
        message: "something unexpected has occured" + err
      })
      if(result.affectedRows === 0)
         return res.status(404).json({
        message: "Student not found"
      })
      return
       res.status(201).json({
        success: "Student updated successfully"
      })
  } )
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});