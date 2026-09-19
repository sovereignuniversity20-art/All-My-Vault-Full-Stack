import { useEffect } from "react";

const ConfirmModal = ({isOpen, onClose, onConfirm, autoClose, message, confirmLabel}) => {
    
    useEffect(() => {
        if(isOpen && autoClose) {
            const timer = setTimeout(onClose, autoClose);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoClose, onClose]);

    if (!isOpen) return null;
    
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
                <div className="modal-buttons">
                    {confirmLabel && (
                          <button className="button" onClick={onConfirm}>{confirmLabel}</button>
                    )}
                    <button className="button" onClick={onClose}>
                        {confirmLabel ? 'Cancel' : 'Dismiss'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;