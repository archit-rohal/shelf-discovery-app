import {Eye, EyeOff} from "lucide-react";

export const OPEN_EYES = "OPEN_EYES";
export const CLOSE_EYES = "CLOSE_EYES";
export const STORE_EMAIL = "STORE_EMAIL";
export const STORE_PASSWORD = "STORE_PASSWORD";
export const STORE_FIRSTNAME = "STORE_FIRSTNAME";
export const STORE_LASTNAME = "STORE_LASTNAME";
export const STORE_CONFIRM_PASSWORD = "STORE_CONFIRM_PASSWORD"
export const initialState = {
    passwordType: "password",
    eyeType: <EyeOff size="20px"/>,
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
}
export const signupReducer = (signup, action) => {
    switch (action.type) {
        case OPEN_EYES:
            return {...signup, passwordType: "text", eyeType: <Eye size="20px"/>}
        case CLOSE_EYES:
            return {...signup, passwordType: "password", eyeType: <EyeOff size="20px"/>}
        case STORE_EMAIL:
            return {...signup, email: action.payload}
        case STORE_PASSWORD:
            return {...signup, password: action.payload}
        case STORE_CONFIRM_PASSWORD:
            return {...signup, confirmPassword: action.payload}
        case STORE_FIRSTNAME:
            return {...signup, firstName: action.payload}
        case STORE_LASTNAME:
            return {...signup, lastName: action.payload}
        default:
            return signup
    }
}