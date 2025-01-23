import express from 'express';
import { createUserController, updateUserController } from '../Controller/UserController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const userRoutes=express.Router();

userRoutes.post("/create",createUserController);
userRoutes.put("/update",isLoggedIn,updateUserController);

export default userRoutes;