import { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '../../services/userService';
import './UserCRUD.css';
import UserRegister from './UserRegister';
import ReactPaginate from 'react-paginate';

function UserCRUD() {
  const [users, setUsers] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Para manejar la edición
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5); // Cambia este valor según tus necesidades

  const toggleRegisterForm = () => {
    setShowRegister(!showRegister);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setCurrentUser(user); // Establece el usuario a editar
    setShowRegister(true); // Muestra el formulario
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      // Actualiza la lista de usuarios después de eliminar
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error eliminando el usuario:', error);
    }
  };

  // Calcular la cantidad total de páginas
  const pageCount = Math.ceil(users.length / usersPerPage);

  // Función para manejar el cambio de página
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Obtener los usuarios de la página actual
  const displayedUsers = users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

  return (
    <div className="user-crud-container">
      <h2>Gestionar Usuarios</h2>

      {/* Botón para agregar un nuevo usuario */}
      <button onClick={toggleRegisterForm} className="add-user-btn">
        Agregar Nuevo Usuario
        <i className="bi bi-person-fill-add"></i>
      </button>

      {/* Mostrar el formulario de registro o la tabla de usuarios */}
      {showRegister ? (
        <UserRegister
          onClose={toggleRegisterForm}
          user={currentUser} // Pasa el usuario actual si se está editando
          onUpdate={(updatedUser) => {
            setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
          }}
        />
      ) : (
        <>
          <div className="select-users-per-page">
            <label htmlFor="usersPerPage">Mostrar:</label>
            <select
              id="usersPerPage"
              onChange={(e) => setUsersPerPage(Number(e.target.value))}
              value={usersPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de Usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditUser(user)}>
                        Editar
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay usuarios disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Componente de Paginación */}
          <ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </>
      )}
    </div>
  );
}

export default UserCRUD;

