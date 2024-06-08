import {Eye, EyeOff} from "lucide-react";

export const OPEN_EYES = "OPEN_EYES";
export const CLOSE_EYES = "CLOSE_EYES";
export const STORE_EMAIL = "STORE_EMAIL";
export const STORE_PASSWORD = "STORE_PASSWORD";
export const initialState = {
    passwordType: "password",
    eyeType: <EyeOff size="20px"/>,
    email: "",
    password: ""
}
export const loginReducer = (login, action) => {
    switch (action.type) {
        case OPEN_EYES:
            return {...login, passwordType: "text", eyeType: <Eye size="20px"/>}
        case CLOSE_EYES:
            return {...login, passwordType: "password", eyeType: <EyeOff size="20px"/>}
        case STORE_EMAIL:
            return {...login, email: action.payload}
        case STORE_PASSWORD:
            return {...login, password: action.payload}
        default:
            return login;
    }
}