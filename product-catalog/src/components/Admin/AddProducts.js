import React, { useEffect, useState } from 'react';
import ProductInput from './ProductInput';
import axios from 'axios';
import AdminNavbar from '../../navbars/AdminNavbar';

function AddProducts() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({}); // Initialize product as an empty object

  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(product).length > 0) {
      console.log('Product state updated:', product);
      // Make a POST request to add the product to the JSON
      axios.post('/products', product)
        .then(response => {
          console.log('Product added successfully:', response.data);
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    }
  }, [product]);

  const handleAddProduct = (newProduct) => {
    console.log("Inside the handle action.....");
    setProduct(newProduct);
  };

  return (
    <div>
        <AdminNavbar/>
      <h3 className='text-center'>Add Product</h3>
      <ProductInput categories={categories} onAddProduct={handleAddProduct} />
    </div>
  );
};

export default AddProducts;
