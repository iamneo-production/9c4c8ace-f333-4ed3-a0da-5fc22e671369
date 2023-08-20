import React, { useState } from 'react';

const ProductInput = ({ categories, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddProduct = () => {
    if (productName && productPrice && selectedCategory) {
      const newProduct = {
        id: Date.now(), // Generate a temporary ID
        name: productName,
        price: parseFloat(productPrice),
        category: parseInt(selectedCategory)
      };

      onAddProduct(newProduct); // Call the callback to add the new product

      // Clear the input fields
      setProductName('');
      setProductPrice('');
      setSelectedCategory('');
    }
  };

  return (
    <div className="container">
    <div className="border rounded p-4" style={{ maxWidth: "600px", margin: "0 auto", marginTop: "40px" }}>
      <div className="form-group mb-3">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="productPrice ">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          className="form-control"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          className="form-control"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleAddProduct}>Add Product</button>
    </div>
  </div>
  

  );
};

export default ProductInput;


