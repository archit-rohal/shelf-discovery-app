import {createContext, useReducer} from "react";
import {initialUserProfile, userProfileReducer} from "../reducers/userProfileReducer";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({children}) => {
    const [userProfileState, dispatchUserProfile] = useReducer(userProfileReducer, initialUserProfile);

    const toggleUserProfile = (e) => {
        const clickedElementText = e.target.innerText;
        if (clickedElementText === 'Profile') {
            dispatchUserProfile({type: 'PROFILE_ACTIVE'});
        } else if (clickedElementText === 'Address') {
            dispatchUserProfile({type: 'ADDRESS_ACTIVE'});
        }
    }
    return (
        <UserProfileContext.Provider value={{toggleUserProfile, userProfileState}}>
            {children}
        </UserProfileContext.Provider>
    )
}