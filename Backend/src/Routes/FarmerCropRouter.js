import express from 'express';
import { 
    getAllCropsController, 
    getCropByIdController, 
    createCropController, 
    deleteCropController 
} from '../Controller/FarmerCropController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const farmerCropRouter = express.Router();

farmerCropRouter.get("/", getAllCropsController);
farmerCropRouter.get("/:id", getCropByIdController);
farmerCropRouter.post("/", isLoggedIn, createCropController);
farmerCropRouter.delete("/:id", isLoggedIn, deleteCropController);

export default farmerCropRouter;
