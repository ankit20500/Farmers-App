import express from 'express';
import { userLoginController, userLogoutController } from '../Controller/AuthController.js';

const authRoutes=express.Router();

authRoutes.post("/login",userLoginController);
authRoutes.post("/logout",userLogoutController);

export default authRoutes;