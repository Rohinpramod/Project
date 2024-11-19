const express =  require ("express");
const cors = require('cors');
const { PORT, connectDB } = require("./config/db");

const userRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurantRoutes")
const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");

const app = express();

app.use(express.json());



const port = PORT;
const db = connectDB;

db();

app.use("/api/user",userRoutes);
app.use("/api/restaurant",authMiddleware, restaurantRoutes);

app.get("/", (req,res) => {
    res.send("API Running");
    
})

app.listen(port,()=>{
    console.log(`App listening on port ${PORT}`)
})

app.all("*",(req,res) => {
    res.status(404).json({message:"End point does not exist"})
})