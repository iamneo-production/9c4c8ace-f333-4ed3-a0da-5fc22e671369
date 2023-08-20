import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewUserCategoryItems({ categoryId }) {
  const [items, setItems] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCart();

  }, [categoryId]);

  const fetchCart = () => {
    axios.get(`/carts`)
      .then(response => {
        setCarts(response.data);
      })
      .catch(error => {
        console.error('Error fetching carts:', error);
      });
  };
  const fetchData = () => {
    axios.get(`/products?category=${categoryId}`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const [itemQuantities, setItemQuantities] = useState({});

  const updateQuantity = (itemId, quantity) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const addToCart = (itemId) => {

    const actorId = JSON.parse(localStorage.getItem('currentUser')).id;
    console.log(actorId);
    const quantity = itemQuantities[itemId] || 0; // Default to 0 if not set

    const cartIndex = carts.findIndex(cart => cart.actorId === actorId);
    console.log("cartIndex for user", cartIndex);
    if (cartIndex !== -1) {
      // Update existing cart
      const cartToUpdate = carts.find(cart => cart.actorId === actorId);
      if (!cartToUpdate) {
        console.error('No cart found for actorId:', actorId);
        return;
      }

      const updatedItems = [...cartToUpdate.items, { itemId, quantity }];

      const updatedCart = {
        ...cartToUpdate,
        items: updatedItems,
      };

      axios.put(`/carts/${cartToUpdate.id}`, updatedCart)
        .then(() => {
          console.log('Item added to cart');
        })
        .catch(error => {
          console.error('Error updating cart:', error);
        });
    }
    else {
      // Create new cart
      const newCart = {
        id: carts.length + 1,
        items: [
          {
            itemId,
            quantity,
          },
        ],
        actorId,
      };

      axios.post('/carts', newCart)
        .then(() => {
          console.log('Item added to cart');
        })
        .catch(error => {
          console.error('Error adding item to cart:', error);
        });
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <table className="table table-bordered table-hover mt-4 ">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => updateQuantity(item.id, (itemQuantities[item.id] || 0) - 1)}
                    className="btn btn-outline-danger"
                  >
                    -
                  </button>
                  {itemQuantities[item.id] || 0}
                  <button
                    onClick={() => updateQuantity(item.id, (itemQuantities[item.id] || 0) + 1)}
                    className="btn btn-outline-success"
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="btn btn-outline-primary"
                  >
                    Add To Cart
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

export default ViewUserCategoryItems;
