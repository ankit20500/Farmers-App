import { Link } from 'react-router-dom';
import Button from '../../Resuable_Comp/Button';
import './Login.css'
import EachComp from '../EachComp';

function Login(){
    return(
        <div className='login'>
            <div className='login-banner'>
                <div className='content'>
                    <p className='heading'>Login your account Here </p>
                    <div className='signup-details'>
                        
                        <EachComp name={'Enter your email'} type={'text'} placeholder={'example@domain.com'}/>

                        <EachComp name={'Password'} type={'password'} placeholder={'Enter your password'}/>

                        <Button value={'LOGIN'}/>

                        <p>You are new here? <Link to={'/auth/register'}>Signup</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;