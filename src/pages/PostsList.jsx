import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './PostList.css';

export default function PostsList() {
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();

    // Базовые карточки (оставляем только минимальные поля, без description и fullInfo)
    const basePlaces = [
        { id: 1, title: "The Colosseum, Rome", country: "Italy", year: "70-80 AD" },
        { id: 2, title: "Machu Picchu, Peru", country: "Peru", year: "15th century" },
        { id: 3, title: "The Great Wall of China", country: "China", year: "7th century BC" },
        { id: 4, title: "Pyramids of Giza, Egypt", country: "Egypt", year: "2580–2560 BC" },
        { id: 5, title: "Taj Mahal, India", country: "India", year: "1632–1653" }
    ];

    useEffect(() => {
        // подгружаем новые карточки из localStorage
        const stored = JSON.parse(localStorage.getItem("allTours")) || [];
        setPlaces([...basePlaces, ...stored]);
    }, []);

    const handleCreate = () => {
        navigate('/create-order');
    };

    const handleEdit = (id) => {
        navigate(`/update-order/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Вы уверены, что хотите удалить этот тур?")) {
            const updated = places.filter(p => p.id !== id);
            setPlaces(updated);

            // сохраняем только новые карточки в localStorage
            const newCards = updated.filter(p => p.id > 5);
            localStorage.setItem("allTours", JSON.stringify(newCards));
        }
    };

    return (
        <div>
            <div className="header-with-button">
                <h1>Tours to Historical Places</h1>
                <button className="btn-create" onClick={handleCreate}>Create</button>
            </div>
            <p>Discover the world's most fascinating historical sites</p>

            {places.map(place => (
                <div key={place.id} className="post">
                    <div className="post-header">
                        <h3>{place.title}</h3>
                        <div className="post-buttons">
                            {/* Edit и Delete для всех карточек */}
                            <button className="btn-edit" onClick={() => handleEdit(place.id)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(place.id)}>Delete</button>
                        </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                        <strong>Country:</strong> {place.country} | <strong>Built:</strong> {place.year}
                        {/* Если есть duration и price (для новых карточек) — показываем */}
                        {place.duration && <> | <strong>Duration:</strong> {place.duration}</>}
                        {place.price && <> | <strong>Price:</strong> {place.price}</>}
                    </div>
                    <Link className="read-link" to={`/post/${place.id}`}>Learn More</Link>
                </div>
            ))}
        </div>
    );
}
