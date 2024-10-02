import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getProductImages, uploadProductImage } from '../../services/productService'; // Asegúrate de importar tu servicio
import './ProductImages.css'
import { Modal, Button } from 'react-bootstrap'; 

const ProductImages = ({ productId }) => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = await getProductImages(productId);
        setImages(imageUrls || []);
      } catch (error) {
        console.error('Error fetching product images:', error);
        setImages([]);
      }
    };
    fetchImages();
  }, [productId]);

  const handleAddImage = () => {
    setIsModalOpen(true);
    // Aquí puedes manejar la lógica de añadir una nueva imagen
    document.getElementById('file-input').click();
    console.log('Añadir nueva imagen');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      uploadImage(file); // Llama a la función para cargar la imagen
    }
  };

  const uploadImage = async (file) => {
    try {
      const imageUrl = await uploadProductImage(productId, file); // Llama a tu servicio para subir la imagen
      setImages((prevImages) => [...prevImages, imageUrl]); // Actualiza el estado con la nueva imagen
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="gallery-grid" >
      {images.map((imageUrl, index) => (
        <LazyLoadImage
          key={index}
          src={imageUrl}
          alt={`Product ${index}`}
          width="200"
          effect="blur"
          style={{ margin: '10px' }}
        />
      ))}
      <Button className="add-image-button" onClick={handleAddImage}>
        <i className="bi bi-plus-lg" style={{ fontSize: '2rem' }}></i>
      </Button>

      {/* Input invisible para seleccionar archivos */}
      <input 
        type="file" 
        id="file-input" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
    </div>
  );
};



export default ProductImages;
