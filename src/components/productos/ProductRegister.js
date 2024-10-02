import { useEffect, useState } from 'react';
import { createProduct, updateProduct, assignCategoriesToProduct } from '../../services/productService'; 
import { getCategories } from '../../services/categoryService';
import { getCategoriesToProduct } from '../../services/productService'; // Asegúrate de que este servicio esté importado
import './ProductRegister.css';

const ProductRegister = ({ onClose, product }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    size: '',
    stock: '',
    selectedCategories: {},
    selectedSubcategories: {}
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Error: La data no es un array', data);
        }
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductCategories = async () => {
      if (product && product.id) {
        try {
          const categoriesData = await getCategoriesToProduct(product.id);
          const selectedCategories = categoriesData.reduce((acc, cat) => {
            acc[cat.id] = true; // Asumimos que cat.id es el identificador de la categoría
            return acc;
          }, {});
          setFormData({
            ...product,
            selectedCategories,
            selectedSubcategories: {} // Asignar subcategorías si es necesario
          });
        } catch (error) {
          console.error('Error al obtener categorías para el producto:', error);
        }
      } else {
        setFormData({
          name: '',
          brand: '',
          description: '',
          price: '',
          size: '',
          stock: '',
          selectedCategories: {},
          selectedSubcategories: {}
        });
      }
    };

    fetchProductCategories();
  }, [product]);

  const handleCategoryChange = (categoryId) => {
    setFormData({
      ...formData,
      selectedCategories: {
        ...formData.selectedCategories,
        [categoryId]: !formData.selectedCategories[categoryId],
      }
    });
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setFormData({
      ...formData,
      selectedSubcategories: {
        ...formData.selectedSubcategories,
        [subcategoryId]: !formData.selectedSubcategories[subcategoryId],
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedCategoryIds = Object.keys(formData.selectedCategories).filter(key => formData.selectedCategories[key]);
    const selectedSubcategoryIds = Object.keys(formData.selectedSubcategories).filter(key => formData.selectedSubcategories[key]);

    try {
      if (product && product.id) {
        await updateProduct(product.id, {
          id: formData.id,
          name: formData.name,
          brand: formData.brand,
          description: formData.description,
          price: formData.price,
          size: formData.size,
          stock: formData.stock,
          categories: selectedCategoryIds // Asumiendo que se pasan solo las categorías seleccionadas
        });
      } else {
        const newProduct = await createProduct({
          name: formData.name,
          brand: formData.brand,
          description: formData.description,
          price: formData.price,
          size: formData.size,
          stock: formData.stock
        });
        await assignCategoriesToProduct(newProduct.id, selectedCategoryIds); // Solo asignar categorías seleccionadas
      }
      onClose();
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
              {error && <p className="alert alert-danger">{error}</p>}
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                {/* Nombre del Producto */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Nombre del Producto:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="name"
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

                {/* Categorías */}
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Categorías:</label>
                  <div className="col-sm-9">
                    {categories && categories.length > 0 && categories.map(category => (
                      <div key={category.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={!!formData.selectedCategories[category.id]}
                            onChange={() => handleCategoryChange(category.id)}
                          />
                          {category.name}
                        </label>

                        {/* Subcategorías */}
                        {formData.selectedCategories[category.id] && Array.isArray(category.subcategories) && category.subcategories.length > 0 && (
                          <div className="ms-3">
                            {category.subcategories.map(subcategory => (
                              <label key={subcategory.id}>
                                <input
                                  type="checkbox"
                                  checked={!!formData.selectedSubcategories[subcategory.id]}
                                  onChange={() => handleSubcategoryChange(subcategory.id)}
                                />
                                {subcategory.name}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  {product ? 'Actualizar Producto' : 'Registrar Producto'}
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegister;


