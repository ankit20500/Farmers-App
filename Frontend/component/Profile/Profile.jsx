import { useContext, useEffect } from 'react';
import EachComp from '../Auth/EachComp';
import Button from '../Resuable_Comp/Button';
import './Profile.css'
import { contextProvider } from '../ContextApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile(){
    const {user,setUser,UserLogout,deleteUser}=useContext(contextProvider);
    const navigate=useNavigate();

    // user logout section
    async function handleLogout() {
        await UserLogout();
        navigate("/");
    }
    // If user is null, you can return loading or a placeholder
    useEffect(() => {
        if (!user) {
            console.log(user);
            navigate("/auth/login"); // Redirect to login page if user is not logged in
            toast("please login")
        }
    },[user, navigate]);

    // user delete 
    async function handleDelete(){
        try {
            const response=await deleteUser(user._id);
            toast(response.data.message);
            setUser(null);
            navigate("/");
        } catch (error) {
            toast(error.response.data.message);
        }
    }

    return(
        <div className="profile-section">
            <div className="profile-left-section">
                <h3>Settings</h3>
                <p>Dashboard</p>
                <p>Settings</p>
                <p onClick={handleDelete}>Delete Account</p>
                <p onClick={()=>navigate("/auth/user/change-password")}>Change password</p>
                <p onClick={handleLogout}>Logout</p>
            </div>

            <div className="profile-line"></div> {/* Vertical line */}

            <div className="profile-right-section">
                <div className='profile-photo'>
                    <img src='https://th.bing.com/th/id/OIP.JZk6lq1hE-j3sF-ibK-_fwHaHa?w=600&h=600&rs=1&pid=ImgDetMain'/>
                </div>

                <div className='profile-details'>
                    <EachComp  name={'Full Name'} value={user.data.name} readOnly={true}/>

                    <EachComp  name={'Email'} value={user.data.email} readOnly={true}/>

                    <EachComp name={'Mobile Number'} value={user.data.contactNumber} readOnly={true}/>

                    <label htmlFor="comments">Comments:</label><br/>
                    <textarea 
                        id="comments" 
                        name="comments" 
                        rows="3" cols="20" 
                        defaultValue="Enter your comments here" />
                    <br/>

                    <Button value={'Edit Profile'}/>
                </div>
            </div>
        </div>

    )
}

export default Profile;