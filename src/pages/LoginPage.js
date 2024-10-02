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
                  {/* Botones de redes sociales */}
            <div className="social-buttons" >
              <button className="social-button google" 
              style={{
                backgroundColor: '#E8DDDD49',
                border: 'none',
                borderRadius: '4px',
                padding: '10px',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'background 0.3s',
                width: '60%', // Ajusta el ancho como desees
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E0E0E091')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E8DDDD49')}>  
                <i className="bi bi-google"></i> {/* Icono de Google */}
              </button>
              <button className="social-button facebook"
              style={{
                backgroundColor: '#E8DDDD49',
                border: 'none',
                borderRadius: '4px',
                padding: '10px',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'background 0.3s',
                width: '60%', // Ajusta el ancho como desees
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E0E0E091')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E8DDDD49')}
              >
                <i className="bi bi-facebook"></i> {/* Icono de Facebook */}
              </button>
            </div>

        {/* Enlaces de pie de página */}
            <div className="footer-links">
              <a href="#">Ayuda</a>
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
            </div>
      </div>


    </div>
  );
}

export default LoginPage;

