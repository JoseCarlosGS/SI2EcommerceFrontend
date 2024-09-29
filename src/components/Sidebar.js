  import { Link } from 'react-router-dom';
  import './Sidebar.css';

  function Sidebar() {
    return (
      <div className="sidebar">
        <ul className="list-unstyled">
          <li>
            <Link to="/dashboard/users" className="sidebar-link">
              <i className="bi bi-people-fill"></i> {/* Ícono de Bootstrap para usuarios */}
              Gestionar Usuarios
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="sidebar-link">
              <i className="bi bi-box-seam"></i> {/* Ícono de Bootstrap para productos */}
              Gestionar Productos
            </Link>
          </li>
          <li>
            <Link to="/dashboard/categories" className="sidebar-link">
              <i className="bi bi-tags-fill"></i> {/* Ícono de Bootstrap para categorías */}
              Gestionar Categorías
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  export default Sidebar;
