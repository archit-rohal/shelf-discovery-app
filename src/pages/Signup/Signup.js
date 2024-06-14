import React, {useContext} from 'react';
import './Signup.css';
import heroImage from "../../assets/login-image.webp"
import {NavLink, useNavigate} from "react-router-dom";
import {SignupContext} from "../../contexts/SignupProvider";
import {LoginContext} from "../../contexts/LoginProvider";
import {AuthContext} from "../../contexts/AuthProvider";


const Signup = () => {
    const navigate = useNavigate()
    const {
        email,
        password,
        firstName,
        lastName,
        passwordType,
        eyeType,
        eyesHandler,
        setSignupEmail,
        setSignupPassword,
        confirmPassword,
        setConfirmPassword,
        setFirstName,
        setLastName
    } = useContext(SignupContext);
    const {setTestCreds} = useContext(LoginContext)
    const {signupHandler, isMatch} = useContext(AuthContext)
    return (
        <div className="signupcard">
            <img src={heroImage} alt="library" className="screenleft"/>
            <div className="screenright">
                <form className="signupform"
                      onSubmit={(e) => signupHandler(e, email, password, confirmPassword, firstName, lastName)}>
                    <h1 className="signupheader">Signup</h1>

                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Email Address" value={email} required
                           onChange={(e) => setSignupEmail(e.target.value)}/>

                    <div className="passwordbody">
                        <label htmlFor="password">Password</label>
                        <input type={passwordType} name="password" id="password" placeholder="Password" value={password}
                               minLength="8" maxLength="40" required onChange={e => setSignupPassword(e.target.value)}/>
                        <i onClick={() => eyesHandler()}>{eyeType}</i>
                    </div>

                    <div className={isMatch ? "confirmpasswordbody" : "confirmpasswordbody nomatch"}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type={passwordType} name="confirmPassword" id="confirmPassword"
                               placeholder="Confirm Password" value={confirmPassword} minLength="4" maxLength="40"
                               content="foo" required onChange={e => setConfirmPassword(e.target.value)}/>
                        <i onClick={() => eyesHandler()}>{eyeType}</i>
                    </div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" placeholder="First Name" value={firstName}
                           required onChange={e => setFirstName(e.target.value)}/>

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" placeholder="Last Name" value={lastName} required
                           onChange={e => setLastName(e.target.value)}/>


                    <button type="submit"
                            onClick={e => signupHandler(e, email, password, confirmPassword, firstName, lastName)}>Sign
                        up
                    </button>
                    <button type="submit" onClick={() => {
                        navigate("/login");
                        setTestCreds()
                    }}>Login with test credentials
                    </button>
                    <NavLink to="/login" className="loginlink">Go back to Login</NavLink>
                </form>
            </div>
        </div>
    );
}

export default Signup;
