import manifestImage from '../images/vault_manifest_document.png'

const AboutOverlay = ({isOpen, onClose}) => {
     console.log('overlay isOpen:', isOpen)
    if(!isOpen)
        return (null);

    return (
        <div className="overlay-backdrop" onClick={onClose}>
            <div className="manifest-content" role="dialog" aria-modal="true"
            onClick={(e) => e.stopPropagation()}>
            <img className='manifest' src={manifestImage} alt="All My Vault About" />
            <button className='x-button' type="button" onClick={onClose}>&#10060;</button>
        </div>
        </div>      
    );
};

export default AboutOverlay;