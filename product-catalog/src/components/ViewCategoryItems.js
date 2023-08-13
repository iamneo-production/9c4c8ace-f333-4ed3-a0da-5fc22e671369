import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCategoryItem = ({ categoryId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/products?category=${categoryId}`)
      .then(response => {
        setItems(response.data);
        console.log(categoryId);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [categoryId]);

  return (
    <div className="container mt-5">
      <h3 className="text-center">Items in Category</h3>
      {items.length > 0 && (
      <table className="table table-bordered">
      
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
      
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default ViewCategoryItem;
