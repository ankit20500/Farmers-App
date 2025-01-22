import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/ServerConfig.js';
import { connectDB } from './config/dbConfig.js';
import userRoutes from './Routes/UserRouter.js';
import authRoutes from './Routes/AuthRouter.js';
import { isLoggedIn } from './validator/authValidator.js';
import productRoutes from './Routes/ProductRouter.js';


const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/user",userRoutes);
app.use("/auth",authRoutes);
app.use("/product",productRoutes);



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