import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/ServerConfig.js';
import { connectDB } from './config/dbConfig.js';
import userRoutes from './Routes/UserRouter.js';
import authRoutes from './Routes/AuthRouter.js';
import productRoutes from './Routes/ProductRouter.js';
import cartRoutes from './Routes/CartRouter.js';

const app = express();

// CORS middleware sabse pehle lagao
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

// 404 middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
  });
});

// Start server and connect DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error occurred while connecting to DB:", error);
  });


