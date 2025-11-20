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
import ProtectedRoute from "./components/ProtectedRoute.jsx"
// Admin Pages
import Staffs from "./pages/Admin/User.jsx";
import Products from "./pages/Admin/Products.jsx";
import Inventory from "./pages/Admin/Inventory.jsx";
import Orders from "./pages/Admin/Orders.jsx";
import OrderDetails from "./pages/Admin/OrderDetails.jsx";
import Payments from "./pages/Admin/Payments.jsx";
import Suppliers from "./pages/Admin/Suppliers.jsx";
import Purchases from "./pages/Admin/Purchases.jsx";
import Reports from "./pages/Admin/Reports.jsx";
import ProfilePage from "./pages/Profiles.jsx";
import Customers from "./pages/Admin/customers.jsx";

function App() {
  return (
    <div className="web">
      <AuthProvider>
        <Router>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Protected Routes */}

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<Staffs />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="products" element={<Products />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="order/:id" element={<OrderDetails />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="suppliers" element={<Suppliers />} />
                    <Route path="purchases" element={<Purchases />} />
                    <Route path="reports" element={<Reports />} />
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
