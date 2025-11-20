import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src={Logo} alt="Logo" />
                <span>Restaurant</span> 
            </Link>
            <div className="nav-links">
                <Link to="/admin/dashboard" className="link"> My Dashboard </Link>
                <Link to="/" className="link"> Home </Link>
                <a href="#our-team" className="link"> Our Team </a>
                <a href="#abouts" className="link"> Abouts </a>
            </div>
            <div className="nav-links">
                {user ? (
                    <Link to="/profile" className="profile-link">
                        <img
                            src={
                                user.profile_image
                                    ? user.profile_image
                                    : `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
                            }
                            alt="Profile"
                            className="profile-avatarNav"
                        />
                    </Link>
                ) : (
                    <Link to="/login" className="link"> Login </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
