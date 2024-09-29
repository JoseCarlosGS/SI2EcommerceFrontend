import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="dashboard-content">
          <Outlet /> {/* Aquí se renderizan los componentes como UserCRUD, ProductCRUD */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
