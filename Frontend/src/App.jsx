import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import WaiterDashboard from "./pages/Waiter/WaiterDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import KitchenDashboard from "./pages/Kitchen/KitchenDeshboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="web">
      <AuthProvider>
        <Router>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    {/* <Route path="users" element={<AdminUsers />} /> */}
                  </Routes>
                </ProtectedRoute>
              }
            />

            <Route
              path="/waiter/*"
              element={
                <ProtectedRoute allowedRoles={["waiter"]}>
                  <Routes>
                    <Route path="dashboard" element={<WaiterDashboard />} />
                    {/* <Route path="orders" element={<WaiterOrders />} /> */}
                  </Routes>
                </ProtectedRoute>
              }
            />

            <Route
              path="/kitchen/*"
              element={
                <ProtectedRoute allowedRoles={["kitchen"]}>
                  <Routes>
                    <Route path="dashboard" element={<KitchenDashboard />} />
                    {/* <Route path="reports" element={<KitchenReports />} /> */}
                  </Routes>
                </ProtectedRoute>
              }
            />

          </Routes>

          <Footer />

        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
