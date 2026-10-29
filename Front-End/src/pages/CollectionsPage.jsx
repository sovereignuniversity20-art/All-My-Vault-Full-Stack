import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const CollectionsPage = () => {
    const { token } = useContext(DataContext);
    const navigate = useNavigate();
    const [collections, setCollections] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/collections', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCollections(data))
            .catch(err => console.error('Failed to fetch collections:', err));
    }, [token]);

    const handleCreate = async () => {
        if (!newTitle.trim()) return;
        const res = await fetch('http://localhost:8080/collections', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle.trim() })
        });
        const created = await res.json();
        setCollections(prev => [...prev, created]);
        setNewTitle('');
        setIsCreating(false);
    };

    return (
        <div className="collections-page">
            <div className="collections-header">
                <h2 className="collections-title">Compartments</h2>
                <button className="button" onClick={() => setIsCreating(true)}>
                    New Compartment
                </button>
            </div>

            {isCreating && (
                <div className="collection-create-form">
                    <input
                        type="text"
                        placeholder="Collection name"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                        autoFocus
                    />
                    <button className="button" onClick={handleCreate}>Create</button>
                    <button className="button" onClick={() => { setIsCreating(false); setNewTitle(''); }}>Cancel</button>
                </div>
            )}

            <div className="collections-grid">
                {collections.map(collection => (
                    <div
                        key={collection.id}
                        className="collection-box"
                        onClick={() => navigate(`/collections/${collection.id}`)}
                    >
                        <div className="collection-thumbnail">
                            {collection.coverItemId
                                ? <img
                                    src={`http://localhost:8080/media-items/${collection.coverItemId}/file`}
                                    alt={collection.title}
                                />
                                : <div className="collection-thumbnail-empty">No cover</div>
                            }
                        </div>
                        <p className="collection-box-title">{collection.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;