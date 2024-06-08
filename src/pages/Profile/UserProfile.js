import Address from "../../components/Address/Address";
import Profile from "../../components/Profile/Profile";
import {useContext} from "react";
import {UserProfileContext} from "../../contexts/UserProfileProvider";
import "./UserProfile.css"

const UserProfile = () => {
    const {userProfileState: {isProfileActive, isAddressActive}, toggleUserProfile} = useContext(UserProfileContext);
    return (
        <div className={"user-profile-container"}>
            <main className={"user-profile"}>
                <section className={"user-profile-heading"}>
                    <h3><span className={isProfileActive ? "active-profile-heading" : "inactive-profile-heading"}
                              onClick={e => toggleUserProfile(e)}>Profile</span></h3>
                    <h3><span className={isAddressActive ? "active-address-heading" : "inactive-address-heading"}
                              onClick={e => toggleUserProfile(e)}>Address</span></h3>
                </section>
                <section className={"user-profile-content"}>
                    {isProfileActive && <Profile/>}
                    {isAddressActive && <Address/>}
                </section>
            </main>
        </div>
    );
}

export default UserProfile;