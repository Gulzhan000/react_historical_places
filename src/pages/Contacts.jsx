import './Contacts.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contacts() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        e.target.reset();
    };
    return (
        <div className="contacts-container">
            <div className="contacts-hero">
                <h1 className="contacts-title">Get In Touch</h1>
                <p className="contacts-subtitle">Connect with Luxury Travel Experts</p>
            </div>
            
            <div className="contacts-grid">
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">
                            <FaEnvelope />
                        </div>
                        <h3>Email</h3>
                        <p>contact@historicalplaces.com</p>
                        <p>support@historicalplaces.com</p>
                    </div>
                    
                    <div className="info-card">
                        <div className="info-icon">
                            <FaPhone />
                        </div>
                        <h3>Phone</h3>
                        <p>+1 (555) 123-4567</p>
                        <p>+44 20 7123 4567</p>
                    </div>
                    
                    <div className="info-card">
                        <div className="info-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <h3>Address</h3>
                        <p>123 Luxury Avenue</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                    </div>
                    
                    <div className="social-links">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" />
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="contact-form-container">
                    <h2>Send Us a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                        </div>
                        <input type="email" placeholder="Email Address" required />
                        <input type="text" placeholder="Subject" required />
                        <textarea placeholder="Your Message" rows="6" required></textarea>
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="map-container">
                <h2>Visit Our Office</h2>
                <div className="map-placeholder">
                    <div className="map-overlay">
                        <h3>Luxury Travel Headquarters</h3>
                        <p>We welcome visitors by appointment</p>
                    </div>
                </div>
            </div>
        </div>
    );
}