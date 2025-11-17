
import React from "react";
import Navbar from "../../components/Navbar";
import  "../../styles/Table.css";
import "../../styles/Auth.css";


const Reports = () => {
    const dailyReport = [
        { date: "2025-01-10", orders: 45, revenue: 12500 },
        { date: "2025-01-11", orders: 38, revenue: 9800 },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Daily Reports</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Date</th><th>Total Orders</th><th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyReport.map(r => (
                            <tr key={r.date}>
                                <td>{r.date}</td><td>{r.orders}</td><td>{r.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;