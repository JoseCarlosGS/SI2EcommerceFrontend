import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserCRUD from './components/UserCRUD';
import ProductCRUD from './components/ProductCRUD';
import CategoryCRUD from './components/CategoryCRUD';

function App() {
  const token = localStorage.getItem('token');  // Verifica si el usuario está autenticado
  return (
    <Router>
      <Routes>
        {/* Ruta de inicio */}
        <Route path="/" element={<HomePage />} />
        
        {/* Ruta de login */}
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
        
        {/* Rutas protegidas (Dashboard) */}
        <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" />} >
          {/* Rutas dentro del dashboard para CRUD */}
          <Route path="users" element={<UserCRUD />} />
          <Route path="products" element={<ProductCRUD />} />
          <Route path="categories" element={<CategoryCRUD />} />
        </Route>

        {/* Redirige a inicio si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
