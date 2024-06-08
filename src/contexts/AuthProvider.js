import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {loginService} from "../services/loginService";
import Spinner from "../assets/spinner/Spinner";
import {useLocation, useNavigate} from "react-router-dom";
import {
    authReducer,
    initialState,
    LOADING_OFF,
    LOADING_ON,
    SET_CREDENTIALS,
    SET_STORAGE_CREDENTIALS
} from "../reducers/authReducer";
import {LoginContext} from "./LoginProvider";
import {signupService} from "../services/signupService";
import {SignupContext} from "./SignupProvider";
import {toast} from "react-toastify";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [authState, dispatchAuth] = useReducer(authReducer, initialState)
    const {loading, token, isLoggedIn, email, firstname, lastname} = authState;
    const location = useLocation()
    const navigate = useNavigate()
    const {setEmail, setPassword} = useContext(LoginContext)
    const [isMatch, setIsMatch] = useState(true)
    const {setSignupEmail, setSignupPassword, setConfirmPassword, setFirstName, setLastName} = useContext(SignupContext)

    const loginHandler = async (e, email, password) => {
        e.preventDefault();
        dispatchAuth({type: LOADING_ON});
        try {
            const response = await loginService(email, password);
            if (response.status === 200) {
                dispatchAuth({type: LOADING_OFF});
                const {foundUser: {firstName, lastName, email}, encodedToken} = response.data;
                const responseValues = [encodedToken, true, email, firstName, lastName];
                dispatchAuth({type: SET_CREDENTIALS, payload: responseValues});
                dispatchAuth({type: SET_STORAGE_CREDENTIALS, payload: responseValues});
                setEmail("");
                setPassword("");
                navigate(location?.state?.from.pathname || "/");
            }
        } catch (e) {
            toast.error("Something went wrong! ", {autoClose: 1000});
            console.error(e)
        } finally {
            dispatchAuth({type: LOADING_OFF});
        }
    }
    const signupHandler = async (e, email, password, confirmPassword, firstName, lastName) => {
        e.preventDefault();
        dispatchAuth({type: LOADING_ON});
        if (confirmPassword === password) {
            setIsMatch(true)
            try {
                const response = await signupService(email, password, firstName, lastName)
                if (response.status === 201) {
                    dispatchAuth({type: LOADING_OFF});
                    const {createdUser: {firstName, lastName, email}, encodedToken} = response.data;
                    const responseValues = [encodedToken, true, email, firstName, lastName];
                    dispatchAuth({type: SET_CREDENTIALS, payload: responseValues});
                    dispatchAuth({type: SET_STORAGE_CREDENTIALS, payload: responseValues});
                    setSignupEmail("");
                    setSignupPassword("");
                    setConfirmPassword("");
                    setFirstName("");
                    setLastName("");
                    navigate(location?.state?.from.pathname || "/");
                }
            } catch (e) {
                toast.error("Something went wrong! ", {autoClose: 1000});
                console.error(e)
            } finally {
                dispatchAuth({type: LOADING_OFF});
            }
        } else {
            dispatchAuth({type: LOADING_OFF});
            setIsMatch(false);
        }
    }
    const getCredsFromStorage = () => {
        const loadToken = localStorage.getItem("token");
        const loadIsLoggedIn = localStorage.getItem("isLoggedIn");
        const loadEmail = localStorage.getItem('email');
        const loadFirstName = localStorage.getItem('firstName');
        const loadLastName = localStorage.getItem('lastName');
        const responseValues = [loadToken, loadIsLoggedIn, loadEmail, loadFirstName, loadLastName];
        dispatchAuth({type: SET_CREDENTIALS, payload: responseValues});
    }
    const toggleLoginStatus = () => {
        if (isLoggedIn) {
            const responseValues = ["", false, "", "", ""];
            dispatchAuth({type: SET_CREDENTIALS, payload: responseValues});
            localStorage.clear();
            navigate('/login')
        } else {
            const responseValues = ["", true, "", "", ""];
            dispatchAuth({type: SET_CREDENTIALS, payload: responseValues});
        }
    }
    useEffect(() => {
        getCredsFromStorage();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                loginHandler,
                token,
                isLoggedIn,
                signupHandler,
                isMatch,
                loading,
                dispatchAuth,
                toggleLoginStatus,
                email,
                firstname,
                lastname
            }}>
            <div style={{position: 'relative'}}> {/* This container holds both children and Spinner */}
                <div style={{backgroundColor: loading ? "white" : ""}}>{children}</div>
                {loading && <Spinner/>}
            </div>
        </AuthContext.Provider>
    )
}