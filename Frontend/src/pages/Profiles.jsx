import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

import "../styles/profiles.css";

const API = "http://localhost:8080";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .get(`${API}/users/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setProfile(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Fetch error:", err.response?.data || err);
                setLoading(false);
            });
    }, [user]);

    const handleUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("profile_image", file);
        formData.append("user_id", user.id);

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `${API}/users/upload/${user.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Profile picture updated!");
            setProfile({
                ...profile,
                profile_image: res.data.data, // full Cloudinary URL
            });
        } catch (err) {
            console.log("Upload error:", err.response?.data || err);
        }
    };

    if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
    if (!profile) return <p style={{ textAlign: "center" }}>User not found.</p>;

    return (
        <div>
            <Navbar />

            <div className="profile-container">
                {/* Avatar with edit icon */}
                <div className="avatar-wrapper">
                    <img
                        src={
                            profile.profile_image
                                ? profile.profile_image
                                : `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`
                        }
                        alt="avatar"
                        className="profile-avatar"
                    />

                    <div
                        className="edit-icon"
                        onClick={() => fileInputRef.current.click()}
                        title="Change Profile Picture"
                    >
                        ✏
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden-file-input"
                        accept="image/*"
                        onChange={(e) => handleUpload(e.target.files[0])}
                    />
                </div>

                <h2>{profile.name}</h2>
                <p
                    style={{ fontSize: "17px", marginTop: "-5px", color: "#444" }}
                >
                    {profile.email}
                </p>

                <div className="profile-box">
                    <strong>Role:</strong> {profile.role}
                </div>
                <div className="profile-box">
                    <strong>User ID:</strong> {profile.id}
                </div>
                <div className="profile-box">
                    <strong>Phone:</strong> {profile.phone_no || "-"}
                </div>
                <div className="profile-box">
                    <strong>Shift:</strong> {profile.shift_time || "-"}
                </div>
                <div className="profile-box">
                    <strong>Joined:</strong>{" "}
                    {new Date(profile.join_at).toLocaleString()}
                </div>

                {/* Edit profile button */}
                <button
                    onClick={() => (window.location.href = "/profile/edit")}
                    className="edit-bton"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
