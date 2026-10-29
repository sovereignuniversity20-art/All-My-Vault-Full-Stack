import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import CollectionDetailPage from './pages/CollectionDetailPage.jsx';
import Sidebar from './components/Sidebar.jsx';

import './index.css';
import AboutOverlay from './components/AboutOverlay.jsx';
import { DataContext, DataProvider } from './context/DataContext.jsx';

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState (false);
  const [isAboutOpen, setIsAboutOpen] = useState (false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        setIsSidebarOpen(false);
        navigate('/');
    }
  };

  const handleOpenAbout = () => {
    setIsAboutOpen(true);
  };
 
  

  return (
    <main className='App'>
      {isAuthorized && (
        <>
          <button className="hamburger" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">☰</button>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
      )}
        <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} onOpenAbout={handleOpenAbout}/>} />
        <Route path="/dashboard" element={isAuthorized ? <DashboardPage 
        currentUser={currentUser} onLogout={handleLogout} onOpenAbout={handleOpenAbout}/> 
          : <Navigate to="/" />} />
        <Route path="/collections" element={isAuthorized ? <CollectionsPage />
          : <Navigate to="/" />} />
        <Route path="/collections/:id" element={isAuthorized ? <CollectionDetailPage />
          : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      <AboutOverlay className="about" isOpen={isAboutOpen} onClose={() =>
          setIsAboutOpen(false)} />
    </main>


  )
};

const App = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;

