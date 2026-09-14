import { useState } from "react";
import logo from '../images/logo.png'

const VaultHeader = ({currentUser, onOpenForm, searchQuery, activeFilter, onFilterChange, onSearchChange, onLogout}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    return (
    <header>
        <div className="header-left">   

            <button className="button" type="button" 
            onClick={(e) => setIsDropdownOpen (!isDropdownOpen)}>Filter &#128209;</button>
            {isDropdownOpen && (
                <div className="dropdown">
                    <ul>
                    <li>
                        <button className="button" onClick={() => {onFilterChange('all');
                    setIsDropdownOpen(false); }}>All &#127974;</button>
                    </li>
                    <li>
                        <button className="button" onClick={() => {onFilterChange('pdf');
                    setIsDropdownOpen(false); }}>PDFs &#128195;</button>
                    </li>
                    <li>
                        <button className="button" onClick={() => {onFilterChange('image');
                    setIsDropdownOpen(false); }}>Images &#128248;</button>
                    </li>
                    <li>
                        <button className="button" onClick={() => {onFilterChange('audio');
                    setIsDropdownOpen(false); }}>Audio Files &#127911;</button>
                    </li>
                    <li>
                        <button className="button" onClick={() => {onFilterChange('video');
                    setIsDropdownOpen(false); }}>Video Files &#128249;</button>
                    </li>
                    </ul>
                </div>
            )}        

             <button className="button" type="button" 
                onClick={(e) => onOpenForm()}>Add to Vault  &#128229;
            </button>
            
            <label>
                <span className="search">Search &#128269;</span>   
                <input className="search-box" type="search" value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)} /> 
            </label>
        </div>

        <div className="header-center">
            <h1 className="title">
                <span className="title-text">All My Vault</span>
                <img src={logo} alt="All My Vault" className="logo" /></h1>
        </div>    
        <div className="header-right">
            <button className="button" type="button"
            onClick={(e) => onLogout()}>Exit Vault &#x2386;</button>
            {currentUser && <h4>{(currentUser.name)}</h4>}
        </div>
    </header> 
    )
};

export default VaultHeader;

