import React, { useEffect, useState } from 'react'
import UserNavbar from '../../navbars/UserNavbar';
import axios from 'axios';
import ViewUserCategoryItems from './ViewUserCategoryItems';

function ViewUserCategories() {
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

  return (
    <div>
        <UserNavbar/>
        <div className="container mt-5">
        <h3 className='text-center'>All Categories</h3>
        {categories && categories.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>View Items</th>
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
              </tr>
            ))}
          </tbody>
        </table>
         ) : (
          <p>Loading categories...</p>
        )}
      </div>
      {selectedCategoryId && <ViewUserCategoryItems categoryId={selectedCategoryId} />}
    </div>
    
  )
}

export default ViewUserCategories