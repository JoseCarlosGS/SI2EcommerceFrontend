import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import './Navbar.css'; // 
import React from 'react';

function Navbar({ toggleSidebar, isSidebarCollapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return ( 
    <nav className='navbar'>
      <button onClick={toggleSidebar} className="sidebar-toggle-btn">
        {isSidebarCollapsed ? (
          <i className="bi bi-chevron-right"></i> // Icono hacia la derecha
        ) : (
          <i className="bi bi-chevron-left"></i> // Icono hacia la izquierda
        )}
      </button>
      <h1>Administracion</h1>
    </nav>
  );
}

export default Navbar;
