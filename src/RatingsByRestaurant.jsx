import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './RatingsByRestaurant.css';

function RatingsByRestaurant() {
    const { id } = useParams();
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const url = `http://localhost:8000/api/restaurants/${id}/ratings`;
                console.log(`Haetaan: ${url}`);
                const response = await fetch(url);
                console.log('Status:', response.status);
                
                if (!response.ok) throw new Error(`API virhe: ${response.status}`);
                
                const data = await response.json();
                console.log('Koko data:', data);
                console.log('Ensimmäinen arvio:', data[0]);
                setRatings(data);
            } catch (err) {
                console.error('Virhe:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, [id]);

    const handleDeleteRating = async (ratingId) => {
        if (!window.confirm('Oletko varma että haluat poistaa tämän arvion?')) {
            return;
        }

        try {
            const url = `http://localhost:8000/api/restaurants/${id}/ratings/${ratingId}`;
            const response = await fetch(url, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error(`Poisto epäonnistui: ${response.status}`);

            // Poista arvio listalta
            setRatings(ratings.filter(rating => rating.id !== ratingId));
            console.log('Arvio poistettu onnistuneesti');
        } catch (err) {
            console.error('Virhe poistettaessa:', err);
            alert('Virhe arvion poistamisessa: ' + err.message);
        }
    };

    if (loading) return <p className="loading">Ladataan...</p>;
    if (error) return <p className="error">Virhe: {error}</p>;

    return (
        <div className="ratings-container">
            <div className="ratings-header">
                <Link to="/" className="back-link">← Takaisin ravintolalistaan</Link>
                <h2>Arvioinnit ravintolalle ID: {id}</h2>
            </div>
            
            {ratings.length === 0 ? (
                <p className="no-ratings">Ei arvioita</p>
            ) : (
                <div className="ratings-list">
                    {ratings.map((rating) => (
                        <div key={rating.id} className="rating-card">
                            <div className="rating-card-header">
                                <div className="rating-header">
                                    <span className="rating-value">⭐ {rating.value}</span>
                                    <span className="rating-date">{rating.date_rated}</span>
                                </div>
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDeleteRating(rating.id)}
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="rating-description">
                                {rating.description || 'Ei kommenttia'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RatingsByRestaurant;