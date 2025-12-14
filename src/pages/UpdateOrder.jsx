import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './UpdateOrder.css';

export default function UpdateOrder() {
    const { id } = useParams();
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

    useEffect(() => {
        const numericId = Number(id);

        const basePlaces = [
            { id: 1, title: "The Colosseum, Rome", description: "Ancient amphitheater", fullInfo: "Includes Colosseum, Roman Forum", country: "Italy", year: "70-80 AD", duration: "7 days", price: "$1,200" },
            { id: 2, title: "Machu Picchu, Peru", description: "Incan citadel", fullInfo: "Hike Inca Trail and guided tour", country: "Peru", year: "15th century", duration: "5 days", price: "$1,500" },
            { id: 3, title: "The Great Wall of China", description: "Series of fortifications", fullInfo: "Visits to Mutianyu and Badaling", country: "China", year: "7th century BC", duration: "6 days", price: "$1,300" },
            { id: 4, title: "Pyramids of Giza, Egypt", description: "Ancient pyramid complex", fullInfo: "Giza Pyramid, Sphinx", country: "Egypt", year: "2580–2560 BC", duration: "8 days", price: "$2,000" },
            { id: 5, title: "Taj Mahal, India", description: "White marble mausoleum", fullInfo: "Visit Agra Fort, Fatehpur Sikri", country: "India", year: "1632–1653", duration: "4 days", price: "$900" }
        ];

        const newPlaces = JSON.parse(localStorage.getItem("allTours")) || [];
        const allPlaces = [...basePlaces, ...newPlaces];
        const placeToEdit = allPlaces.find(p => p.id === numericId);

        if (placeToEdit) setForm(placeToEdit);

    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPlaces = JSON.parse(localStorage.getItem("allTours")) || [];
        const existingIndex = newPlaces.findIndex(p => p.id === form.id);

        if (form.id > 5) { // обновляем только новые карточки в localStorage
            if (existingIndex >= 0) newPlaces[existingIndex] = form;
            else newPlaces.push(form);
            localStorage.setItem("allTours", JSON.stringify(newPlaces));
        }

        navigate("/");
    }

    return (
        <div className="update-order-container">
            <h2>Update Tour #{id}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required/>
                <input type="text" name="description" placeholder="Short Description" value={form.description} onChange={handleChange} required/>
                <input type="text" name="fullInfo" placeholder="Full Info" value={form.fullInfo} onChange={handleChange} required/>
                <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required/>
                <input type="text" name="year" placeholder="Year" value={form.year} onChange={handleChange} required/>
                <input type="text" name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} required/>
                <input type="text" name="price" placeholder="Price" value={form.price} onChange={handleChange} required/>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
