import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Resuable_Comp/Button';
import './Login.css'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../ContextApi/userContextApi';
import InputField from '../../Resuable_Comp/InputField';
import ImageField from '../../Resuable_Comp/ImageField';

function Login(){
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {loginUser,setUser}=useContext(userContext);

    async function handleLogin(){
        const obj={email,password};
        const response=await loginUser(obj);
        setUser(response.data);
        navigate("/");
        toast(response.data.message);
    }
    
    return(
        <div className='login'>
            <div className='login-banner'>
                <ImageField 
                    image={'https://raw.githubusercontent.com/ankit20500/Farmers-App/refs/heads/main/Frontend/component/Auth/imageP.webp'}
                    alt={'login-pg-image'}
                    />
            </div>

            <div className='login-content'>
                <ImageField image={'https://raw.githubusercontent.com/ankit20500/Farmers-App/refs/heads/main/Frontend/component/Auth/logoP.webp'}
                alt={'login-pg-logo'}
                />
                <p className='login-content-heading'>WELCOME TO KRISHIMART</p>
                <p className='login-content-disc'>Login to your account</p>
                <div className='login-content-details'>
                        
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

                    <div className='login-pg-checkbox-and-forget'>
                        <label className="login-content-checkbox">
                            <InputField type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                        <div className='login-content-forget'>
                            <span>Forgot password?</span>
                        </div>
                    </div>
                    <Button onclick={handleLogin} value={'LOGIN'}/>

                    <p className='login-pg-register'>Non't have an account? 
                        <Link to={'/auth/register'} className='login-pg-register-btn'>Signup</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Login;

