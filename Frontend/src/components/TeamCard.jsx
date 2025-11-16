import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const TeamCard = ({ img, name, role, desc }) => {
    return (
        <div className="team-card">
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <p className="role">{role}</p>
            <p className="desc">{desc}</p>

            <div className="social-icons">
                <FaFacebook />
                <FaTwitter />
                <FaInstagram />
            </div>
        </div>
    );
};

export default TeamCard;
