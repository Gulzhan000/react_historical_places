import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { tourService } from '../api/tourService';
import './PostList.css';
import { FaHeart, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

export default function PostsList() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchTours();
        loadFavorites();
    }, []);

    const fetchTours = async () => {
        try {
            setLoading(true);
            const data = await tourService.getAllTours();
            setPlaces(data);
            setError(null);
        } catch (err) {
            setError('Failed to load tours');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const loadFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites.map(f => f.id));
    };
    const toggleFavorite = (place) => {
        const isFavorite = favorites.includes(place.id);
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter(id => id !== place.id);
            const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            localStorage.setItem('favorites', JSON.stringify(savedFavorites.filter(f => f.id !== place.id)));
        } else {
            updatedFavorites = [...favorites, place.id];
            const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            savedFavorites.push(place);
            localStorage.setItem('favorites', JSON.stringify(savedFavorites));
        }

        setFavorites(updatedFavorites);
    };

    const handleCreate = () => {
        navigate('/create-tour');
    };

    const handleEdit = (id) => {
        navigate(`/edit-tour/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tour?")) {
            try {
                await tourService.deleteTour(id);
                setPlaces(prev => prev.filter(p => p.id !== id));
                const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                localStorage.setItem('favorites', JSON.stringify(savedFavorites.filter(f => f.id !== id)));
                loadFavorites();
            } catch (err) {
                alert('Failed to delete tour');
                console.error(err);
            }
        }
    };
    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading luxury tours...</p>
        </div>
    );
    if (error) return <div className="error-message">{error}</div>;
    return (
        <div className="posts-list-container">
            <div className="hero-section">
                <h1 className="main-title">Journey Through Time</h1>
                <p className="subtitle">Exclusive Tours to World's Most Majestic Historical Sites</p>
                <button className="hero-create-btn" onClick={handleCreate}>
                    <FaPlus /> Create New Tour
                </button>
            </div>

            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-number">{places.length}</span>
                    <span className="stat-label">Tours Available</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{new Set(places.map(p => p.country)).size}</span>
                    <span className="stat-label">Countries</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{favorites.length}</span>
                    <span className="stat-label">In Favorites</span>
                </div>
            </div>

            <div className="places-grid">
                {places.map(place => (
                    <div key={place.id} className="place-card">
                        <div className="card-image">
                            <img src={place.image} alt={place.title} />
                            <button 
                                className={`favorite-btn ${favorites.includes(place.id) ? 'active' : ''}`}
                                onClick={() => toggleFavorite(place)}
                            >
                                <FaHeart />
                            </button>
                            <div className="card-price">{place.price}</div>
                        </div>
                        
                        <div className="card-content">
                            <h3 className="card-title">{place.title}</h3>
                            <div className="card-location">
                                <span className="country-flag">📍</span>
                                <span>{place.country}</span>
                            </div>
                            
                            <div className="card-details">
                                <div className="detail">
                                    <span className="detail-label">Built</span>
                                    <span className="detail-value">{place.year}</span>
                                </div>
                                <div className="detail">
                                    <span className="detail-label">Duration</span>
                                    <span className="detail-value">{place.duration}</span>
                                </div>
                            </div>
                            
                            <p className="card-description">{place.description}</p>
                            
                            <div className="card-actions">
                                <Link to={`/post/${place.id}`} className="action-btn view-btn">
                                    <FaEye /> View Details
                                </Link>
                                <button onClick={() => handleEdit(place.id)} className="action-btn edit-btn">
                                    <FaEdit /> Edit
                                </button>
                                <button onClick={() => handleDelete(place.id)} className="action-btn delete-btn">
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}