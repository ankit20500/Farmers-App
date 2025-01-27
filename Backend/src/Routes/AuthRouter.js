import express from 'express';
import { userLoginController, userLogoutController, userProfileController } from '../Controller/AuthController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const authRoutes=express.Router();

authRoutes.post("/login",userLoginController);
authRoutes.post("/logout",userLogoutController);
authRoutes.post("/profile",isLoggedIn,userProfileController);

export default authRoutes;