import { useContext, useState } from 'react';
import Button from '../../Resuable_Comp/Button.jsx';
import EachComp from '../EachComp.jsx';
import './HandlePassword.css';
import { contextProvider } from '../../ContextApi.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ChangePassword(){
    const {changePassword}=useContext(contextProvider);
    const navigate=useNavigate(); 

    const [prevPassword,setPrevPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');

    async function handleSubmit(){
        try {
            const obj={prevPassword,newPassword};
            const response=await changePassword(obj);
            toast(response.data.message);
            navigate("/auth/user/profile");
        } catch (error) {
            toast(error.response.data.message);
        }
    }

    return(
        <div className='password-section'>
            <div className='password-subsection'>
                <EachComp 
                    onChange={(e)=>setPrevPassword(e.target.value)} 
                    name={'Previous Password'} 
                    type={'password'} 
                    placeholder={'previous password...'}
                    />

                <EachComp
                    onChange={(e)=>setNewPassword(e.target.value)} 
                    name={'New Password'} 
                    type={'password'} 
                    placeholder={'new password...'}
                    />

                <Button onclick={handleSubmit} className='password-change' value={'Submit'}/>
            </div>
        </div>
    )
}

export default ChangePassword;