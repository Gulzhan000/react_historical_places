import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { tourService } from '../api/tourService';
import './TourList.css';
export default function ToursList() {
    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchTours();
    }, []);
    const fetchTours = async () => {
        try {
            setLoading(true);
            const data = await tourService.getAllTours();
            setTours(data);
        } catch (err) {
            console.error('Error fetching tours:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this tour?")) {
            try {
                await tourService.deleteTour(id);
                setTours(prev => prev.filter(tour => tour.id !== id));
            } catch (err) {
                alert('Failed to delete tour');
                console.error(err);
            }
        }
    };
    if (loading) return <div className="loading">Loading tours...</div>;
    return (
        <div>
            <div className="tours-header">
                <h1>Historical Tours Collection</h1>
                <button onClick={() => navigate("/create-tour")} className="btn-create">
                    Add New Tour
                </button>
            </div>
            <div className="tours-list">
                {tours.map(tour => (
                    <div key={tour.id} className="tour-card">
                        <h3>{tour.title}</h3>
                        <div className="tour-basic-info">
                            <span><strong>Country:</strong> {tour.country}</span>
                            <span><strong>Built:</strong> {tour.year}</span>
                        </div>
                        <div className="tour-buttons">
                            <button onClick={() => navigate(`/edit-tour/${tour.id}`)} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete(tour.id)} className="btn-delete">Delete</button>
                        </div>
                        <Link className="read-link" to={`/post/${tour.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}