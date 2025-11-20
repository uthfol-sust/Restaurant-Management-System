import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import "../../styles/Admin.css";

import {
    FaUsers,
    FaUtensils,
    FaShoppingCart,
    FaChartBar,
    FaWarehouse,
    FaMoneyBill,
    FaTruck,
    FaBoxOpen,
    FaUserFriends
} from "react-icons/fa";
import { getStaffs } from "../../api/usersApi.jsx";
import { getInventories } from "../../api/inventoryApi";
import { getProducts } from "../../api/ProductApi.jsx";
import { getSuppliers } from "../../api/suppliersApi.jsx";
import { getCustomers } from "../../api/customersApi.jsx";

const AdminDashboard = () => {
    const [staffsCount,setStafsCount] = useState(0)
    const [custonerCount, setCustomerCount] = useState(0)
    const [inventoryCount, setInventoryCount] = useState(0);
    const [productCount ,setProductCount ] = useState(0)
    const [supplierCount, setSuppliersCount] = useState(0)
    

    const token = localStorage.getItem("token"); 

    useEffect(() => {
    const fetchCount = async () => {
        try {
            const resStaffs = await getStaffs(token);
            const staffs = resStaffs?.data.data || [];
            setStafsCount(Array.isArray(staffs) ? staffs.length : 0);

            const resCustomer = await getCustomers(token)
            const customer = resCustomer?.data ||[];
            setCustomerCount(Array.isArray(customer)?customer.length : 0);

            const inventoryRes = await getInventories();
            const inventoryData = inventoryRes?.data || [];
            setInventoryCount(Array.isArray(inventoryData) ? inventoryData.length : 0);

            const productResponse = await getProducts(token);
            const productData = productResponse?.data?.data || [];
            setProductCount(Array.isArray(productData) ? productData.length : 0);

            const suppliersRes = await getSuppliers(token);
            const suppliersData = suppliersRes?.data?.data || [];
            setSuppliersCount(Array.isArray(suppliersData) ? suppliersData.length : 0);

        } catch (err) {
            console.error("Error fetching inventory count:", err);
            setStafsCount(0);
            setInventoryCount(0);
            setProductCount(0);
            setSuppliersCount(0);
        }
    };

    fetchCount();
}, []);


    const cards = [
        { title: "Customers", count: custonerCount, icon: <FaUsers />, link: "/admin/customers" },
        { title: "Staffs", count: staffsCount, icon: <FaUserFriends />, link: "/admin/users" },
        { title: "Total Orders", count: 450, icon: <FaShoppingCart />, link: "/admin/orders" },
        { title: "Our Products", count: productCount, icon: <FaUtensils />, link: "/admin/products" },
        { title: "Inventory Stock", count: inventoryCount, icon: <FaWarehouse />, link: "/admin/inventory" },
        { title: "Payments Processed", count: 320, icon: <FaMoneyBill />, link: "/admin/payments" },
        { title: "Suppliers", count: supplierCount, icon: <FaTruck />, link: "/admin/suppliers" },
        { title: "Purchases", count: 50, icon: <FaBoxOpen />, link: "/admin/purchases" },
        { title: "Daily Report", count: "View", icon: <FaChartBar />, link: "/admin/reports" },
    ];

    return (
        <div className="App" >
            <Navbar />

            <div className="admin-container">
                <h2 className="admin-title">Admin Dashboard</h2>

                <div className="cards-container">
                    {cards.map((card, index) => (
                        <Link to={card.link} key={index} className="dashboard-card">
                            <div className="card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p className="countnum">{card.count}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
