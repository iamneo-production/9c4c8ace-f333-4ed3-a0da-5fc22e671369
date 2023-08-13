import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../navbars/AdminNavbar';
import ViewCategoryItems from './ViewCategoryItems'; // Correct the filename here


const ViewAllCatagories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId,setSelectedCategoryId] = useState([]);

  useEffect(() => {
    axios.get('/categories') // we had a proxy in the package.json 
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const viewItemHandler=(categoryId)=>{
    setSelectedCategoryId(categoryId);
  }

  return (
    <div>
      <AdminNavbar/>
    <div className="container mt-5">
      <h3 className='text-center'>All Categories</h3>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>View Items</th>
            <th>Delete Catagery</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td><button
                    onClick={() => viewItemHandler(category.id)}
                    className="btn btn-primary"
                  >
                  View Items
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {selectedCategoryId && <ViewCategoryItems categoryId={selectedCategoryId} />}

    </div>
  );
}

export default ViewAllCatagories;
