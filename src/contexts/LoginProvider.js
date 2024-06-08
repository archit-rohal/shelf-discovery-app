import {createContext, useReducer} from "react";
import {
    initialState,
    OPEN_EYES,
    CLOSE_EYES,
    STORE_EMAIL,
    STORE_PASSWORD, loginReducer
} from "../reducers/loginReducer";

export const LoginContext = createContext();
export const LoginProvider = ({children}) => {
    const testCredentials = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika"
    }
    const [login, dispatchLogin] = useReducer(loginReducer, initialState);
    const {passwordType, eyeType, email, password} = login;
    const eyesHandler = () => {
        if (passwordType === "password") {
            dispatchLogin({type: OPEN_EYES})
        } else {
            dispatchLogin({type: CLOSE_EYES})
        }
    }
    const setEmail = payloadValue => {
        dispatchLogin({type: STORE_EMAIL, payload: payloadValue})
    }
    const setPassword = payloadValue => {
        dispatchLogin({type: STORE_PASSWORD, payload: payloadValue})
    }
    const setTestCreds = () => {
        dispatchLogin({type: STORE_EMAIL, payload: testCredentials.email});
        dispatchLogin({type: STORE_PASSWORD, payload: testCredentials.password});
    }
    return (
        <LoginContext.Provider
            value={{
                passwordType,
                eyeType,
                eyesHandler,
                email,
                password,
                setEmail,
                setPassword,
                testCredentials,
                setTestCreds
            }}>
            {children}
        </LoginContext.Provider>
    )
}