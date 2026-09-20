 import { useState } from "react";
 import VaultHeader from "../components/VaultHeader";
 import MediaCard from "../components/MediaCard";
 import MediaFormModal from "../components/MediaFormModal";
 import Footer from "../components/Footer";
 import { DataContext } from "../context/DataContext";
 import { useContext } from "react";
 import ConfirmModal from "../components/ConfirmModal";

 
 const DashboardPage = ({currentUser, onLogout, onOpenAbout}) => {
    const { items, onAdd, onDelete, onEdit } = useContext(DataContext);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeFilter, setActiveFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVaultStatOpen, setIsVaultStatOpen] = useState(false);
    const [enlargedItem, setEnlargedItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showUploadSuccess, setShowUploadSuccess] = useState(false);
    const typeIcons = {
    pdf: '\u{1F4C3}',
    audio: '\u{1F3A7}',
    video: '\u{1F4F9}',
    image: '\u{1F4F8}'  
};

    //Handlers for Media Card Forms

const onOpenForm = () => {
        setIsFormOpen(true);
    };

const handleFormSubmit = async (itemData) => {
    if (editingItem) {
        onEdit(itemData);
    } else {
        await onAdd(itemData);
        console.log('upload done, setting success');
        setShowUploadSuccess(true);
    }
    setEditingItem(null);
};

const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
};

const mediaTypes = ['image', 'audio', 'video', 'pdf']

// Filter Functionality

let visibleItems = items || [];
if (activeFilter !== '' && activeFilter !== 'all') {
    visibleItems = visibleItems.filter((item) => item.type === activeFilter);  
}

// Search Functionality

if (searchQuery !== '') {
    visibleItems = visibleItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
}

    return (
    <main className="dashboard">
        <VaultHeader currentUser={currentUser} onOpenForm={onOpenForm} 
        searchQuery={searchQuery} activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} onSearchChange={setSearchQuery} onLogout={onLogout} />
         <div className="card-grid">
             {visibleItems.map((item) => (
                 <MediaCard 
            key={item.id} 
                {...item} 
                onRequestDelete={setItemToDelete}
                onDelete={onDelete}
                onEdit={handleOpenEdit}
                onEnlarge={setEnlargedItem}/> 
            ))}
         </div>
       <div className="stats">
         <button className="button" type="button" 
         onClick={(e) => setIsVaultStatOpen(!isVaultStatOpen)}>Vault Stats</button>
         {isVaultStatOpen && (
           <table className="table">
        <thead>
            <tr>
                <th>Type</th>
                <th>Count</th>
            </tr>
        </thead>        
        <tbody>
            {mediaTypes.map((type) => (
                <tr key={type}>
                    <td>{type}</td>
                    <td> {visibleItems.filter((item) => item.type === type).length}</td>
                </tr>
            ))}
        </tbody>
       </table> 
         )}
       </div>
      
       
        <MediaFormModal isOpen={isFormOpen} editingItem={editingItem} 
        onSubmit={handleFormSubmit} onClose={() => setIsFormOpen(false)} />

         <ConfirmModal isOpen={itemToDelete !== null}
         message={"Are you sure you want to delete this item?"}
         confirmLabel={"Delete"}
         onConfirm={() => { onDelete(itemToDelete); setItemToDelete(null); }}
         onClose={() => setItemToDelete(null)} />

         <ConfirmModal isOpen={showUploadSuccess}
         message={"Item added to your vault!"}
         onClose={() => setShowUploadSuccess(false)}
         autoClose={3000} />


        <Footer className="dash-about"onOpenAbout={onOpenAbout} />
         {enlargedItem && (
            <div className="lightbox-backdrop" onClick={() => setEnlargedItem(null)}>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                    {enlargedItem.thumbnail
                    ? <img src={`http://localhost:8080/media-items/${enlargedItem.id}/file`} alt={enlargedItem.title} className="lightbox-image" />
                    : <span className="lightbox-icon">{typeIcons[enlargedItem.type]}</span>
                }
                    <div className="lightbox-caption">
                        <h3>{enlargedItem.title}</h3>
                        <ul>
                            {enlargedItem.tags.map(tag => <li key={tag}>{tag}</li>)}
                        </ul>

                    </div>
                </div>
            </div>
         )}
    </main>
       
    )
    
 };


export default DashboardPage;

