import { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../../services/productService'; // Asegúrate de tener este servicio
import './ProductRegister.css';

const ProductRegister = ({ onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '', // Nuevo campo para el nombre del producto
    brand: '',
    description: '',
    price: '',
    size: '',
    stock: ''
  });
  const [error, setError] = useState(null); // Manejo de errores

  useEffect(() => {
    if (product) {
      setFormData(product); // Cargar datos del producto si está editando
    } else {
      setFormData({
        name: '',
        brand: '',
        description: '',
        price: '',
        size: '',
        stock: ''
      }); // Reiniciar el formulario si es nuevo
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (product && product.id) {
        // Llamada al servicio para actualizar solo los campos necesarios
        await updateProduct(product.id, {
          id: formData.id,
          name: formData.name, // Campo de nombre
          brand: formData.brand,
          description: formData.description,
          price: formData.price,
          size: formData.size,
          stock: formData.stock
        });
      } else {
        // Llamada al servicio para crear un nuevo producto
        await createProduct({
          name: formData.name, // Campo de nombre
          brand: formData.brand,
          description: formData.description,
          price: formData.price,
          size: formData.size,
          stock: formData.stock
        });
      }
      onClose(); // Cerrar el modal o limpiar el formulario
      window.location.reload();
    } catch (err) {
      setError('Error al guardar el producto');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {product ? 'Editar Producto' : 'Registrar Producto'}
              </h2>
              {error && <p className="alert alert-danger">{error}</p>} {/* Mostrar error si hay */}
              <form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate
              >
                {/* Nombre del Producto */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Nombre del Producto:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="name" // Campo para el nombre del producto
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>

                {/* Marca */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Marca:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Descripción:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>

                {/* Precio */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Precio:</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>

                {/* Talla */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Talla:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">Este campo es obligatorio.</div>
                  </div>
                </div>

                {/* Stock */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Stock:</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
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
                      onClose(); // Cerrar el modal al cancelar
                    }}
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

export default ProductRegister;
