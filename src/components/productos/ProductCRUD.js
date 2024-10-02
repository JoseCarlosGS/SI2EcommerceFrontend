import React, { useEffect, useState } from 'react';
import ProductRegister from './ProductRegister'; // Asegúrate de que la ruta sea correcta
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { getProducts, deleteProduct, getCategoriesToProduct } from '../../services/productService'; // Asegúrate de que la ruta sea correcta
import './ProductCRUD.css'
import ProductImages from './ProductImages';

function ProductCRUD() {
  const [products, setProducts] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Para manejar la edición
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(5); // Cambia este valor según tus necesidades
  const [categoriesMap, setCategoriesMap] = useState({});
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const toggleRegisterForm = () => {
    setShowRegister(!showRegister);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);

      await fetchCategoriesForProducts(data);
    };
    fetchProducts();
  }, []);

  const fetchCategoriesForProducts = async (fetchedProducts) => {
    const map = {};
    for (const product of fetchedProducts) {
        try {
            const categories = await getCategoriesToProduct(product.id);
            map[product.id] = categories; // Almacena las categorías en el mapa
        } catch (error) {
            console.error(`Error fetching categories for product ${product.id}:`, error);
            map[product.id] = []; // Si hay un error, asignar un arreglo vacío
        }
    }
    setCategoriesMap(map);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product); // Establece el producto a editar
    setShowRegister(true); // Muestra el formulario
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      // Actualiza la lista de productos después de eliminar
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error eliminando el producto:', error);
    }
  };

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calcular la cantidad total de páginas
  const pageCount = Math.ceil(products.length / productsPerPage);

  // Función para manejar el cambio de página
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Obtener los productos de la página actual
  const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  return (
    <div className="product-crud-container">
      <h2>Gestionar Productos</h2>

      {/* Botón para agregar un nuevo producto */}
      <button onClick={toggleRegisterForm} className="add-product-btn">
        Agregar Nuevo Producto
        <i className="bi bi-plus-circle"></i>
      </button>

      {/* Mostrar el formulario de registro o la tabla de productos */}
      {showRegister ? (
        <ProductRegister
          onClose={toggleRegisterForm}
          product={currentProduct} // Pasa el producto actual si se está editando
          onUpdate={(updatedProduct) => {
            setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
          }}
        />
      ) : (
        <>
          <div className="select-products-per-page">
            <label htmlFor="productsPerPage">Mostrar:</label>
            <select
              id="productsPerPage"
              onChange={(e) => setProductsPerPage(Number(e.target.value))}
              value={productsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th> {/* Nuevo atributo "name" */}
                <th>Marca</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Talla</th>
                <th>Stock</th>
                <th>Categorias</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td> {/* Mostrar el nuevo atributo "name" */}
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.size}</td>
                    <td>{product.stock}</td>
                    <td>
                          {/* Muestra las categorías obtenidas del servicio */}
                          {categoriesMap[product.id] && categoriesMap[product.id].length > 0 ? (
                                categoriesMap[product.id].map((category) => category.name).join(', ')
                          ) : (
                                'No hay categorías'
                          )}
                    </td>

                    <td>
                      <div className="button-container">
                        <button className="edit-btn" onClick={() => handleEditProduct(product)}>
                          <i className="bi bi-pencil-square"></i> {/* Icono de edición */}
                        </button>
                        <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                          <i className="bi bi-trash"></i> {/* Icono de eliminar */}
                        </button>
                        <button className="gallery-btn" onClick={() => openModal(product.id)}>
                          <i className="bi bi-images"></i> {/* Icono de galería */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No hay productos disponibles.</td>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Images Modal"
        style={modalStyles}
      >
        <h2>Galeria de imagenes</h2>
        <ProductImages productId={selectedProductId} />
        <button className='modal-btn' onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
}

// Estilos del modal
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
  },
  
};

export default ProductCRUD;
