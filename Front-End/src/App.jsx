import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import sampleItems from './data/sampleData.js';
import './index.css';
import AboutOverlay from './components/AboutOverlay.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState (sampleItems);
  const [isAuthorized, setIsAuthorized] = useState (false);
  const [isAboutOpen, setIsAboutOpen] = useState (false);
  const navigate = useNavigate();

  //Handlers for states and media card

  const handleDelete = (id) => {
    setItems(items.filter((item) => id !== item.id))
  };
  const handleAdd = (newItem) => {
    setItems([...items, newItem])
  };
  const handleEdit = (updatedItem) => {
    setItems(items.map((item) => item.id === updatedItem.id ? updatedItem : item));
  };
  const handleLogin = (userInfo) => {
    setCurrentUser(userInfo);
    setIsAuthorized(true)
    navigate('/dashboard');
  };

  const handleLogout = () => {
   setCurrentUser(null);
    setIsAuthorized(false)
    navigate('/');
  };

  const handleOpenAbout = () => {
    setIsAboutOpen(true);
  };
 
  

  return (
    <main className='App'>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} onOpenAbout={handleOpenAbout}/>} />
        <Route path="/dashboard" element={isAuthorized ? <DashboardPage items={items} 
        currentUser={currentUser} onAdd={handleAdd} onDelete={handleDelete} 
        onEdit={handleEdit} onLogout={handleLogout} onOpenAbout={handleOpenAbout}/> 
        : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <AboutOverlay className="about" isOpen={isAboutOpen} onClose={() =>
          setIsAboutOpen(false)} />
    </main>


  )
};

export default App;

