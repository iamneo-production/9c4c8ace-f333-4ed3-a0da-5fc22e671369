import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../navbars/AdminNavbar';



const DeleteCatagory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId,setSelectedCategoryId] = useState([]);
  const [products,setProducts]= useState([]);
  const [associatedProducts,setAssociatedProducts] = useState([]);

  useEffect(() => {
    axios.get('/categories') // we had a proxy in the package.json 
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

      axios.get('products')
      .then(response=>{
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching Products:', error);
      });
  }, []);

  const deleteCatagoryHandler=(categoryId)=>{
    setAssociatedProducts(products.filter(product => product.category === categoryId));
    axios.delete(`/categories?id=${categoryId}`)
    .then(response=>{
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error Deleting categories:', error);
      });
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
            <th>Delete Catagery</th>
            
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td><button
                    onClick={() => deleteCatagoryHandler(category.id)}
                    className="btn btn-primary"
                  >
                  Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* {selectedCategoryId && <ViewCategoryItems categoryId={selectedCategoryId} />} */}

    </div>
  );
}

export default DeleteCatagory;
