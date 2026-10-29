import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import MediaCard from '../components/MediaCard';

const CollectionDetailPage = () => {
    const { id } = useParams();
    const { token } = useContext(DataContext);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [collectionTitle, setCollectionTitle] = useState('');

    useEffect(() => {
        // fetch items in this compartment
        fetch(`http://localhost:8080/media-items/collection/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error('Failed to fetch collection items:', err));

        // fetch all collections to get this one's title
        fetch('http://localhost:8080/collections', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                const match = data.find(c => c.id === parseInt(id));
                if (match) setCollectionTitle(match.title);
            })
            .catch(err => console.error('Failed to fetch collection title:', err));
    }, [id, token]);

    return (
        <div className="collection-detail-page">
            <div className="collection-detail-header">
                <button className="back-button" onClick={() => navigate('/collections')}>
                    ← Compartments
                </button>
                <h2 className="collection-detail-title">{collectionTitle}</h2>
            </div>

            {items.length === 0
                ? <p className="collection-empty">No items in this compartment yet.</p>
                : <div className="card-grid">
                    {items.map(item => (
                        <MediaCard
                            key={item.id}
                            {...item}
                            onRequestDelete={() => {}}
                            onDelete={() => {}}
                            onEdit={() => {}}
                            onEnlarge={() => {}}
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default CollectionDetailPage;