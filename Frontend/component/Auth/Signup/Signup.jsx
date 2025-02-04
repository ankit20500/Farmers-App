import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Resuable_Comp/Button';
import InputField from '../../Resuable_Comp/InputField';
import EachComp from '../EachComp';
import './Signup.css'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../ContextApi/userContextApi';

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
            navigate("/");
        } catch (error) {
            toast(error.response.data.message);
        }
        setName("");
        setEmail("");
        setPassword("");
    }

    return(
        <div className='signup'>
            <div className='banner'>
                <div className='content'>
                    <p className='heading'>Create your account Here </p>
                    <div className='signup-details'>

                        <EachComp onChange={(e)=>setName(e.target.value)} value={name} name={'Full Name'} type={'text'} placeholder={'Enter your name...'}/>
                        
                        <EachComp onChange={(e)=>setEmail(e.target.value)} value={email} name={'Email'} type={'text'} placeholder={'Example@domain.com'}/>
                        
                        <EachComp onChange={(e)=>setPassword(e.target.value)} value={password} name={'Password'} type={'password'} placeholder={'Enter your password...'}/>

                        <div className='checkbox'>
                            <InputField type={'checkbox'}/>
                            I agree the terms and condition.
                        </div>

                        <Button onclick={handleSubmitButton} value={'SUBMIT'}/>

                        <p>Already have an account? <Link to={'/auth/login'}>Login</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup;