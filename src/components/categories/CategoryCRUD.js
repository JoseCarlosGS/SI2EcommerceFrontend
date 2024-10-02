import React, { useEffect, useState } from 'react';
import CategoryRegister from './CategoryRegister'; // Componente para registrar/editar categorías
import ReactPaginate from 'react-paginate';
import { getCategories, deleteCategory } from '../../services/categoryService'; // Asegúrate de que la ruta sea correcta
import './CategoryCRUD.css'; // Estilos

function CategoryCRUD() {
  const [categories, setCategories] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null); // Para manejar la edición
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriesPerPage, setCategoriesPerPage] = useState(5); // Cambia este valor según tus necesidades

  const toggleRegisterForm = () => {
    setShowRegister(!showRegister);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setCurrentCategory(category); // Establece la categoría a editar
    setShowRegister(true); // Muestra el formulario
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      // Actualiza la lista de categorías después de eliminar
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error('Error eliminando la categoría:', error);
    }
  };

  // Calcular la cantidad total de páginas
  const pageCount = Math.ceil(categories.length / categoriesPerPage);

  // Función para manejar el cambio de página
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Obtener las categorías de la página actual
  const displayedCategories = categories.slice(
    currentPage * categoriesPerPage,
    (currentPage + 1) * categoriesPerPage
  );

  return (
    <div className="category-crud-container">
      <h2>Gestionar Categorías</h2>

      {/* Botón para agregar una nueva categoría */}
      <button onClick={toggleRegisterForm} className="add-category-btn">
        Agregar Nueva Categoría
        <i className="bi bi-plus-circle"></i>
      </button>

      {/* Mostrar el formulario de registro o la tabla de categorías */}
      {showRegister ? (
        <CategoryRegister
          onClose={toggleRegisterForm}
          category={currentCategory} // Pasa la categoría actual si se está editando
          onUpdate={(updatedCategory) => {
            setCategories(categories.map((category) => 
              category.id === updatedCategory.id ? updatedCategory : category
            ));
          }}
        />
      ) : (
        <>
          <div className="select-categories-per-page">
            <label htmlFor="categoriesPerPage">Mostrar:</label>
            <select
              id="categoriesPerPage"
              onChange={(e) => setCategoriesPerPage(Number(e.target.value))}
              value={categoriesPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <table className="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th> {/* Atributo "name" de la categoría */}
                <th>Descripción</th>
                <th>Subcategorías</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {displayedCategories.length > 0 ? (
                displayedCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td> {/* Mostrar el atributo "name" */}
                    <td>{category.description}</td>
                    <td>
                      {/* Mapeo de las subcategorías para mostrar sus nombres */}
                      {category.subCategories && category.subCategories.length > 0 ? (
                        category.subCategories.map((subCategory) => subCategory.name).join(', ')
                      ) : (
                        'No hay subcategorías'
                      )}
                    </td>
                    <td>
                        <div className="button-container">
                        <button
                            className="edit-btn"
                            onClick={() => handleEditCategory(category)}
                          >
                          <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                           <i className="bi bi-trash"></i>
                          </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay categorías disponibles.</td>
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

export default CategoryCRUD;