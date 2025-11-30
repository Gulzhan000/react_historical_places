import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './PostList.css'

export default function PostsList() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        // Временные данные исторических мест
        const historicalPlaces = [
            {
                id: 1,
                title: "The Colosseum, Rome",
                description: "An ancient amphitheater in Rome, Italy",
                country: "Italy",
                year: "70-80 AD"
            },
            {
                id: 2,
                title: "Machu Picchu, Peru",
                description: "Incan citadel in the Andes Mountains",
                country: "Peru", 
                year: "15th century"
            },
            {
                id: 3,
                title: "The Great Wall of China",
                description: "Series of fortifications across northern China",
                country: "China",
                year: "7th century BC"
            },
            {
                id: 4,
                title: "Pyramids of Giza, Egypt",
                description: "Ancient pyramid complex near Cairo",
                country: "Egypt",
                year: "2580–2560 BC"
            },
            {
                id: 5,
                title: "Taj Mahal, India",
                description: "White marble mausoleum in Agra",
                country: "India",
                year: "1632–1653"
            }
        ];
        setPlaces(historicalPlaces);
    }, []);

    return (
        <div>
            <h1>Historical Places</h1>
            <p>Discover the world's most fascinating historical sites</p>
            {places.map(place => (
                <div key={place.id} className="post">
                    <h3>{place.title}</h3>
                    <p>{place.description}</p>
                    <div style={{fontSize: '14px', color: '#666', marginTop: '5px'}}>
                        <strong>Country:</strong> {place.country} | <strong>Built:</strong> {place.year}
                    </div>
                    <Link className="read-link" to={`/post/${place.id}`}>Learn More</Link>
                </div>
            ))}
        </div>
    );
}