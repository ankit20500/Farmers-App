// Database interaction logics

import { User } from "../Schema/User.js"

// create user profile
export const createUserRepo=async (obj)=>{
    try {
        const response=await User.create({
            name:obj.name,
            email:obj.email,
            password:obj.password,
            role:obj.role? obj.role:"user"

        });
        return response;
    } catch (error) {
        throw error;
    }
}

// find user details
export const findUser=async(email)=>{
    try {
        const response=await User.findOne({email});
        return response;
    } catch (error) {
        throw error;
    }
}

// update user details
export const updateUserRepo=async(email,body)=>{
    try {
        console.log(body);
        const response=await User.findOneAndUpdate(
            {email},
            {$set:body},
            {new:true});
        return response;
    } catch (error) {
        throw error;
    }
}

// change user password
export const changePasswordRepo=async(email,password)=>{
    try {
        const response=await User.findOneAndUpdate(
            {email},
            {$set:{password:password}},
            {new:true}
        );
        return response;
    } catch (error) {
        throw error;
    }
}

// delete user
export const deleteUserRepo=async(id)=>{
    try {
        const response=await User.findByIdAndDelete(id);
        return response;
    } catch (error) {
        throw error;
    }
}

// find user details by id
export const findUsersProfileRepo=async(id)=>{
    try {
        const user=await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

// User Address Management Repositories
export const getUserAddressesRepo = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user ? user.addresses : [];
    } catch (error) {
        throw error;
    }
}

export const addAddressRepo = async (userId, addressData) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        if (addressData.isDefault || user.addresses.length === 0) {
            addressData.isDefault = true;
            user.addresses.forEach(addr => addr.isDefault = false);
        } else {
            addressData.isDefault = false;
        }
        user.addresses.push(addressData);
        await user.save();
        return user.addresses;
    } catch (error) {
        throw error;
    }
}

export const updateAddressRepo = async (userId, addressId, addressData) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        const address = user.addresses.id(addressId);
        if (!address) throw new Error("Address not found");
        
        Object.assign(address, addressData);
        
        if (address.isDefault) {
            user.addresses.forEach(addr => {
                if (addr._id.toString() !== addressId) addr.isDefault = false;
            });
        }
        await user.save();
        return user.addresses;
    } catch (error) {
        throw error;
    }
}

export const deleteAddressRepo = async (userId, addressId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        const addressToDelete = user.addresses.id(addressId);
        if (!addressToDelete) throw new Error("Address not found");
        
        const wasDefault = addressToDelete.isDefault;
        user.addresses.pull(addressId);
        
        if (wasDefault && user.addresses.length > 0) {
            user.addresses[0].isDefault = true;
        }
        await user.save();
        return user.addresses;
    } catch (error) {
        throw error;
    }
}

export const setDefaultAddressRepo = async (userId, addressId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        let found = false;
        user.addresses.forEach(addr => {
            if (addr._id.toString() === addressId) {
                addr.isDefault = true;
                found = true;
            } else {
                addr.isDefault = false;
            }
        });
        if (!found) throw new Error("Address not found");
        await user.save();
        return user.addresses;
    } catch (error) {
        throw error;
    }
}