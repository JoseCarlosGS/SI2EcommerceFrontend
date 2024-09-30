import { useEffect, useState } from 'react';
import { createUser, updateUser } from '../../services/userService'; // Asegúrate de tener este servicio
import './UserRegister.css';

const UserRegister = ({ onClose, user }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    country: ''
  });
  const [error, setError] = useState(null); // Manejo de errores

  useEffect(() => {
    if (user) {
      setFormData(user); // Cargar datos del usuario si está editando
    } else {
      setFormData({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        country: ''
      }); // Reiniciar el formulario si es nuevo
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        if (user && user.id) {
            // Llamada al servicio para actualizar solo los campos necesarios
            await updateUser(user.id,{
                id: formData.id,
                username: formData.username,
                password: formData.password,
                firstname: formData.firstname,
                lastname: formData.lastname,
                country: formData.country
            });
        } else {
            // Llamada al servicio para crear un nuevo usuario
            await createUser({
                username: formData.username,
                password: formData.password,
                firstname: formData.firstname,
                lastname: formData.lastname,
                country: formData.country
            });
        }
        onClose(); // Cerrar el modal o limpiar el formulario
        window.location.reload();
    } catch (err) {
        setError('Error al guardar el usuario');
    }
};

return (
    <div className="container my-5" style={{ maxWidth: '800px' }}> {/* Ajusta el ancho del contenedor */}
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {user ? 'Editar Usuario' : 'Registrar Usuario'}
              </h2>
              {error && <p className="alert alert-danger">{error}</p>} {/* Mostrar error si hay */}
                    <form
                        onSubmit={handleSubmit} // Se pasa el evento automáticamente
                        className="needs-validation"
                        noValidate
                    >
                {/* Nombre de Usuario */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Nombre de Usuario:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>
  
                {/* Contraseña */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Contraseña:</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>
  
                {/* Nombre */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Nombre:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>
  
                {/* Apellido */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Apellido:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>
  
                {/* País */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">País:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>
  
                {/* Botón Guardar */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">
                    Guardar
                    </button>
                    <button
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/dashboard/users';
                    }} // Recarga la página al cancelar
                    className="btn btn-secondary"
                    >
                    Cancelar
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
