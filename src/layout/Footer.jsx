import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section logo-section">
                    <div className="logo-container">
                        <h1 className="logo-text">Historical<span className="logo-accent">Places</span></h1>
                        <p className="logo-subtitle">Luxury Travel Experiences</p>
                    </div>
                    <p className="footer-description">
                        Discover the world's most fascinating historical sites with our exclusive luxury tours. 
                        Experience history like never before.
                    </p>
                </div>
                <div className="footer-section">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="footer-links">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About Us</a>
                        </li>
                        <li>
                            <a href="/contacts">Contacts</a>
                        </li>
                        <li>
                            <a href="/favorites">Favorites</a>
                        </li>
                        <li>
                            <a href="/profile">My Profile</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Contact Us</h3>
                    <ul className="footer-contacts">
                        <li>
                            <span>HJ Avenue 67, New York</span>
                        </li>
                        <li>
                            <span>contact@historicalplaces.com</span>
                        </li>
                        <li>
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <span>Mon-Fri: 9:00-18:00</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Follow Us</h3>
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
            <div className="footer-bottom">
                <p className="copyright">
                    <span className="copyright-icon">©</span> 2025 Historical Places. Developed by <span className="developer">Gulzhan Ashuubaeva</span>
                </p>
                <div className="footer-bottom-links">
                    <a href="#">
                        Privacy Policy
                    </a>
                    <a href="#">
                        Terms of Service
                    </a>
                    <a href="#">
                        Cookie Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}