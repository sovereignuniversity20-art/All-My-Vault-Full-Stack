import { createContext, useEffect, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    
   
     //Handlers for media card
    
     const fetchMediaItems = async () => {
        const mediaItems = [];
        try {
            const response = await fetch('http://localhost:8080/media-items');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - Status ${response.status}`);
            } else {
                const data = await response.json();
                data.forEach(mediaItem => {
                     console.log('item type:', mediaItem.type, 'item id:', mediaItem.id);
                        mediaItem.tags = mediaItem.tags ? mediaItem.tags.split(',').map(tag => tag.trim()) 
                        : [];
                    if (mediaItem.type === 'image') {
                        mediaItem.thumbnail = `http://localhost:8080/media-items/${mediaItem.id}/file`;
        }
                    mediaItems.push(mediaItem);
                });
                console.log('items before set:', mediaItems);
                setItems(mediaItems);
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
         
    const handleAdd = async (formData) => {
        try {
            const response = await fetch('http://localhost:8080/media-items/upload', {
            method: 'POST',  
            body: formData,
            });
            if (!response.ok) {
             const errorData = await response.json();
                 throw new Error(errorData.message || `ERROR - Status ${response.status}`);
            } else {
                await fetchMediaItems();
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
        };     

  const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/media-items/${id}`, {
            method: 'DELETE',
             });
            if (!response.ok) {
              const errorData = await response.json();
                 throw new Error(errorData.message || `  ERROR - Status ${response.status}`);
             } else {
                  await fetchMediaItems(); 
             }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
        };
  
    const handleEdit = async (updatedItem) => {
        try {
            const response = await fetch(`http://localhost:8080/media-items/${updatedItem.id}`, {
            method: 'PUT',  
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(updatedItem),
            });
            if (!response.ok) {
             const errorData = await response.json();
                 throw new Error(errorData.message || `ERROR - Status ${response.status}`);
            } else {
                await fetchMediaItems();
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
        };
  useEffect(() => {
        fetchMediaItems();
        }, []);

    

return (
    <DataContext.Provider value={{items, isLoading, error, onAdd: handleAdd, onEdit: handleEdit, onDelete: handleDelete}}>
        {children}
    </DataContext.Provider>
    );
};
