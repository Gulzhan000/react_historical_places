import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Auth.css";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth");
        if (!isAuth) {
            navigate("/login");
        }

        const savedUser = JSON.parse(localStorage.getItem("user"));
        setUser(savedUser);
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("isAuth");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>Мой профиль</h1>

                <p><strong>Имя:</strong> {user.firstName}</p>
                <p><strong>Фамилия:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Телефон:</strong> {user.phone}</p>

                <button onClick={logout}>Выйти</button>
            </div>
        </div>
    );
}
