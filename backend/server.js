import express from "express";
import {PORT, MONGODB_URI } from "./config.js"
import cors from "cors";
import mongoose from "mongoose";




const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res) => {
    res.send("API Running");
})

mongoose.connect(MONGODB_URI)
        .then(()=>{
            console.log("App is connected to database");
            app.listen(PORT,() => {
                console.log(`App is listening to port:${PORT}`);
            });
        })
        .catch((error)=>{
            console.log(error);
        })