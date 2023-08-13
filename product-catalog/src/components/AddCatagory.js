import React, { useState } from 'react';
import AdminNavbar from '../navbars/AdminNavbar';

const AddCategory = ({ onClose, onCategoryAdd }) => {
  const [categoryName, setCategoryName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemDescChange = (event) => {
    setItemDesc(event.target.value);
  };
  const handleItemPriceChange = (event) => {
    setItemPrice(event.target.value);
  };
  const handleItemQuantityChange = (event) => {
    setItemQuantity(event.target.value);
  };
;

  const handleSubmit = (event) => {
    event.preventDefault();
    onCategoryAdd(categoryName);
    onClose();
  };

  return (
    <div className="popup">
      <AdminNavbar/>
      <h3 className='text-center'>Add Catagory</h3>
      <form className="container form-wrapper" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Category Name"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            placeholder="Item Name"
            value={itemName}
            onChange={handleItemNameChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="itemDesc">Item Description</label>
          <textarea
            className="form-control"
            id="itemDesc"
            placeholder="Description"
            value={itemDesc}
            onChange={handleItemDescChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="itemPrice">Item Price</label>
          <input
            type="number"
            className="form-control"
            id="itemPrice"
            placeholder="Item Price"
            value={itemPrice}
            onChange={handleItemPriceChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="itemQuantity">Item Quantity</label>
          <input
            type="number"
            className="form-control"
            id="itemQuantity"
            placeholder="Item Quantity"
            value={itemQuantity}
            onChange={handleItemQuantityChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>

  );
};

export default AddCategory;
