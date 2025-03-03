import { useContext, useState } from 'react';
import Button from '../../Resuable_Comp/Button.jsx';
import './HandlePassword.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../../ContextApi/userContextApi.jsx';
import InputField from '../../Resuable_Comp/InputField.jsx';

function ChangePassword(){
    const {changePassword}=useContext(userContext);
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
                <InputField 
                    onChange={(e)=>setPrevPassword(e.target.value)} 
                    title={'Previous Password'} 
                    type={'password'} 
                    placeholder={'previous password...'}
                    />

                <InputField
                    onChange={(e)=>setNewPassword(e.target.value)} 
                    title={'New Password'} 
                    type={'password'} 
                    placeholder={'new password...'}
                    />

                <Button onclick={handleSubmit} className='password-change' value={'Submit'}/>
            </div>
        </div>
    )
}

export default ChangePassword;