import express from 'express';
import { changePasswordController, createUserController, deleteUserController, findUsersProfileController, updateUserController } from '../Controller/UserController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const userRoutes=express.Router();

userRoutes.post("/create",createUserController);
userRoutes.put("/update",isLoggedIn,updateUserController);
userRoutes.put("/password/update",isLoggedIn,changePasswordController);
userRoutes.delete("/delete/:id",isLoggedIn,deleteUserController);
userRoutes.get("/profile/:id",findUsersProfileController);

export default userRoutes;