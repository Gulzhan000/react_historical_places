import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./PostDetail.css"

export default function PostDetail() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        // Данные для детальной страницы
        const placesData = {
            1: {
                id: 1,
                title: "The Colosseum, Rome",
                description: "The Colosseum is an oval amphitheater in the center of the city of Rome, Italy. It is the largest ancient amphitheater ever built, and is still the largest standing amphitheater in the world today, despite its age.",
                fullInfo: "Built of travertine limestone, tuff, and brick-faced concrete, it was used for gladiatorial contests and public spectacles including animal hunts, executions, re-enactments of famous battles, and dramas based on Roman mythology.",
                country: "Italy",
                year: "70-80 AD",
                architecture: "Roman",
                status: "UNESCO World Heritage Site"
            },
            2: {
                id: 2,
                title: "Machu Picchu, Peru", 
                description: "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a mountain ridge 2,430 meters above sea level.",
                fullInfo: "Often referred to as the 'Lost City of the Incas', it is the most familiar icon of Inca civilization. The Incas built the estate around 1450 but abandoned it a century later at the time of the Spanish conquest.",
                country: "Peru",
                year: "15th century", 
                architecture: "Inca",
                status: "UNESCO World Heritage Site"
            },
            3: {
                id: 3,
                title: "The Great Wall of China",
                description: "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups.",
                fullInfo: "The collective length of all walls is about 21,196 km. The best-known sections were built by the Ming dynasty. The wall served multiple purposes including border control, immigration regulation, and trade facilitation.",
                country: "China",
                year: "7th century BC",
                architecture: "Chinese",
                status: "UNESCO World Heritage Site"
            },
            4: {
                id: 4,
                title: "Pyramids of Giza, Egypt",
                description: "The Giza pyramid complex consists of the Great Pyramid, the Pyramid of Khafre, and the Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx.",
                fullInfo: "The Great Pyramid is the oldest and largest of the three pyramids and is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.",
                country: "Egypt", 
                year: "2580–2560 BC",
                architecture: "Ancient Egyptian",
                status: "UNESCO World Heritage Site"
            },
            5: {
                id: 5,
                title: "Taj Mahal, India",
                description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1632 by Mughal emperor Shah Jahan.",
                fullInfo: "The Taj Mahal was built to house the tomb of Mumtaz Mahal, the emperor's favorite wife. It is regarded as the best example of Mughal architecture and a symbol of India's rich history.",
                country: "India",
                year: "1632–1653",
                architecture: "Mughal",
                status: "UNESCO World Heritage Site"
            }
        };

        setPlace(placesData[id]);
    }, [id]);

    if (!place) return <h2>Loading...</h2>;

    return (
        <div>
            <h1 className='detail-title'>{place.title}</h1>
            <div className="place-info">
                <p><strong>Country:</strong> {place.country}</p>
                <p><strong>Built:</strong> {place.year}</p>
                <p><strong>Architecture:</strong> {place.architecture}</p>
                <p><strong>Status:</strong> {place.status}</p>
            </div>
            <p className='detail-text'>{place.description}</p>
            <p className='detail-text'>{place.fullInfo}</p>
            <Link to="/" style={{color: '#0077cc', textDecoration: 'none'}}>Back to Historical Places</Link>
        </div>
    );
}