import { Link } from 'react-router-dom';
import Button from '../../Resuable_Comp/Button';
import ImageField from '../../Resuable_Comp/ImageField';
import InputField from '../../Resuable_Comp/InputField';
import EachComp from '../EachComp';
import './Signup.css'

function Signup(){
    return(
        <div className='signup'>
            <div className='banner'>
                <div className='content'>
                    <p className='heading'>Create your account Here </p>
                    <div className='signup-details'>

                        <EachComp name={'Full Name'} type={'text'} placeholder={'Enter your name...'}/>
                        
                        <EachComp name={'Email'} type={'text'} placeholder={'Example@domain.com'}/>
                        
                        <EachComp name={'Password'} type={'password'} placeholder={'Enter your password...'}/>

                        <div className='checkbox'>
                            <InputField type={'checkbox'}/>
                            I agree the terms and condition.
                        </div>

                        <Button value={'SUBMIT'}/>

                        <p>Already have an account? <Link to={'/auth/login'}>Login</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup;