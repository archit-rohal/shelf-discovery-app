import React, {useContext} from 'react'
import "./Login.css"
import heroImage from "../../assets/login-image.webp"
import {LoginContext} from "../../contexts/LoginProvider";
import {AuthContext} from "../../contexts/AuthProvider";
import {NavLink} from "react-router-dom";


function Login() {
    const {
        email,
        password,
        passwordType,
        eyeType,
        eyesHandler,
        setEmail,
        setPassword,
        setTestCreds
    } = useContext(LoginContext);
    const {loginHandler} = useContext(AuthContext)
    return (
        <div className="logincard">
            <img src={heroImage} alt="library" className="lefthalf"/>
            <div className="righthalf">
                <form className="login-form" onSubmit={e => loginHandler(e, email, password)}>
                    <h1 className="login-hero">Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email Address" value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required/>
                    <label htmlFor="password">Password</label>
                    <div className="passwordcontainer">
                        <input type={passwordType} name="password" id="password" placeholder="Password" value={password}
                               onChange={e => setPassword(e.target.value)}
                               required/>
                        <i onClick={() => eyesHandler()}>{eyeType}</i>
                    </div>
                    <div className="check">
                        <input type="checkbox" name="keepsigned" id="keepsigned"/>
                        <label htmlFor="keepsigned" className="keepsigned">Keep me signed in</label>
                        <span>Forgot your password?</span>
                    </div>
                    <button type="submit" onClick={(e) => loginHandler(e, email, password)}>Login</button>
                    <button type="submit" onClick={() => setTestCreds()}>Login with test credentials</button>
                    <NavLink to="/signup" className="signuplink">Signup</NavLink>
                </form>
            </div>
        </div>
    );
}

export default Login