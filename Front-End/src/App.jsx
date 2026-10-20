import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

import './index.css';
import AboutOverlay from './components/AboutOverlay.jsx';
import { DataContext, DataProvider } from './context/DataContext.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  const [isAuthorized, setIsAuthorized] = useState (false);
  const [isAboutOpen, setIsAboutOpen] = useState (false);
  const navigate = useNavigate();
  const {logout, token} = useContext(DataContext);

  //Handlers for states

  const handleLogin = (userInfo) => {
    setCurrentUser(userInfo);
    setIsAuthorized(true)
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
        logout();
        setCurrentUser(null);
        setIsAuthorized(false)
      navigate('/');
    }
  };

  const handleOpenAbout = () => {
    setIsAboutOpen(true);
  };
 
  

  return (
    <main className='App'>
      <DataProvider>
        <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} onOpenAbout={handleOpenAbout}/>} />
        <Route path="/dashboard" element={isAuthorized ? <DashboardPage 
        currentUser={currentUser} onLogout={handleLogout} onOpenAbout={handleOpenAbout}/> 
        : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </DataProvider>
      <AboutOverlay className="about" isOpen={isAboutOpen} onClose={() =>
          setIsAboutOpen(false)} />
    </main>


  )
};

export default App;

