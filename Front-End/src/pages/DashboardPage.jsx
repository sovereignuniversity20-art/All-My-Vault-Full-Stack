 import { useState } from "react";
 import VaultHeader from "../components/VaultHeader";
 import MediaCard from "../components/MediaCard";
 import MediaFormModal from "../components/MediaFormModal";
 import Footer from "../components/Footer";


 
 const DashboardPage = ({items,currentUser, onAdd, onDelete, onEdit, onLogout, onOpenAbout}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeFilter, setActiveFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVaultStatOpen, setIsVaultStatOpen] = useState(false);
    

    //Handlers for Media Card Forms

const onOpenForm = () => {
        setIsFormOpen(true);
    };

const handleFormSubmit = (itemData) => {
    if (editingItem) {
        onEdit(itemData);
    } else {
        onAdd(itemData);
    }
    setEditingItem(null);
};

const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
};

const mediaTypes = ['image', 'audio', 'video', 'pdf']

// Filter Functionality

let visibleItems = items;
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
                onDelete={onDelete} 
                onEdit={handleOpenEdit}/> 
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
        <Footer onOpenAbout={onOpenAbout} />
      
    </main>
       
    )
    
 };


export default DashboardPage;

