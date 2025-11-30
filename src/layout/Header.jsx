import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(){
    return (
        <header className="header">
            <h2>Historical Places</h2>
            <nav className="nav">
                <Link to='/'>Home</Link>
                <Link to='#'>Destinations</Link>
                <Link to='#'>About</Link>
                <Link to="#">Contact</Link>
            </nav>
        </header>
    )
}