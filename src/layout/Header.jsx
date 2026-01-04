import { Link } from "react-router-dom";
import "./Header.css";
import { FaHeart, FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <h1 className="logo-text">Historical<span className="logo-accent">Places</span></h1>
                <p className="logo-subtitle">Luxury Travel Experiences</p>
            </div>
            <nav className="nav">
                <Link to="/" className="nav-link">
                    <span>Home</span>
                </Link>
                <Link to="/about" className="nav-link">
                    <span>About Us</span>
                </Link>
                <Link to="/contacts" className="nav-link">
                    <span>Contacts</span>
                </Link>
                <Link to="/favorites" className="nav-link">
                    <span>Favorites</span>
                </Link>
                <Link to="/profile" className="nav-link">
                    <span>My Profile</span>
                </Link>
                <Link to="/signup" className="nav-link auth-link">
                    <FaUserPlus className="nav-icon" />
                    <span>Sign Up</span>
                </Link>
                <Link to="/signin" className="nav-link auth-link">
                    <FaSignInAlt className="nav-icon" />
                    <span>Sign In</span>
                </Link>
            </nav>
        </header>
    );
}