import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import './Layout.css';

export default function Layout() {
    const [orders, setOrders] = useState([]); // состояние корзины/заказов

    return (
        <>
            <Header />
            <main className="main">
                <Outlet context={{ orders, setOrders }} />
            </main>
            <Footer />
        </>
    );
}
