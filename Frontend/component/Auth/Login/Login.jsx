import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Resuable_Comp/Button';
import './Login.css'
import EachComp from '../EachComp';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../ContextApi/userContextApi';
import InputField from '../../Resuable_Comp/InputField';

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
                <div className='content'>
                    <p className='heading'>Login your account Here </p>
                    <div className='signup-details'>
                        
                        <InputField
                            onChange={(e)=>setEmail(e.target.value)}
                            title={"Enter your email"}
                            type={"text"}
                            placeholder={"example@domain.com"}
                        />

                        <InputField
                            onChange={(e)=>{setPassword(e.target.value)}}
                            title={"Password"}
                            type={"password"}
                            placeholder={"Enter your password"}
                        />
                        <Button onclick={handleLogin} value={'LOGIN'}/>

                        <p>You are new here? <Link to={'/auth/register'}>Signup</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;