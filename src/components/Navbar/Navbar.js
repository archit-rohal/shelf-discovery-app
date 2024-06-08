import React, {useContext} from 'react'
import "./Navbar.css"
import {NavLink, useNavigate} from "react-router-dom";
import {AiFillHeart} from 'react-icons/ai';
import {RiShoppingCartLine} from 'react-icons/ri';
import {AiOutlineSearch} from 'react-icons/ai';
import {FiltersContext} from "../../contexts/FiltersProvider";
import {AuthContext} from "../../contexts/AuthProvider";
import {User} from 'lucide-react';
import {DataContext} from "../../contexts/DataProvider";

const Navbar = () => {
    const navigate = useNavigate();
    const {getSearchQuery, searchQuery} = useContext(FiltersContext);
    const {toggleLoginStatus, isLoggedIn} = useContext(AuthContext);
    const {cart} = useContext(DataContext);
    const cartLength = cart.length;
    return (
        <div className="navbar">
            <NavLink className="toleft" to="/">
                <h1>Shelf <span className="sub-heading">Discovery</span></h1>
            </NavLink>
            <div className="searchbar">
                <input type="text" name="" id="searchbar" placeholder="Search by name or author" value={searchQuery}
                       onKeyDown={(e) => {
                           e.key === "Enter" && navigate("/productlist")
                       }} onChange={e => getSearchQuery(e.target.value)}/>
                <AiOutlineSearch size="20px" className="searchicon"/>
            </div>
            <nav className="toright">
                <NavLink to={"/productlist"} className={"explore-link"}>Explore</NavLink>
                <NavLink to="/profile" className="profile-link"><User/></NavLink>
                {!isLoggedIn ? <NavLink className={"login-btn"} to={"/login"}>Login</NavLink> :
                    <button className={isLoggedIn ? "login-btn logout-btn" : "logout-btn"}
                            onClick={toggleLoginStatus}>{isLoggedIn ? "Logout" : "Login"}</button>}
                <NavLink to="/wishlist" className="wishlist-icon"><AiFillHeart size="35px"/></NavLink>
                <NavLink to="/cart" className="cart-icon"><RiShoppingCartLine size="35px"/><span
                    className={"badge"}>{cartLength}</span></NavLink>
            </nav>
        </div>
    )
}
export default Navbar