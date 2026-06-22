import express from 'express';
import { 
    changePasswordController, 
    createUserController, 
    deleteUserController, 
    findUsersProfileController, 
    updateUserController,
    getUserAddressesController,
    addAddressController,
    updateAddressController,
    deleteAddressController,
    setDefaultAddressController
} from '../Controller/UserController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const userRoutes=express.Router();

userRoutes.post("/create",createUserController);
userRoutes.put("/update",isLoggedIn,updateUserController);
userRoutes.put("/password/update",isLoggedIn,changePasswordController);
userRoutes.delete("/delete/:id",isLoggedIn,deleteUserController);
userRoutes.get("/profile/:id",findUsersProfileController);

// User Address Management Routes
userRoutes.get("/addresses", isLoggedIn, getUserAddressesController);
userRoutes.post("/addresses", isLoggedIn, addAddressController);
userRoutes.put("/addresses/:addressId", isLoggedIn, updateAddressController);
userRoutes.delete("/addresses/:addressId", isLoggedIn, deleteAddressController);
userRoutes.put("/addresses/:addressId/default", isLoggedIn, setDefaultAddressController);

export default userRoutes;