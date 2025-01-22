import EachComp from '../Auth/EachComp';
import Button from '../Resuable_Comp/Button';
import './Profile.css'

function Profile(){
    return(
        <div className="profile-section">
            <div className="profile-left-section">
                <h3>Settings</h3>
                <p>Dashboard</p>
                <p>Settings</p>
                <p>Update password</p>
                <p>Logout</p>
            </div>

            <div className="profile-line"></div> {/* Vertical line */}

            <div className="profile-right-section">
                <div className='profile-photo'>
                    <img src='https://th.bing.com/th/id/OIP.JZk6lq1hE-j3sF-ibK-_fwHaHa?w=600&h=600&rs=1&pid=ImgDetMain'/>
                </div>

                <div className='profile-details'>
                    <EachComp name={'Full Name'} value={'Ankit Kumar'} readOnly={true}/>

                    <EachComp name={'Email'} value={'example@domain.com'} readOnly={true}/>

                    <EachComp name={'Mobile Number'} value={'+91-0000000000'} readOnly={true}/>

                    <label for="comments">Comments:</label><br/>
                    <textarea id="comments" name="comments" rows="4" cols="15">
                        Enter your comments here
                    </textarea>
                    <br/>

                    <Button value={'Edit Profile'}/>
                </div>
            </div>
        </div>

    )
}

export default Profile;