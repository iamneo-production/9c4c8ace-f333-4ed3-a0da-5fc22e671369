import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ViewCategoryItem = ({ categoryId }) => {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  const fetchData = () => {
    axios.get(`/products?category=${categoryId}`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const deleteItemHandler = (itemId) => {
    axios.delete(`/products/${itemId}`)
      .then(response => {
        setItems(items.filter(item => item.id !== itemId));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const startEditing = (itemId, itemName, itemPrice) => {
    setEditingItemId(itemId);
    setEditedName(itemName);
    setEditedPrice(itemPrice);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setEditedName('');
    setEditedPrice('');
  };

  const saveItem = (itemId) => {
    const updatedData = {
      name: editedName,
      price: parseFloat(editedPrice),
      category: categoryId, // Set the category ID
    };

    axios.put(`/products/${itemId}`, updatedData)
      .then(response => {
        setItems(items.map(item => (item.id === itemId ? response.data : item)));
        cancelEditing();
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Items in Category</h3>
      {items.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={e => setEditedName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={e => setEditedPrice(e.target.value)}
                    />
                  ) : (
                    `$${item.price}`
                  )}
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <>
                      <button
                        className='btn btn-success btn-sm me-2'
                        onClick={() => saveItem(item.id)}
                      >
                        Save
                      </button>
                      <button
                        className='btn btn-secondary btn-sm'
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className='btn btn-outline-danger btn-sm me-2'
                        onClick={() => deleteItemHandler(item.id)}
                      >
                        <DeleteIcon /> Delete
                      </button>
                      <button
                        className='btn btn-outline-primary btn-sm'
                        onClick={() => startEditing(item.id, item.name, item.price)}
                      >
                        <EditIcon /> Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items available in this category.</p>
      )}
    </div>
  );
}

export default ViewCategoryItem;
