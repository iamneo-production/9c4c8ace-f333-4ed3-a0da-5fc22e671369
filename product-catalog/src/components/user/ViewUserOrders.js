import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../navbars/UserNavbar';
function ViewUserOrders() {
  const [currentUser, setCurrentUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(storedUser);

    fetchOrders(storedUser.id);
  }, []);

  const fetchOrders = (actorId) => {
    axios.get(`/orders`)
      .then(response => {
        const userOrders = response.data.filter(order => order.actorId === actorId);
        setOrders(userOrders);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <UserNavbar/>
      <div className="container">
      <h3 className="text-center mt-3">Order History for {currentUser.username}</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-3">
            <thead className="thead-light">
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                {/* Add more table headers for additional order details */}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>${order.total}</td>
                  {/* Add more table cells for additional order details */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    
  );
}

export default ViewUserOrders;
