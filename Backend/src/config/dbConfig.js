import mongoose from "mongoose";
import { MONGODB_URL } from "./ServerConfig.js";

export const connectDB=async()=>{
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database is connected successfully");
    } catch (error) {
        console.log("Failed to connect with database");
        console.log(error);
    }
}