import { useState, useEffect } from 'react';

const MediaFormModal = ({isOpen, editingItem, onSubmit, onClose}) => {
    const [formValues, setFormValues] = useState({title: '', type: '', tags: [], dateAdded: ''});

   // Editing Media in Vault
   
    useEffect(() => {
         if (editingItem) { 
            setFormValues(editingItem) 
        } else { 
            setFormValues({title: '', type: '', tags: [], dateAdded: ''}) 
        }  
    }, [editingItem, isOpen]);

    // Logic for handling and categorizing new media added to vault
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        let type = '';
        if (file.type.startsWith('image/')) type='image'        
        else if (file.type.startsWith('audio/')) type = 'audio';
        else if (file.type.startsWith('video/')) type = 'video';
        else if (file.type === 'application/pdf') type = 'pdf';
        else type = 'doc';

        let thumbnail = null;
        if (type === 'image') thumbnail = URL.createObjectURL(file);
       
        setFormValues({...formValues, type: type, title: file.name, thumbnail: thumbnail});
    };

    const handleSubmit = () => {
        const tagsArray = typeof formValues.tags === 'string'
        ? formValues.tags.split(',').map(tag => tag.trim())
        : formValues.tags;
        const itemData = {
            ...formValues,
            tags: tagsArray,
            dateAdded: new Date().toLocaleDateString(),
            id: editingItem ? editingItem.id : Date.now().toString()
        };
        
        onSubmit(itemData);
        onClose();

    };

    if(!isOpen) return null;

return (

<div className="mediacard">
    <label>
    Title:
    <input type="text" value={formValues.title} 
    onChange={(e) => setFormValues({...formValues, title:e.target.value})} />
    </label>

    <label>
    Tags:    
    <input type="text" value={formValues.tags}
    onChange={(e) => setFormValues({...formValues, tags:e.target.value})} />
    </label> 
    
    <label>
       <input type="file" onChange={handleFileChange}/> 
    </label>

    <button type="button" onClick={handleSubmit}>Save
    </button>
    
    <button type="button" onClick={onClose}>Cancel 
    </button>
</div>
)
};

export default MediaFormModal; 
