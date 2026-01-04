import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Profile.css";
import { 
    FaUser, FaEnvelope, FaPhone, FaSignOutAlt, 
    FaHistory, FaHeart, FaCrown,
    FaGlobe, FaEdit
} from 'react-icons/fa';
export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth");
        if (!isAuth) {
            navigate("/login");
            return;
        }
        const savedUser = JSON.parse(localStorage.getItem("user"));
        setUser(savedUser);

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        setLoading(false);
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("isAuth");
        navigate("/login");
    };
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
    if (loading) {
        return (
            <div className="luxury-loader">
                <div className="luxury-spinner"></div>
                <p className="loading-text">Loading your profile...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="profile-container page-transition">
            <div className="profile-hero">
                <div className="profile-header">
                    <h1 className="profile-title">My Profile</h1>
                </div>
                
                <div className="profile-avatar-section">
                    <div className="avatar-circle">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                    <div className="avatar-info">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <div className="member-status">
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-content-grid">
                <div className="profile-sidebar luxury-card">
                    <div className="sidebar-nav">
                        <button 
                            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <FaUser className="nav-icon" />
                            <span>Profile</span>
                        </button>
                        
                        <button 
                            className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            <FaHeart className="nav-icon" />
                            <span>Favorites</span>
                            <span className="nav-badge">{favorites.length}</span>
                        </button>
                        
                        <button 
                            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <FaHistory className="nav-icon" />
                            <span>Travel History</span>
                        </button>
                    </div>

                    <button className="logout-btn" onClick={logout}>
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>

                <div className="profile-main-content luxury-card">
                    {activeTab === 'profile' && (
                        <div className="tab-content">
                            <h2>Personal Information</h2>
                            
                            <div className="info-cards-grid">
                                <div className="info-card">
                                    <div className="info-card-header">
                                        <FaUser className="card-icon" />
                                        <h3>Personal Details</h3>
                                    </div>
                                    <div className="info-card-content">
                                        <div className="info-row">
                                            <span className="info-label">First Name:</span>
                                            <span className="info-value">{user.firstName}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Last Name:</span>
                                            <span className="info-value">{user.lastName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-card-header">
                                        <FaEnvelope className="card-icon" />
                                        <h3>Contact Information</h3>
                                    </div>
                                    <div className="info-card-content">
                                        <div className="info-row">
                                            <span className="info-label">Email:</span>
                                            <span className="info-value">{user.email}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Phone:</span>
                                            <span className="info-value">{user.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-card-header">
                                        <FaCrown className="card-icon" />
                                        <h3>Membership Status</h3>
                                    </div>
                                    <div className="info-card-content">
                                        <div className="membership-tier">
                                            <div className="tier-badge premium">Premium</div>
                                            <p>Exclusive access to all luxury tours</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-card-header">
                                        <FaGlobe className="card-icon" />
                                        <h3>Travel Preferences</h3>
                                    </div>
                                    <div className="info-card-content">
                                        <div className="preferences-list">
                                            <span className="preference-tag">Ancient History</span>
                                            <span className="preference-tag">Architecture</span>
                                            <span className="preference-tag">Luxury Travel</span>
                                            <span className="preference-tag">Cultural Immersion</span>
                                        </div>
                                        <button className="edit-preferences-btn">
                                            <FaEdit /> Edit Preferences
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div className="tab-content">
                            <h2>Your Favorites</h2>
                            
                            {favorites.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">❤️</div>
                                    <h3>No Favorites Yet</h3>
                                    <p>Start exploring and add historical places to your favorites!</p>
                                    <button 
                                        className="luxury-btn primary-btn" 
                                        onClick={() => navigate('/')}
                                    >
                                        Explore Historical Sites
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {favorites.length > 0 && (
                                        <div className="favorites-header">
                                            <button className="clear-favorites-btn" onClick={clearAllFavorites}>
                                                Clear All
                                            </button>
                                        </div>
                                    )}

                                    <div className="favorites-grid">
                                        {favorites.map(item => (
                                            <div key={item.id} className="favorite-card">
                                                {item.image && (
                                                    <div className="fav-card-image">
                                                        <img src={item.image} alt={item.title} />
                                                        <div className="fav-badge">
                                                            <FaHeart />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="fav-card-content">
                                                    <h3>{item.title}</h3>
                                                    <div className="fav-card-details">
                                                        <span className="detail">
                                                            {item.country}
                                                        </span>
                                                        <span className="detail">
                                                            {item.year}
                                                        </span>
                                                    </div>
                                                    <p className="fav-card-description">
                                                        {item.description?.substring(0, 100)}...
                                                    </p>
                                                    <div className="fav-card-price">{item.price}</div>
                                                    <div className="fav-card-actions">
                                                        <button 
                                                            className="view-details-btn luxury-btn"
                                                            onClick={() => navigate(`/post/${item.id}`)}
                                                        >
                                                            View Details
                                                        </button>
                                                        <button 
                                                            className="remove-fav-btn"
                                                            onClick={() => removeFromFavorites(item.id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="tab-content">
                            <h2>Travel History</h2>
                            <div className="empty-state">
                                <div className="empty-icon">🛫</div>
                                <h3>No Travel History Yet</h3>
                                <p>Book your first luxury tour and it will appear here!</p>
                                <button 
                                    className="luxury-btn primary-btn" 
                                    onClick={() => navigate('/')}
                                >
                                    Explore Available Tours
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}