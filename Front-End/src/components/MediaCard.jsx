import ReusableButton from "./ReusableButton"

const typeIcons = {
    pdf: '\u{1F4C3}',
    audio: '\u{1F3A7}',
    video: '\u{1F4F9}',
    image: '\u{1F4F8}'  
};

const MediaCard = ({id, title,type, tags, thumbnail, dateAdded, onDelete, onEdit, onEnlarge, onRequestDelete}) => {
  
    

    return(
        <article className="mediacard" onClick={() => onEnlarge({id, title, type, tags, thumbnail, dateAdded})}>
        <ReusableButton label= "🗑" onClick={(e) => { e.stopPropagation(); onRequestDelete(id)}} variant="delete" />
        <ReusableButton label="✏️" onClick={(e) => { e.stopPropagation(); onEdit({id, title, type, tags, thumbnail, dateAdded}); }} />
            <br></br>
            <br></br>
        <h4>{title}</h4>
            
        {thumbnail ? <img className="image" src={thumbnail} alt={title} /> : <span className="card-icon">{typeIcons[type]}</span>}
        <h4>{type}</h4>
            <br></br>
        <ul className="tags">
             {tags.map((tag) => <li key={tag}>{tag}</li>)} 
        </ul>
            <br></br>
        <h4>{dateAdded}</h4>
    </article>
)};

export default MediaCard;