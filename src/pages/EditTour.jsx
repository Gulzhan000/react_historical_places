import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { tourService } from '../api/tourService';
import './EditTour.css';

export default function EditTour() { 
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        title: "", 
        description: "", 
        fullInfo: "", 
        country: "", 
        year: "", 
        duration: "", 
        price: "" 
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        const fetchTour = async () => {
            try {
                setLoading(true);
                const data = await tourService.getTourById(id);
                if (data) {
                    setForm(data);
                }
            } catch (err) {
                console.error('Error fetching tour:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            await tourService.updateTour(id, form);
            navigate("/");
        } catch (err) {
            alert('Failed to update tour');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="edit-tour-container">Loading...</div>;

    return (
        <div className="edit-tour-container">
            <h2>Edit Tour #{id}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required/>
                <input type="text" name="description" placeholder="Short Description" value={form.description} onChange={handleChange} required/>
                <input type="text" name="fullInfo" placeholder="Full Information" value={form.fullInfo} onChange={handleChange} required/>
                <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required/>
                <input type="text" name="year" placeholder="Year" value={form.year} onChange={handleChange} required/>
                <input type="text" name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} required/>
                <input type="text" name="price" placeholder="Price" value={form.price} onChange={handleChange} required/>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Updating...' : 'Update Tour'}
                </button>
            </form>
        </div>
    );
}