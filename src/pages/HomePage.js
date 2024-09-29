import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Bienvenido a nuestro Sistema Bancario</h1>
      <p>Gestiona tus productos, usuarios y categorías de manera sencilla.</p>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default HomePage;
