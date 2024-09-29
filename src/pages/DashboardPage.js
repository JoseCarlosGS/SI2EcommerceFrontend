import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
    return (
      <Dashboard>
        <Outlet /> {/* Aquí se renderizarán los componentes del CRUD según la ruta */}
      </Dashboard>
    );
  };

export default DashboardPage;