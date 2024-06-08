import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthProvider";
import "./Profile.css";

const Profile = () => {
    const {email, firstname, lastname, toggleLoginStatus} = useContext(AuthContext);
    return (
        <div className={"profile-content"}>
            <h4 className={"profile-fullname"}>Full name: <span>{firstname} {lastname}</span></h4>
            <h4 className={"profile-email"}>Email: {email}</h4>
            <button className={"profile-logout"} onClick={toggleLoginStatus}>Logout</button>
        </div>
    )
}

export default Profile;