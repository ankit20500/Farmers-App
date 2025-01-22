import {createProductRepo} from '../Repository/ProductRepository.js'
import { findUser } from '../Repository/UserRepository.js';

export const createProductService=async(body,res)=>{
    try {
        const {email}=res.user;
        const user=await findUser(email);

        // check that user is admin or user only
        if(user.role!='admin'){
            throw{message:"only admin have authority for creating products"}
        }

        // if user is admin then it can create the products
        const response=await createProductRepo(body);
        return response;
    } catch (error) {
        throw error;
    }
}