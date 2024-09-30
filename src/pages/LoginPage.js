import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './LoginPage.css'; // Asegúrate de importar tu archivo CSS

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page"> {/* Añadir la clase login-page */}
      <div className="image-container"></div> {/* Espacio para la imagen */}
      <div className="container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="bi bi-person icon"></i>
            <input
              type="text"
              placeholder="Usuario"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div className="input-container">
            <i className="bi bi-lock icon"></i>
            <input
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

