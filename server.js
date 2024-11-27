import express from "express";
const app=express();
import 'dotenv/config';
import {connection} from './database/db.js';
console.log(connection());
const PORT=process.env.PORT || 3000;
import resumeRoutes from "./routes/resumeRoutes.js"; 
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("done");
})

app.use("/resume",resumeRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} successfully..!!`)
})
