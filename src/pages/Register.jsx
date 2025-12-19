import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        const user = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password
        };

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h1>Регистрация</h1>

                <input name="firstName" placeholder="Имя" onChange={handleChange} required />
                <input name="lastName" placeholder="Фамилия" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" placeholder="Телефон" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Повторите пароль" onChange={handleChange} required />

                <button type="submit">Зарегистрироваться</button>

                <p className="auth-link" onClick={() => navigate("/login")}>
                    Уже есть аккаунт? Войти
                </p>
            </form>
        </div>
    );
}
