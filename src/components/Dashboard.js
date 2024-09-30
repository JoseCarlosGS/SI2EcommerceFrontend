import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { useState } from 'react';

function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Estado para manejar la contracción

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Alterna el estado del sidebar
  };

  return (
    <div className="dashboard" > {/* Asegúrate de que el contenedor principal ocupe toda la altura de la pantalla */} 
      <Sidebar isCollapsed={isSidebarCollapsed} /> {/* Asegúrate de que el sidebar ocupe toda la altura */}
      <div className={`dashboard-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} /> {/* Asegúrate de que el Navbar esté dentro del contenido del dashboard */}
        <div className="main-content">
          <Outlet /> {/* Aquí se renderizan los componentes como UserCRUD, ProductCRUD */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
