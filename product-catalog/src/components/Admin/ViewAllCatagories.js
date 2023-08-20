import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../navbars/AdminNavbar';
import ViewCategoryItems from './ViewCategoryItems';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
        console.log(response.data); // Assuming the API response structure
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const viewItemHandler = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  
  const deleteCatalogHandler = (categoryId) => {
    // Fetch the products associated with the category
    axios.get('/products')
      .then(response => {
        const productsToDelete = response.data.filter(product => product.category === categoryId);
        
        // Delete each product associated with the category
        const deleteProductPromises = productsToDelete.map(product =>
          axios.delete(`/products/${product.id}`)
        );
        
        // Delete the category after all products are deleted
        Promise.all(deleteProductPromises)
          .then(() => {
            axios.delete(`/categories/${categoryId}`)
              .then(() => {
                console.log(`Deleted category with ID: ${categoryId}`);
                // Filter out the deleted category from categories
                setCategories(categories.filter(category => category.id !== categoryId));
                setSelectedCategoryId(null); // Clear the selected category
              })
              .catch(error => {
                console.error('Error deleting category:', error);
              });
          })
          .catch(error => {
            console.error('Error deleting products:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };
  
  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5">
        <h3 className='text-center'>All Categories</h3>
        {categories && categories.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>View Items</th>
              <th>Delete Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => viewItemHandler(category.id)}
                    className="btn btn-outline-primary"
                  >
                    View Items
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteCatalogHandler(category.id)}
                    className='btn btn-outline-danger'
                  >
                   <DeleteIcon /> Delete Category
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         ) : (
          <p>Loading categories...</p>
        )}
      </div>
      {selectedCategoryId && <ViewCategoryItems categoryId={selectedCategoryId} />}
    </div>
  );
};

export default ViewAllCategories;
