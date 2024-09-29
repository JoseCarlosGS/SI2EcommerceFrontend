import { useNavigate } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css'; // 

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <h1>Sistema Bancario</h1>
    </nav>
  );
}

export default Navbar;
