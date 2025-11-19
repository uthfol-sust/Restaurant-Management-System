import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/KitchenDashboard.css";

export default function KitchenDashboard() {
    const [ordersState, setOrdersState] = useState({
        newOrders: [],
        preparing: [],
        ready: [],
        readyToPick: [],
        confirmed: [],
        completed: [],
        cancelledToday: [],
        cancelledYesterday: []
    });

    const [popupOrder, setPopupOrder] = useState(null);
    const [viewOrder, setViewOrder] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const [inventoryItems, setInventoryItems] = useState([{ item: "", qty: "" }]);
    const [submittedInventory, setSubmittedInventory] = useState([]);
    const [toast, setToast] = useState(null);
    const [showAll, setShowAll] = useState({}); 

    useEffect(() => {
        const starter = [
            {
                id: 1001,
                table: 3,
                waiter: "Alice",
                items: [{ name: "Chicken Curry", qty: 2 }, { name: "Roti", qty: 3 }],
                time: new Date().toLocaleTimeString(),
                shortMsg: "No onions",
                status: "new"
            },
            {
                id: 1002,
                table: 5,
                waiter: "Bob",
                items: [{ name: "Fried Rice", qty: 1 }],
                time: new Date().toLocaleTimeString(),
                shortMsg: "Extra spice",
                status: "preparing"
            },
            {
                id: 1003,
                table: 2,
                waiter: "Rahim",
                items: [{ name: "Burger", qty: 1 }],
                time: new Date().toLocaleTimeString(),
                shortMsg: "Less oil",
                status: "confirmed"
            },
            {
                id: 1004,
                table: 7,
                waiter: "Karim",
                items: [{ name: "Momo", qty: 4 }],
                time: new Date().toLocaleTimeString(),
                shortMsg: "Extra chilli",
                status: "completed"
            }
        ];
        setOrdersState(prev => ({
            ...prev,
            newOrders: starter.filter(o => o.status === "new"),
            preparing: starter.filter(o => o.status === "preparing"),
            confirmed: starter.filter(o => o.status === "confirmed"),
            completed: starter.filter(o => o.status === "completed")
        }));

        const interval = setInterval(() => {
            const newOrder = {
                id: Date.now(),
                table: Math.ceil(Math.random() * 10),
                waiter: ["Alice", "Bob", "Rahim", "Karim"][Math.floor(Math.random() * 4)],
                items: [{ name: ["Burger", "Tea", "Momo", "Sandwich"][Math.floor(Math.random() * 4)], qty: 1 + Math.floor(Math.random() * 2) }],
                time: new Date().toLocaleTimeString(),
                shortMsg: ["No salt", "Less spicy", "Extra sauce", "No onions"][Math.floor(Math.random() * 4)],
                status: "new"
            };
            setOrdersState(prev => ({ ...prev, newOrders: [newOrder, ...prev.newOrders] }));
            setPopupOrder(newOrder);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const closeToast = () => setToast(null);

    const viewPopup = () => {
        if (popupOrder) {
            setViewOrder(popupOrder);
            setPopupOrder(null);
        }
    };

    const moveOrderTo = (order, fromKey, toKey, extra = {}) => {
        setOrdersState(prev => {
            const source = (prev[fromKey] || []).filter(o => o.id !== order.id);
            const target = [{ ...order, ...extra }, ...(prev[toKey] || [])];
            return { ...prev, [fromKey]: source, [toKey]: target };
        });
    };

    const nextStep = (order) => {
        const { newOrders, preparing, ready, readyToPick, confirmed } = ordersState;
        if (newOrders.find(o => o.id === order.id)) {
            moveOrderTo(order, "newOrders", "preparing");
            setToast(`Order ${order.id} moved to Preparing`);
        } else if (preparing.find(o => o.id === order.id)) {    
            moveOrderTo(order, "preparing", "ready");
            setToast(`Order ${order.id} moved to Ready (Ready in 5 min)`);
        } else if (ready.find(o => o.id === order.id)) {
            moveOrderTo(order, "ready", "readyToPick");
            setToast(`Order ${order.id} moved to Ready to Pick`);
        } else if (readyToPick.find(o => o.id === order.id)) {
            moveOrderTo(order, "readyToPick", "confirmed");
            setToast(`Order ${order.id} moved to Confirmed / Served`);
        } else if (confirmed.find(o => o.id === order.id)) {
            moveOrderTo(order, "confirmed", "completed");
            setToast(`Order ${order.id} marked Completed`);
        }
        setTimeout(closeToast, 2500);
    };

    const receiveOrder = (order) => {
        if (!ordersState.newOrders.find(o => o.id === order.id)) {
            setToast("Only New Orders can be received");
            setTimeout(closeToast, 1400);
            return;
        }
        moveOrderTo(order, "newOrders", "preparing");
        setViewOrder(null);
        setToast(`Order ${order.id} received`);
        setTimeout(closeToast, 2500);
    };

    const cancelOrder = (order) => {
        if (!cancelReason.trim()) {
            setToast("Please provide a short reason");
            setTimeout(closeToast, 1800);
            return;
        }
        if (!ordersState.newOrders.find(o => o.id === order.id)) {
            setToast("Only New Orders can be cancelled");
            setTimeout(closeToast, 1400);
            return;
        }
        setOrdersState(prev => ({
            ...prev,
            newOrders: prev.newOrders.filter(o => o.id !== order.id),
            cancelledToday: [{ ...order, reason: cancelReason }, ...prev.cancelledToday]
        }));
        setCancelReason("");
        setViewOrder(null);
        setToast(`Order ${order.id} cancelled (${cancelReason})`);
        setTimeout(closeToast, 2500);
    };

    const addInventoryRow = () => setInventoryItems(prev => [...prev, { item: "", qty: "" }]);
    const updateInventoryField = (idx, field, val) => {
        const copy = [...inventoryItems];
        copy[idx][field] = val;
        setInventoryItems(copy);
    };
    const removeInventoryRow = (idx) => {
        const copy = [...inventoryItems]; copy.splice(idx, 1); setInventoryItems(copy);
    };
    const submitInventoryToAdmin = () => {
        const filtered = inventoryItems.filter(i => i.item.trim());
        if (filtered.length === 0) {
            setToast("Add at least one inventory item");
            setTimeout(closeToast, 1600);
            return;
        }
        setSubmittedInventory(prev => [...filtered, ...prev]);
        setInventoryItems([{ item: "", qty: "" }]);
        setToast("Inventory request sent to Admin");
        setTimeout(closeToast, 2000);
    };

    const topSegments = [
        { key: "newOrders", title: "New Orders", arr: ordersState.newOrders, limit: 3 },
        { key: "preparing", title: "Preparing", arr: ordersState.preparing, limit: 3 },
        { key: "ready", title: "Ready (Ready in 5 min)", arr: ordersState.ready, limit: 3 },
        { key: "readyToPick", title: "Ready to Pick", arr: ordersState.readyToPick, limit: 3 },
        { key: "confirmed", title: "Confirmed / Served", arr: ordersState.confirmed, limit: 3 }
    ];

    const completedSegment = {
        key: "completed",
        title: "Completed Orders",
        arr: ordersState.completed,
        limit: 3
    };

    const toggleShowAll = (key) => setShowAll(prev => ({ ...prev, [key]: !prev[key] }));
    const renderSegment = (seg) => {
        const arr = seg.arr || [];
        const limit = seg.limit || 4;
        const showAllFlag = !!showAll[seg.key];
        const visible = showAllFlag ? arr : arr.slice(0, limit);

        return (
            <div key={seg.key} className="segment-column">
                <h4>{seg.title} <span className="count">{arr.length}</span></h4>

                <div className="cards-row">
                    {visible.length === 0 && <div className="empty-card">No orders</div>}
                    {visible.map(o => (
                        <div key={o.id} className="order-square-card">
                            <div className="card-top">
                                <div className="order-id">#{o.id}</div>
                                <div className="table-num">T{o.table}</div>
                            </div>

                            <div className="card-body">
                                <div className="waiter-name">{o.waiter}</div>
                                <div className="short-msg">{o.shortMsg}</div>
                                <div className="items-compact">
                                    {o.items.map((it, i) => (
                                        <div key={i} className="it">{it.name} x{it.qty}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="card-actions">
                                <button onClick={() => { setViewOrder(o); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                                    View
                                </button>

                                {seg.key === "newOrders" ? (
                                    <>
                                        <button onClick={() => receiveOrder(o)} className="btn-recv">Receive</button>
                                        <button onClick={() => setViewOrder(o)} className="btn-cancel">Cancel</button>
                                    </>
                                ) : seg.key !== "completed" ? (
                                    <button onClick={() => nextStep(o)}>Next</button>
                                ) : null}

                            </div>
                        </div>
                    ))}
                </div>

                {arr.length > limit && (
                    <div style={{ textAlign: "center" }}>
                        <button className="view-more-btn" onClick={() => toggleShowAll(seg.key)}>
                            {showAllFlag ? "Show less" : `View more (${arr.length - limit})`}
                        </button>
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className="kitchen-page">
            <Navbar />
            {popupOrder && (
                <div className="center-popup">
                    <div className="center-popup-box">
                        <p>New Order Received — Table {popupOrder.table}</p>
                        <div className="center-popup-actions">
                            <button onClick={() => viewPopup()}>View</button>
                            <button onClick={() => { setPopupOrder(null); setToast("Dismissed"); setTimeout(closeToast, 3400); }}>Dismiss</button>
                        </div>
                    </div>
                </div>
            )}

            {viewOrder && (
                <div className="center-popup">
                    <div className="order-detail-box">
                        <h3>Order #{viewOrder.id}</h3>
                        <p><strong>Table:</strong> {viewOrder.table}</p>
                        <p><strong>Waiter:</strong> {viewOrder.waiter || "N/A"}</p>
                        <p><strong>Time:</strong> {viewOrder.time}</p>
                        <p><strong>Short msg:</strong> {viewOrder.shortMsg || "-"}</p>
                        <div className="items-list">
                            {viewOrder.items.map((it, i) => (
                                <div key={i} className="item-row">
                                    <span>{it.name}</span>
                                    <span>Qty: {it.qty}</span>
                                    <span>{it.price ? `${it.price} TK` : ""}</span>
                                </div>
                            ))}
                        </div>

                        <div className="order-actions">
                            {ordersState.newOrders.find(o => o.id === viewOrder.id) && (
                                <button className="btn-primary" onClick={() => receiveOrder(viewOrder)}>Receive</button>
                            )}
                            <div className="cancel-area">
                                <input placeholder="Short reason (one word)" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} />
                                {ordersState.newOrders.find(o => o.id === viewOrder.id) && (
                                    <button className="btn-danger" onClick={() => cancelOrder(viewOrder)}>Cancel</button>
                                )}
                                <button className="btn-outline" onClick={() => setViewOrder(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container">
                <h2 className="title">Kitchen Dashboard</h2>

                <div className="segments-row">
                    {topSegments.map(seg => renderSegment(seg))}
                </div>
                <div className="middle-row">
                    {renderSegment(completedSegment)}
                </div>


                <div className="lower-row">
                    <div className="segment inventory-segment">
                        <h4>Inventory Request</h4>
                        {inventoryItems.map((row, idx) => (
                            <div key={idx} className="inv-row">
                                <input placeholder="Item name" value={row.item} onChange={(e) => updateInventoryField(idx, "item", e.target.value)} />
                                <input placeholder="Qty" value={row.qty} onChange={(e) => updateInventoryField(idx, "qty", e.target.value)} />
                                <button className="small-remove" onClick={() => removeInventoryRow(idx)}>✕</button>
                            </div>
                        ))}
                        <div className="inv-actions">
                            <button onClick={addInventoryRow}>Add more</button>
                            <button className="btn-primary" onClick={submitInventoryToAdmin}>Submit to Admin</button>
                        </div>

                        <div className="submitted-inv">
                            <h5>Submitted Requests</h5>
                            {submittedInventory.length === 0 && <p className="muted">No requests yet</p>}
                            {submittedInventory.map((it, i) => <div key={i} className="submitted-item">{it.item || it} &nbsp; x {it.qty || "-"}</div>)}
                        </div>
                    </div>

                    <div className="segment cancelled-segment">
                        <h4>Cancelled Orders (Today)</h4>
                        {ordersState.cancelledToday.length === 0 && <p className="muted">None</p>}
                        {ordersState.cancelledToday.map(o => (
                            <div key={o.id} className="cancelled-row">
                                <div>#{o.id} — T{o.table}</div>
                                <div className="reason">Reason: {o.reason}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {toast && <div className="toast">{toast}</div>}
        </div>
    );
}
