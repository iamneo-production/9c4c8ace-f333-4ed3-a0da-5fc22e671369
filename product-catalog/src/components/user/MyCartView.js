import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../navbars/UserNavbar';
import OrderDetails from './OrderDetails';

function MyCartView() {
  const [currentUser, setCurrentUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);
  const [cartId, setCartId] = useState();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(storedUser);

    fetchCartItems(storedUser.id);
    fetchProducts();
  }, []);

  const fetchCartItems = (actorId) => {
    axios.get(`/carts`)
      .then(response => {
        const userCart = response.data.find(cart => cart.actorId === actorId);
        if (userCart) {
          setCartId(userCart.id);
          setCartItems(userCart.items);
        }
      })
      .catch(error => {
        console.error('Error fetching carts:', error);
      });
  };

  const fetchProducts = () => {
    axios.get(`/products`)
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      let total = 0;
      for (const cartItem of cartItems) {
        const product = products.find(prod => prod.id === cartItem.itemId);
        if (product) {
          total += cartItem.quantity * product.price;
        }
      }
      setTotalAmount(total);
    }
  }, [cartItems, products]);

  const handlePlaceOrder = () => {
    const userCart = cartItems.find(cart => cart.actorId === currentUser.id);
      const orderDetails = {
        orderId: new Date().getTime(),
        actorId: currentUser.id,
        cartId: cartId,
        total: totalAmount,
      };
      axios.post(`/orders`, orderDetails)
        .then(response => {
          console.log('Order placed:', response.data);
          setOrderDetails(orderDetails);
          axios.put(`/carts/${cartId}`, { items: [] })
            .then(() => {
              console.log('Cart items cleared');
            })
            .catch(error => {
              console.error('Error clearing cart items:', error);
            });
        })
        .catch(error => {
          console.error('Error placing order:', error);
        });
    
  };

  return (
    <div>
      <UserNavbar />
      <div className="container my-4">
        <h3 className="text-center">Cart Items for {currentUser.username}</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : cartItems.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(cartItem => {
                  const product = products.find(prod => prod.id === cartItem.itemId);
                  if (product) {
                    return (
                      <tr key={cartItem.itemId}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{cartItem.quantity}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            No cart items available !!
          </div>
        )}
      </div>
      {orderDetails && <OrderDetails order={orderDetails} />}
    </div>
  );
}

export default MyCartView;
