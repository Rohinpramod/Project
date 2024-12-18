const express =  require ("express");
const cors = require('cors');
const { PORT, connectDB } = require("./config/db");
const cookieParser = require('cookie-parser') 

const userRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurantRoutes")
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require('./routes/addressRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const couponRoutes = require('./routes/couponRoutes'); 
const orderRoutes = require('./routes/orderRouter');

const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");


const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true,
    method: ["GET","POST","PUT","PATCH","DELETE"]  

}));


const port = PORT;
const db = connectDB;

db();

app.use("/api/user",userRoutes);
app.use("/api/restaurant",restaurantRoutes);
app.use('/api/cart',authMiddleware,cartRoutes);
app.use('/api/address',authMiddleware,addressRoutes);
app.use('/api/review',authMiddleware,reviewRoutes);
app.use('/api/coupon',authMiddleware,couponRoutes);
app.use('/api/order',authMiddleware,orderRoutes);

app.get("/", (req,res) => {
    res.send("API Running capstone Project");
    
})

app.listen(port,()=>{
    console.log(`App listening on port ${PORT}`)
})

app.all("*",(req,res) => {
    res.status(404).json({message:"End point does not exist"})
})