import React, { useEffect, useState } from 'react';
import ProductRegister from './ProductRegister'; // Asegúrate de que la ruta sea correcta
import ReactPaginate from 'react-paginate';
import { getProducts, deleteProduct } from '../../services/productService'; // Asegúrate de que la ruta sea correcta
import './ProductCRUD.css'

function ProductCRUD() {
  const [products, setProducts] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Para manejar la edición
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(5); // Cambia este valor según tus necesidades

  const toggleRegisterForm = () => {
    setShowRegister(!showRegister);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
                      <button className="edit-btn" onClick={() => handleEditProduct(product)}>
                        Editar
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                        Eliminar
                      </button>
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
    </div>
  );
}

export default ProductCRUD;
