import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './BasketList.css';

export default function BasketList() {
    const navigate = useNavigate();
    const [tours, setTours] = useState([
        { id: 1, title: "Rome Explorer Tour", country: "Italy", duration: "7 days", price: "$1200" },
        { id: 2, title: "Machu Picchu Adventure", country: "Peru", duration: "5 days", price: "$1500" },
        { id: 3, title: "Great Wall of China Trip", country: "China", duration: "6 days", price: "$1300" },
    ]);

    const handleDelete = (id) => {
        setTours(tours.filter(tour => tour.id !== id));
    }

    return (
        <div>
            <div className="basket-header">
                <h1>Best Historical Places in the World to Visit</h1>
                <button onClick={() => navigate("/create")} className="btn-create">Create</button>
            </div>
            <div className="tours-list">
                {tours.map(tour => (
                    <div key={tour.id} className="tour-card">
                        <h3>{tour.title}</h3>
                        <p>{tour.country} | {tour.duration} | {tour.price}</p>
                        <div className="tour-buttons">
                            <button onClick={() => navigate(`/update/${tour.id}`)} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete(tour.id)} className="btn-delete">Delete</button>
                        </div>
                        <Link className="read-link" to={`/basket/${tour.id}`}>Learn More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
