import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEnvelope, FaSignInAlt, FaGoogle, FaFacebook } from 'react-icons/fa';
import "./Auth.css";

export default function SignIn({ setIsAuth }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setTimeout(() => {
            const savedUser = JSON.parse(localStorage.getItem("user"));
            if (
                savedUser &&
                savedUser.email === form.email &&
                savedUser.password === form.password
            ) {
                localStorage.setItem("isAuth", "true");
                setIsAuth(true);
                navigate("/profile");
            } else {
                setError("Incorrect email or password. Please try again.");
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="auth-hero-container">
            <div className="auth-gradient-bg"></div>
            <div className="auth-container fade-in-up">
                <div className="auth-left-panel">
                    <div className="auth-left-content">
                        <h2>Welcome Back</h2>
                        <p>Continue your journey through history with exclusive luxury tours and personalized experiences tailored just for you.</p>
                        
                        <div className="auth-features">
                            <div className="feature-item">
                                <div>
                                    <h4>Premium Access</h4>
                                    <p>Exclusive historical sites and luxury accommodations</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div>
                                    <h4>Expert Guides</h4>
                                    <p>Learn from professional historians and archaeologists</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div>
                                    <h4>Secure & Private</h4>
                                    <p>Your information and travel plans are completely secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-right-panel">
                    <div className="auth-form-wrapper">
                        <div className="auth-header">
                            <h1>Sign In</h1>
                            <p>Enter your credentials to access your account</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSignIn}>
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}

                            <div className="input-group luxury-input">
                                <div className="input-icon">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group luxury-input">
                                <div className="input-icon">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-options">
                                <label className="checkbox">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <Link to="#" className="forgot-link">Forgot Password?</Link>
                            </div>

                            <button 
                                type="submit" 
                                className="luxury-btn primary-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span> Signing In...
                                    </>
                                ) : (
                                    <>
                                        <FaSignInAlt /> Sign In
                                    </>
                                )}
                            </button>

                            <div className="divider">
                                <span>Or continue with</span>
                            </div>

                            <div className="social-login">
                                <button type="button" className="social-btn google">
                                    <FaGoogle /> Google
                                </button>
                                <button type="button" className="social-btn facebook">
                                    <FaFacebook /> Facebook
                                </button>
                            </div>

                            <div className="auth-footer">
                                <p>
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="auth-link">
                                        Create Account
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}