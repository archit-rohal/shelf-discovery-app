import {createContext, useReducer} from "react";
import {initialState, signupReducer} from "../reducers/signupReducer";
import {
    CLOSE_EYES,
    OPEN_EYES,
    STORE_EMAIL,
    STORE_PASSWORD,
    STORE_CONFIRM_PASSWORD,
    STORE_FIRSTNAME,
    STORE_LASTNAME
} from "../reducers/signupReducer";

export const SignupContext = createContext();
export const SignupProvider = ({children}) => {
    const [signup, dispatchSignup] = useReducer(signupReducer, initialState)
    const {passwordType, eyeType, email, password, confirmPassword, firstName, lastName} = signup;
    const eyesHandler = () => {
        if (passwordType === "password") {
            dispatchSignup({type: OPEN_EYES})
        } else {
            dispatchSignup({type: CLOSE_EYES})
        }
    }
    const setSignupEmail = payloadValue => {
        dispatchSignup({type: STORE_EMAIL, payload: payloadValue})
    }
    const setSignupPassword = payloadValue => {
        dispatchSignup({type: STORE_PASSWORD, payload: payloadValue})
    }
    const setConfirmPassword = payloadValue => {
        dispatchSignup({type: STORE_CONFIRM_PASSWORD, payload: payloadValue})
    }
    const setFirstName = payloadValue => {
        dispatchSignup({type: STORE_FIRSTNAME, payload: payloadValue})
    }
    const setLastName = payloadValue => {
        dispatchSignup({type: STORE_LASTNAME, payload: payloadValue})
    }
    return (
        <SignupContext.Provider value={{
            passwordType,
            eyeType,
            eyesHandler,
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            setSignupEmail,
            setSignupPassword,
            setConfirmPassword,
            setFirstName,
            setLastName
        }}>
            {children}
        </SignupContext.Provider>
    )
}