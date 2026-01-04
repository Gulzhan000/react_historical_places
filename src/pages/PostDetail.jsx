
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { tourService } from '../api/tourService';
import "./PostDetail.css";
import { FaMapMarkerAlt, FaCalendar, FaClock, FaDollarSign, FaArrowLeft, FaHeart, FaShareAlt } from 'react-icons/fa';

export default function PostDetail() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        const fetchTour = async () => {
            try {
                setLoading(true);
                const data = await tourService.getTourById(id);
                if (data) {
                    setPlace(data);
                    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    setIsFavorite(favorites.some(fav => fav.id === data.id));
                } else {
                    setError('Tour not found');
                }
            } catch (err) {
                setError('Failed to load tour details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
    }, [id]);
    const toggleFavorite = () => {
        if (!place) return;
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.id !== place.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            favorites.push(place);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        
        setIsFavorite(!isFavorite);
    };

    if (loading) return (
        <div className="loading-container">
            <div className="luxury-spinner"></div>
            <p className="loading-text">Loading tour details...</p>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <h2 className="error-title">{error}</h2>
            <Link to="/" className="read-link">
                <FaArrowLeft /> Back to Home
            </Link>
        </div>
    );
    
    if (!place) return (
        <div className="error-container">
            <div className="error-icon">🔍</div>
            <h2 className="error-title">Tour Not Found</h2>
            <p className="error-message">The tour you're looking for doesn't exist.</p>
            <Link to="/" className="read-link">
                <FaArrowLeft /> Back to Home
            </Link>
        </div>
    );
    return (
        <div className="post-detail-container">
            <div className="detail-hero">
                <div className="hero-image-container">
                    <img 
                        src={place.image} 
                        alt={place.title} 
                        className="detail-hero-image"
                    />
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <div className="title-container">
                                <h1 className="detail-title">{place.title}</h1>
                                <div className="title-backdrop"></div>
                            </div>
                            <div className="hero-badges">
                                <span className="country-badge">
                                    <FaMapMarkerAlt /> {place.country}
                                </span>
                                <span className="year-badge">
                                    <FaCalendar /> {place.year}
                                </span>
                                <span className="price-badge">
                                    <FaDollarSign /> {place.price}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button 
                        className={`favorite-detail-btn ${isFavorite ? 'active' : ''}`}
                        onClick={toggleFavorite}
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <FaHeart />
                    </button>
                </div>
            </div>

   
            <div className="detail-content">
        
                <div className="info-cards-grid">
                    <div className="info-card">
                        <div className="info-card-icon">
                            <FaCalendar />
                        </div>
                        <div className="info-card-content">
                            <h3>Historical Period</h3>
                            <p>{place.year}</p>
                        </div>
                    </div>
                    
                    <div className="info-card">
                        <div className="info-card-icon">
                            <FaClock />
                        </div>
                        <div className="info-card-content">
                            <h3>Tour Duration</h3>
                            <p>{place.duration}</p>
                        </div>
                    </div>
                    
                    <div className="info-card">
                        <div className="info-card-icon">
                            <FaDollarSign />
                        </div>
                        <div className="info-card-content">
                            <h3>Price</h3>
                            <p className="price-value">{place.price}</p>
                        </div>
                    </div>
                    
                    <div className="info-card">
                        <div className="info-card-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <div className="info-card-content">
                            <h3>Location</h3>
                            <p>{place.country}</p>
                        </div>
                    </div>
                </div>

                <div className="content-sections">
                    <section className="description-section">
                        <h2>Overview</h2>
                        <div className="gold-line"></div>
                        <p className="detail-text">{place.description}</p>
                    </section>

                    {place.fullInfo && (
                        <section className="full-info-section">
                            <h2>Detailed Information</h2>
                            <div className="gold-line"></div>
                            <p className="detail-text full-info">{place.fullInfo}</p>
                        </section>
                    )}

               
                    {place.image && (
                        <div className="additional-image-section">
                            <h3>Gallery</h3>
                            <div className="image-gallery">
                                <img 
                                    src={place.image} 
                                    alt={`${place.title} - Additional view`}
                                    className="gallery-image"
                                />
                            </div>
                        </div>
                    )}
                </div>

            
                <div className="action-buttons">
                    <Link to="/" className="back-btn luxury-btn">
                        <FaArrowLeft /> Back to All Tours
                    </Link>
                    <button 
                        className="book-now-btn luxury-btn primary-btn"
                        onClick={() => alert('Booking functionality coming soon!')}
                    >
                        Book This Tour
                    </button>
                </div>
            </div>
        </div>
    );
}