import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Resuable_Comp/Button';
import InputField from '../../Resuable_Comp/InputField';
import './Signup.css'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../ContextApi/userContextApi';
import ImageField from '../../Resuable_Comp/ImageField';

function Signup(){
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const {signupButton}=useContext(userContext);

    async function handleSubmitButton(){
        try {
            const obj={name,email,password};
            const response=await signupButton(obj);
            toast(response.data.message);
            console.log(obj);
            navigate("/");
        } catch (error) {
            toast(error.response.data.message);
        }
        setName("");
        setEmail("");
        setPassword("");
    }

    return(
        <div className='register-user'>
            <div className='register-banner'>
                <ImageField 
                    image={"./imageP.webp"}
                    alt={'register-pg-image'}
                />
            </div>

            <div className='register-content'>
                <ImageField 
                    image={"./logoP.webp"}
                    alt={'registr-pg-logo'}
                />
                <p className='register-content-heading'>WELCOME TO KRISHIMART</p>
                <p className='register-content-disc'>Register an account</p>
                <div className='register-content-details'>
                        
                    <InputField
                        onChange={(e)=>setName(e.target.value)}
                        title={"Name"}
                        type={"text"}
                        placeholder={"Enter your name"}
                    />
                    
                    <InputField
                        onChange={(e)=>setEmail(e.target.value)}
                        title={"Email"}
                        type={"text"}
                        placeholder={"example@domain.com"}
                    />

                    <InputField
                        onChange={(e)=>{setPassword(e.target.value)}}
                        title={"Password"}
                        type={"password"}
                        placeholder={"Enter your password"}
                    />

                    <div className='register-pg-checkbox-and-forget'>
                        <label className="register-content-checkbox">
                            <InputField type="checkbox" />
                            <span>Allow rules & regulations</span>
                        </label>
                    </div>
                    <Button onclick={handleSubmitButton} value={'REGISTER'}/>

                    <p className='register-pg-register'>Already have an account? 
                        <Link to={'/auth/login'} className='register-pg-register-btn'>Login</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Signup;