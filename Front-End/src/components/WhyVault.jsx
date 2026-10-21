import { useState } from "react";

const WhyVault = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="why-vault">
            <button
                className="why-vault-toggle"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                Why All My Vault?
                <span className={`why-vault-arrow ${isOpen ? 'open' : ''}`}>▾</span>
            </button>

            {isOpen && (             
                <div className="why-vault-content">
                    <div className="why-vault-item">
                        <span className="why-vault-label">Your key opens your vault</span>
                        <p>Your password is your vault key - the only credential that unseals your archive.</p>
                        <br></br>
                        <p>Vault Key must contain:</p>
                        <ul className="key-requirements">
                            <li>8 or more charters</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one lowercase letter</li>
                            <li>At least one number</li>
                            <li>At least one special character: ! @ # $ %</li>
                        </ul>
                    </div>
                    <div className="why-vault-item">
                        <span className="why-vault-label">Local-first</span>
                        <p>Your files stay on your hardware. Nothing is uploaded to a third-party server.</p>
                    </div>

                    

                    <div className="why-vault-item">
                        <span className="why-vault-label">Secured</span>
                        <p>Sessions are secured and expire the moment you seal the vault — no lingering access.</p>
                    </div>

                    <div className="why-vault-item">
                        <span className="why-vault-label">Open source</span>
                        <p>Built to be owned. Run it on your own machine, read the code, make it yours.</p>
                    
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhyVault;