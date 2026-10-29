import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div className="sidebar-overlay" onClick={onClose} />
            )}
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="sidebar-close" onClick={onClose} aria-label="Close menu">×</button>
                <ul className="sidebar-nav">
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} onClick={onClose}>
                            Vault
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/collections" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} onClick={onClose}>
                            Compartments
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;