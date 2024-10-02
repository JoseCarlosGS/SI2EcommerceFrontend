  import { Link, useNavigate } from 'react-router-dom';
  import './Sidebar.css';
  import React, { useState } from 'react';

  function Sidebar({ isCollapsed }) {

    const [isAdminOpen, setAdminOpen] = useState(false);
    const [isProductOpen, setProductOpen] = useState(false);
    const navigate = useNavigate();

    const toggleAdminMenu = () => {
      setAdminOpen(!isAdminOpen);
    };

    const toggleProductMenu = () => {
      setProductOpen(!isProductOpen);
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href='/login';
    };

    return (
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="profile-section">
          <i className="bi bi-person-circle profile-icon"></i> {/* Ícono de perfil grande */}
          <div className="profile-buttons">
            <Link to="/profile" className="profile-button">
              <i className="bi bi-person"></i> {/* Ícono para ir al perfil */}
            </Link>
            <button className="profile-button" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> {/* Ícono para salir */}
            </button>
          </div>
        </div>
        <h5>Oficina Central</h5>

        <ul className="list-unstyled">
          <li className={`sidebar-item ${isAdminOpen ? 'active' : ''}`}>
            <div className="sidebar-link" onClick={toggleAdminMenu}>
              <i className="bi bi-gear-fill"></i> {/* Ícono de administración */}
                <span>Administración</span>
              <i className="bi bi-caret-down-fill dropdown-icon"></i> {/* Ícono de desplegable */}
            </div>
            <ul className="submenu">
              <li>
                <Link to="/dashboard/users" className="sidebar-sublink">
                  <i className="bi bi-people-fill"></i> {/* Ícono de usuarios */}
                  <span>Gestionar Usuarios</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/roles" className="sidebar-sublink">
                  <i className="bi bi-person-badge-fill"></i> {/* Ícono de roles */}
                  <span>Gestionar Roles</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className={`sidebar-item ${isProductOpen ? 'active' : ''}`}>
            <div className="sidebar-link" onClick={toggleProductMenu}>
              <i className="bi bi-box2"></i> {/* Ícono de administración */}
                <span>Productos</span>
              <i className="bi bi-caret-down-fill dropdown-icon"></i> {/* Ícono de desplegable */}
            </div>
            <ul className="submenu">
              <li>
                <Link to="/dashboard/products" className="sidebar-sublink">
                  <i className="bi bi-box-seam"></i> {/* Ícono de Bootstrap para productos */}
                  <span>Gestionar Productos</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/categories" className="sidebar-sublink">
                  <i className="bi bi-tags-fill"></i> {/* Ícono de Bootstrap para categorías */}
                  <span>Gestionar Categorias</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  export default Sidebar;
