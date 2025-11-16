// src/components/AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Abouts.css";

const HighlightCard = ({ title, desc, icon }) => {
    return (
        <div className="highlight-card">
            {icon && <div className="icon">{icon}</div>}
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
};

const Abouts = () => {
    return (
        <div  id="abouts" className="about-section">
            <h2>About 99 Meal</h2>
            <p className="about-story">
                Founded in 2015, 99 Meal combines passion, quality, and technology to deliver 
                unforgettable dining experiences. Our mission is to serve delicious meals 
                made from fresh ingredients with excellent service.
            </p>

            <div className="about-highlights">
                <HighlightCard 
                    title="Fresh Ingredients" 
                    desc="We source only the best ingredients for every dish." 
                />
                <HighlightCard 
                    title="Expert Chefs" 
                    desc="Our team of chefs craft dishes with love and precision." 
                />
                <HighlightCard 
                    title="Fast Delivery" 
                    desc="Enjoy your favorite meals delivered right to your door." 
                />
            </div>

            <div className="about-cta">
                <Link to="/menu" className="btn">Check Our Menu</Link>
            </div>
        </div>
    );
};

export default Abouts;
