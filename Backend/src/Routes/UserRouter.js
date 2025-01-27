import express from 'express';
import { changePasswordController, createUserController, deleteUserController, updateUserController } from '../Controller/UserController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const userRoutes=express.Router();

userRoutes.post("/create",createUserController);
userRoutes.put("/update",isLoggedIn,updateUserController);
userRoutes.put("/password/update",isLoggedIn,changePasswordController);
userRoutes.delete("/delete/:id",isLoggedIn,deleteUserController);

export default userRoutes;