import { useContext, useEffect, useState } from 'react';
import Button from '../Resuable_Comp/Button';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { userContext } from '../ContextApi/userContextApi';
import InputField from '../Resuable_Comp/InputField';

function Profile(){
    const {user,UserLogout,deleteUser,updateUserProfile}=useContext(userContext);
    const navigate=useNavigate();
    const [isEditing,setIsEditing]=useState(false);
    const [name,setName]=useState('');
    const [contactNumber,setContactNumber]=useState('');

    // If user is null, you can return loading or a placeholder
    useEffect(() => {
        if (user){
            setName(user.data.name);
            setContactNumber(user.data.contactNumber);
        }
    }, [user]);

    // if user is null the loader will be executed
    if(!user){
        return <Loader/>
    }

    // if user will be update their profile then it will run
    function handleEditprofile(){
        if(isEditing){
            updateUserProfile({name,contactNumber});
        }
        setIsEditing(!isEditing);
    }
    
    return(
        <div className="profile-section">
            <div className="profile-left-section">
                <h3>Settings</h3>
                <p>Dashboard</p>
                <p>Settings</p>
                <p onClick={()=>deleteUser(user.data._id)}>Delete Account</p>
                <p onClick={()=>navigate("/auth/user/change-password")}>Change password</p>
                <p onClick={()=>UserLogout()}>Logout</p>
            </div>

            <div className="profile-line"></div> {/* Vertical line */}

            <div className="profile-right-section">
                <div className='profile-photo'>
                    <img src='https://th.bing.com/th/id/OIP.JZk6lq1hE-j3sF-ibK-_fwHaHa?w=600&h=600&rs=1&pid=ImgDetMain'/>
                </div>

                <div className='profile-details'>
                    <InputField  
                        name={'Full Name'} 
                        value={name} 
                        readOnly={!isEditing}
                        onChange={(e)=>setName(e.target.value)}
                        />

                    <InputField  
                        name={'Email'} 
                        value={user.data.email} 
                        readOnly={!isEditing}/>

                    <InputField 
                        name={'Mobile Number'} 
                        value={contactNumber} 
                        readOnly={!isEditing}
                        onChange={(e)=>setContactNumber(e.target.value)}    
                        />

                    <label htmlFor="comments">Comments:</label><br/>
                    <textarea 
                        id="comments" 
                        name="comments" 
                        rows="3" cols="20" 
                        defaultValue="Enter your comments here" />
                    <br/>

                    <Button onclick={handleEditprofile} value={isEditing?'Set Profile':'Edit Profile'}/>
                </div>
            </div>
        </div>

    )
}

export default Profile;