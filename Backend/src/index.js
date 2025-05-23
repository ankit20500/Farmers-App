import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/ServerConfig.js';
import { connectDB } from './config/dbConfig.js';
import userRoutes from './Routes/UserRouter.js';
import authRoutes from './Routes/AuthRouter.js';
import productRoutes from './Routes/ProductRouter.js';
import cartRoutes from './Routes/CartRouter.js';


const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({
  //origin: "http://localhost:5173", // Allow frontend
  origin:"*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true // Allow cookies if needed
}));

app.use("/user",userRoutes);
app.use("/auth",authRoutes);
app.use("/product",productRoutes);
app.use("/cart",cartRoutes);



app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  });


app.listen(3000,(req,res)=>{
    console.log(`port is running at port ${PORT}`);
    connectDB();
})
