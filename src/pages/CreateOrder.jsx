import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './UpdateOrder.css';

export default function CreateOrder() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        fullInfo: "",
        country: "",
        year: "",
        duration: "",
        price: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const stored = JSON.parse(localStorage.getItem("allTours")) || [];
        const newId = stored.length > 0 ? Math.max(...stored.map(p => p.id)) + 1 : 6;
        const newTour = { id: newId, ...form };
        localStorage.setItem("allTours", JSON.stringify([...stored, newTour]));
        navigate("/");
    }

    return (
        <div className="update-order-container">
            <h2>Create New Tour</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required/>
                <input type="text" name="description" placeholder="Short Description" value={form.description} onChange={handleChange} required/>
                <input type="text" name="fullInfo" placeholder="Full Info" value={form.fullInfo} onChange={handleChange} required/>
                <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required/>
                <input type="text" name="year" placeholder="Year" value={form.year} onChange={handleChange} required/>
                <input type="text" name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} required/>
                <input type="text" name="price" placeholder="Price" value={form.price} onChange={handleChange} required/>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
