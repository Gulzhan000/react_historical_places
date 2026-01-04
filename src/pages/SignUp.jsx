import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserPlus } from 'react-icons/fa';
import "./Auth.css";

export default function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = "Please enter a valid email address";
        if (form.phone.replace(/\D/g, '').length < 10) newErrors.phone = "Please enter a valid phone number";
        if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setTimeout(() => {
            const user = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                password: form.password
            };
            localStorage.setItem("user", JSON.stringify(user));
            setLoading(false);
            alert("Account created successfully! Please sign in.");
            navigate("/signin");
        }, 1500);
    };
    return (
        <div className="auth-hero-container">
            <div className="auth-gradient-bg"></div>
            <div className="auth-container fade-in-up">
                <div className="auth-left-panel">
                    <div className="auth-left-content">
                        <h2>Begin Your Historical Journey</h2>
                        <p>Join our exclusive community of history enthusiasts and gain access to the world's most magnificent historical sites with luxury travel experiences.</p>
                        
                        <div className="auth-benefits">
                            <div className="benefit-card">
                                <div>
                                    <h4>Welcome Bonus</h4>
                                    <p>Get 15% off your first luxury historical tour</p>
                                </div>
                            </div>
                            <div className="benefit-card">
                                <div>
                                    <h4>Exclusive Access</h4>
                                    <p>Private tours and early booking privileges</p>
                                </div>
                            </div>
                            <div className="benefit-card">
                                <div>
                                    <h4>Personal Concierge</h4>
                                    <p>24/7 dedicated travel support and assistance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-right-panel">
                    <div className="auth-form-wrapper">
                        <div className="auth-header">
                            <h1>Create Account</h1>
                            <p>Join our luxury travel community</p>
                        </div>
                        <form className="auth-form" onSubmit={handleSignUp}>
                            <div className="form-row">
                                <div className="input-group luxury-input">
                                    <div className="input-icon">
                                        <FaUser />
                                    </div>
                                    <input
                                        name="firstName"
                                        placeholder="First Name"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className={errors.firstName ? 'error' : ''}
                                    />
                                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                                </div>
                                <div className="input-group luxury-input">
                                    <div className="input-icon">
                                        <FaUser />
                                    </div>
                                    <input
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className={errors.lastName ? 'error' : ''}
                                    />
                                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                                </div>
                            </div>
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
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="input-group luxury-input">
                                <div className="input-icon">
                                    <FaPhone />
                                </div>
                                <input
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
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
                                    className={errors.password ? 'error' : ''}
                                />
                                {errors.password && <span className="error-text">{errors.password}</span>}
                            </div>

                            <div className="input-group luxury-input">
                                <div className="input-icon">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>

                            <div className="form-options">
                                <label className="checkbox">
                                    <input type="checkbox" required />
                                    <span>I agree to the <Link to="#">Terms & Conditions</Link> and <Link to="#">Privacy Policy</Link></span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="luxury-btn primary-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span> Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <FaUserPlus /> Create Account
                                    </>
                                )}
                            </button>
                            <div className="auth-footer">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/signin" className="auth-link">
                                        Sign In
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