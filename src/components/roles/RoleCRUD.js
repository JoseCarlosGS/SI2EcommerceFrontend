import { useEffect, useState } from 'react';
import { getRoles } from '../../services/roleService';
import './RoleCRUD.css';

function RoleCRUD() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  return (
    <div className="role-crud-container">
      <h2>Gestionar Roles</h2>

      {/* Botón para agregar un nuevo usuario */}
      <button className="add-role-btn">Agregar Nuevo Rol</button>

      {/* Tabla para mostrar los usuarios */}
      <table className="role-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Permisos</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                <div className="button-container">
                        <button
                            className="edit-btn"
                            // onClick={() => handleEditCategory(category)}
                          >
                          <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="delete-btn"
                            // onClick={() => handleDeleteCategory(category.id)}
                          >
                           <i className="bi bi-trash"></i>
                          </button>
                        </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay roles disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoleCRUD;