import './AboutUs.css';

export default function AboutUs() {
    return (
        <div className="about-container">
            <div className="about-hero">
                <h1 className="about-title">About Historical<span className="logo-accent">Places</span></h1>
                <p className="about-subtitle">Where History Meets Luxury</p>
            </div>
            
            <div className="about-content">
                <div className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2025, Historical Places emerged from a passion for blending cultural heritage 
                        with luxury travel experiences. We believe that exploring historical sites should be 
                        an unforgettable journey, not just a visit.
                    </p>
                </div>
                
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        To provide exclusive, curated tours to the world's most significant historical locations, 
                        offering deep cultural immersion paired with premium accommodations and services.
                    </p>
                </div>
                
                <div className="about-section">
                    <h2>The Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-avatar">GP</div>
                            <h3>Gulzhan Ashuubaeva</h3>
                            <p>Founder & CEO</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">AR</div>
                            <h3>Alexandra Romanov</h3>
                            <p>Chief Historian</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">MC</div>
                            <h3>Michael Chen</h3>
                            <p>Luxury Travel Director</p>
                        </div>
                    </div>
                </div>
                
                <div className="stats-section">
                    <div className="stat">
                        <h3>50+</h3>
                        <p>Historical Sites</p>
                    </div>
                    <div className="stat">
                        <h3>25</h3>
                        <p>Countries</p>
                    </div>
                    <div className="stat">
                        <h3>1000+</h3>
                        <p>Satisfied Travelers</p>
                    </div>
                    <div className="stat">
                        <h3>5⭐</h3>
                        <p>Average Rating</p>
                    </div>
                </div>
            </div>
        </div>
    );
}