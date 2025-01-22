import express from 'express';
import { createUserController } from '../Controller/UserController.js';

const userRoutes=express.Router();

userRoutes.post("/create",createUserController);

export default userRoutes;