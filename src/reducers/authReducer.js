export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";
export const SET_CREDENTIALS = "SET_CREDENTIALS";
export const SET_STORAGE_CREDENTIALS = "INITIALIZE_STORAGE_CREDENTIALS";
export const initialState = {
    loading: false,
    token: "",
    email: "",
    isLoggedIn: false,
    firstname: "",
    lastname: ""
}
export const authReducer = (authState, action) => {
    switch (action.type) {
        case LOADING_ON:
            return {...authState, loading: true}
        case LOADING_OFF:
            return {...authState, loading: false}
        case SET_CREDENTIALS:
            const [tokenValue, isLoggedInValue, emailValue, firstnameValue, lastnameValue] = action.payload;
            return {
                ...authState,
                token: tokenValue,
                isLoggedIn: isLoggedInValue,
                email: emailValue,
                firstname: firstnameValue,
                lastname: lastnameValue
            }
        case SET_STORAGE_CREDENTIALS:
            const [tokenInfo, isLoggedInInfo, emailInfo, firstNameInfo, lastNameInfo] = action.payload;
            localStorage.setItem("token", tokenInfo);
            localStorage.setItem("isLoggedIn", isLoggedInInfo);
            localStorage.setItem("firstName", firstNameInfo);
            localStorage.setItem("lastName", lastNameInfo);
            localStorage.setItem("email", emailInfo);
        default:
            return authState;
    }
}