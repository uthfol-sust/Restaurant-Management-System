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
    const [activities, setActivities] = useState([]);
    const [filterType, setFilterType] = useState("");

    const fileInputRef = useRef(null);

    // Dummy activity data
    const dummyActivityData = [
        {
            log_id: 1,
            users_id: user?.id || 1,
            action_type: "LOGIN",
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
            description: "User logged in"
        },
        {
            log_id: 2,
            users_id: user?.id || 1,
            action_type: "PROFILE_UPDATE",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            description: "Updated profile information"
        },
        {
            log_id: 3,
            users_id: user?.id || 1,
            action_type: "PASSWORD_CHANGE",
            timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
            description: "Changed password"
        },
        {
            log_id: 4,
            users_id: user?.id || 1,
            action_type: "ORDER_CREATED",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            description: "Created new order #12345"
        },
        {
            log_id: 5,
            users_id: user?.id || 1,
            action_type: "PAYMENT_PROCESSED",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
            description: "Payment processed successfully"
        },
        {
            log_id: 6,
            users_id: user?.id || 1,
            action_type: "PRODUCT_VIEW",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            description: "Viewed product catalog"
        },
        {
            log_id: 7,
            users_id: user?.id || 1,
            action_type: "REPORT_GENERATED",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
            description: "Generated sales report"
        },
        {
            log_id: 8,
            users_id: user?.id || 1,
            action_type: "INVENTORY_UPDATE",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
            description: "Updated inventory stock"
        }
    ];

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

        // Use dummy activity logs instead of API call
        setActivities(dummyActivityData);

        // Uncomment below to use actual API when backend is ready
        // axios
        //     .get(`${API}/activity/${user.id}`, {
        //         headers: { Authorization: `Bearer ${token}` }
        //     })
        //     .then((res) => {
        //         setActivities(res.data.data || []);
        //     })
        //     .catch((err) => {
        //         console.log("Log fetch error:", err);
        //     });
    }, [user]);

    const handleUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("profile_image", file);
        formData.append("user_id", user.id);

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(`${API}/users/upload/${user.id}`, formData,
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
                profile_image: res.data.data,
            });
        } catch (err) {
            console.log("Upload error:", err.response?.data || err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };


    if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
    if (!profile) return <p style={{ textAlign: "center" }}>User not found.</p>;

    return (
        <div className="App">
            <Navbar />

            <div className="profile-container">
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>

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

                <h3 className="activity-title">Recent Activity</h3>

                {activities.length > 0 && (
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ marginRight: "10px" }}>Filter by Type:</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            style={{ padding: "5px", cursor: "pointer" }}
                        >
                            <option value="">All Types</option>
                            {[...new Set(activities.map(a => a.action_type))].map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="activity-log-box">
                    {activities.length === 0 ? (
                        <p>No activity yet.</p>
                    ) : (
                        activities
                            .filter(log => !filterType || log.action_type === filterType)
                            .map((log) => (
                                <div className="activity-item" key={log.log_id}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                        <div>
                                            <strong style={{ fontSize: "16px", color: "#333" }}>
                                                {log.action_type.replace(/_/g, " ")}
                                            </strong>
                                            <p style={{ marginTop: "5px", marginBottom: "5px", color: "#666" }}>
                                                {log.description || "No description"}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="time">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            ))
                    )}
                </div>

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
