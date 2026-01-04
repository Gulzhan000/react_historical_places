import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';
import { FaHeart, FaTrash, FaEye, FaSadTear } from 'react-icons/fa';
export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);
    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(item => item.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    const clearAllFavorites = () => {
        if (window.confirm('Remove all favorites?')) {
            setFavorites([]);
            localStorage.removeItem('favorites');
        }
    };
    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <h1>My Favorites</h1>
                <p className="favorites-subtitle">Your curated collection of historical wonders</p>
                {favorites.length > 0 && (
                    <button onClick={clearAllFavorites} className="clear-all-btn">
                        <FaTrash /> Clear All
                    </button>
                )}
            </div>
            {favorites.length === 0 ? (
                <div className="empty-favorites">
                    <FaSadTear className="empty-icon" />
                    <h2>No Favorites Yet</h2>
                    <p>Start exploring and add historical places to your favorites!</p>
                    <Link to="/" className="explore-btn">Explore Places</Link>
                </div>
            ) : (
                <>
                    <div className="favorites-stats">
                        <div className="stat-card">
                            <h3>{favorites.length}</h3>
                            <p>Total Favorites</p>
                        </div>
                        <div className="stat-card">
                            <h3>{new Set(favorites.map(f => f.country)).size}</h3>
                            <p>Countries</p>
                        </div>
                        <div className="stat-card">
                            <h3>{favorites.reduce((sum, f) => sum + parseFloat(f.price.replace('$', '') || 0), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
                            <p>Total Value</p>
                        </div>
                    </div>
                    <div className="favorites-grid">
                        {favorites.map(item => (
                            <div key={item.id} className="favorite-card">
                                {item.image && (
                                    <div className="favorite-image">
                                        <img src={item.image} alt={item.title} />
                                        <div className="favorite-badge">
                                            <FaHeart />
                                        </div>
                                    </div>
                                )}
                                <div className="favorite-content">
                                    <h3>{item.title}</h3>
                                    <div className="favorite-details">
                                        <span className="detail-item">
                                            <strong>Country:</strong> {item.country}
                                        </span>
                                        <span className="detail-item">
                                            <strong>Price:</strong> {item.price}
                                        </span>
                                        <span className="detail-item">
                                            <strong>Duration:</strong> {item.duration}
                                        </span>
                                    </div>
                                    <p className="favorite-description">{item.description}</p>
                                    <div className="favorite-actions">
                                        <Link to={`/post/${item.id}`} className="view-btn">
                                            <FaEye /> View Details
                                        </Link>
                                        <button onClick={() => removeFromFavorites(item.id)} className="remove-btn">
                                            <FaTrash /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}