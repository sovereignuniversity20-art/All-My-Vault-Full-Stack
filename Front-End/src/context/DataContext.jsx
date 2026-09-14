import { createContext, useEffect, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
   
     //Handlers for media card

  const handleDelete = (id) => {
    setItems(items.filter((item) => id !== item.id))
  };
  const handleAdd = (newItem) => {
    setItems([...items, newItem])
  };
  const handleEdit = (updatedItem) => {
    setItems(items.map((item) => item.id === updatedItem.id ? updatedItem : item));
  };

    useEffect(() => {
        const fetchMediaItems = async () => {
            const mediaItems = [];
            try {
            const response = await fetch('http://localhost:8080/media-items');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`,  
                );
            } else {
                const data = await response.json();

                data.forEach(mediaItem => {
                        mediaItem.tags = mediaItem.tags ? mediaItem.tags.split(',').map(tag => tag.trim()) 
                        : [];
                    mediaItems.push(mediaItem);
                });
                setItems(mediaItems);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
        };
        fetchMediaItems();
    }, []);


return (
    <DataContext.Provider value={{items, isLoading, error, onAdd: handleAdd, onEdit: handleEdit, onDelete: handleDelete}}>
        {children}
    </DataContext.Provider>
);

};