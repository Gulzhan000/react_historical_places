import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tourService } from '../api/tourService';
import './CreateTour.css';
import { FaUpload, FaPlus, FaImage } from 'react-icons/fa';

export default function CreateTour() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        fullInfo: "",
        country: "",
        year: "",
        duration: "",
        price: "",
        image: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            await tourService.createTour(form);
            navigate("/");
        } catch (err) {
            alert('Failed to create tour');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    const presetImages = [
        'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ];

    return (
        <div className="create-tour-container">
            <div className="create-header">
                <h1>Create New Luxury Tour</h1>
                <p className="create-subtitle">Craft an unforgettable historical journey</p>
            </div>

            <div className="form-grid">
                <div className="image-section">
                    <div className="image-upload-area">
                        {form.image ? (
                            <img src={form.image} alt="Preview" className="image-preview" />
                        ) : (
                            <div className="upload-placeholder">
                                <FaImage className="upload-icon" />
                                <p>Upload tour image</p>
                            </div>
                        )}
                        <label className="upload-btn">
                            <FaUpload /> Choose Image
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="file-input"
                            />
                        </label>
                    </div>
                    
                    <div className="preset-images">
                        <h3>Or select a preset image:</h3>
                        <div className="preset-grid">
                            {presetImages.map((img, index) => (
                                <img 
                                    key={index}
                                    src={img} 
                                    alt={`Preset ${index + 1}`}
                                    className={`preset-img ${form.image === img ? 'selected' : ''}`}
                                    onClick={() => setForm({...form, image: img})}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="tour-form">
                    <div className="input-group">
                        <label>Tour Title *</label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="e.g., Majestic Pyramids of Giza" 
                            value={form.title} 
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Short Description *</label>
                        <textarea 
                            name="description" 
                            placeholder="Brief, enticing description..."
                            value={form.description} 
                            onChange={handleChange} 
                            required
                            rows="3"
                        />
                    </div>

                    <div className="input-group">
                        <label>Full Information *</label>
                        <textarea 
                            name="fullInfo" 
                            placeholder="Detailed information about the tour..."
                            value={form.fullInfo} 
                            onChange={handleChange} 
                            required
                            rows="5"
                        />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Country *</label>
                            <input 
                                type="text" 
                                name="country" 
                                placeholder="e.g., Egypt" 
                                value={form.country} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Historical Period *</label>
                            <input 
                                type="text" 
                                name="year" 
                                placeholder="e.g., 2560 BC" 
                                value={form.year} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Duration *</label>
                            <input 
                                type="text" 
                                name="duration" 
                                placeholder="e.g., 7 days" 
                                value={form.duration} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Price *</label>
                            <input 
                                type="text" 
                                name="price" 
                                placeholder="e.g., $2,500" 
                                value={form.price} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="spinner"></span> Creating Tour...
                            </>
                        ) : (
                            <>
                                <FaPlus /> Create Luxury Tour
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}