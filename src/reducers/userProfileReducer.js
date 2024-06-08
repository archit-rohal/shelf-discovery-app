export const initialUserProfile = {
    isProfileActive: true,
    isAddressActive: false,
}

export const userProfileReducer = (userProfileState, action) => {
    switch (action.type) {
        case "PROFILE_ACTIVE":
            return {...userProfileState, isProfileActive: true, isAddressActive: false}
        case "ADDRESS_ACTIVE":
            return {...userProfileState, isProfileActive: false, isAddressActive: true}
        default:
            return userProfileState;
    }
}