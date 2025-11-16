import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src={Logo} alt="Logo" />
                <span>Restaurant</span> 
            </Link>
            <div className="nav-links">
                <Link to="/admin/dashboard" className="link"> My Deshboard </Link>
                <Link to="/" className="link"> Home </Link>
                <a href="#our-team" className="link"> Our Team </a>
                <a href="#abouts" className="link"> Abouts </a>
            </div>
            <div className="nav-links">
                <Link to="/" className="logo">
                <img src={Logo} alt="Logo" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
