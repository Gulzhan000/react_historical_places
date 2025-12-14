import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./PostDetail.css"

export default function PostDetail() {
    const { id } = useParams();
    const numericId = Number(id);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        const baseTours = {
            1: { id:1, title: "The Colosseum, Rome", description: "Ancient amphitheater", fullInfo: "Includes Colosseum, Roman Forum", country: "Italy", year:"70-80 AD", duration:"7 days", price:"$1,200" },
            2: { id:2, title: "Machu Picchu, Peru", description:"Incan citadel", fullInfo:"Hike Inca Trail and guided tour", country:"Peru", year:"15th century", duration:"5 days", price:"$1,500" },
            3: { id:3, title:"The Great Wall of China", description:"Series of fortifications", fullInfo:"Visits to Mutianyu and Badaling", country:"China", year:"7th century BC", duration:"6 days", price:"$1,300" },
            4: { id:4, title:"Pyramids of Giza, Egypt", description:"Ancient pyramid complex", fullInfo:"Giza Pyramid, Sphinx", country:"Egypt", year:"2580–2560 BC", duration:"8 days", price:"$2,000" },
            5: { id:5, title:"Taj Mahal, India", description:"White marble mausoleum", fullInfo:"Visit Agra Fort, Fatehpur Sikri", country:"India", year:"1632–1653", duration:"4 days", price:"$900" }
        };

        // новые карточки
        const newTours = JSON.parse(localStorage.getItem("allTours")) || [];

        // сначала ищем среди базовых, потом среди новых
        let foundPlace = baseTours[numericId] || newTours.find(t => t.id === numericId);

        setPlace(foundPlace);
    }, [id]);

    if (!place) return <h2>Loading...</h2>;

    return (
        <div>
            <h1 className='detail-title'>{place.title}</h1>
            <div className="place-info">
                <p><strong>Country:</strong> {place.country}</p>
                <p><strong>Year:</strong> {place.year}</p>
                <p><strong>Duration:</strong> {place.duration}</p>
                <p><strong>Price:</strong> {place.price}</p>
            </div>
            <p className='detail-text'>{place.description}</p>
            <p className='detail-text'>{place.fullInfo}</p>
            <Link to="/" className="read-link">Back to Home</Link>
        </div>
    );
}
