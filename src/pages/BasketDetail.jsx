import { useParams, Link } from "react-router-dom";

export default function BasketDetail() {
    const { id } = useParams();
    // Здесь можно сделать fetch по id или брать из состояния
    return (
        <div>
            <h1>Tour Detail #{id}</h1>
            <p>Here you can show full details of the selected tour.</p>
            <Link to="/" className="read-link">Back to List</Link>
        </div>
    );
}
