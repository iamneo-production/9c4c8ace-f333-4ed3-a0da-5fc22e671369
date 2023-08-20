import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../navbars/AdminNavbar';

const DeleteProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching Products:', error);
      });
  }, []); // Note: Dependency array should be empty to fetch products only once

  const deleteProductHandler = (id) => {
    axios.delete(`/products/${id}`) // Corrected URL with template literal
      .then(response => {
        console.log("Product with id deleted: " + id);
        console.log(response.data);

        // After successful deletion, update the products list
        setProducts(products.filter(prod => prod.id !== id));
      })
      .catch(error => {
        console.error('Error Deleting Product:', error);
      });
  }

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5">
        <h3 className='text-center'>All Products</h3>
        <table className="table table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Delete Product</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>
                  <button
                    onClick={() => deleteProductHandler(prod.id)}
                    className="btn btn-outline-danger" // Use btn-danger for delete action
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeleteProducts;
