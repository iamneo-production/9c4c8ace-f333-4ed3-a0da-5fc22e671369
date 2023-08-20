import React from 'react';

function OrderDetails({ order }) {
  return (
    <div className="container border rounded mt-3 p-3">
      <h3 className="text-center">Order Details</h3>
      <div className="row">
        <div className="col-md-6">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Actor ID:</strong> {order.actorId}</p>
          <p><strong>Cart ID:</strong> {order.cartId}</p>
        </div>
        <div className="col-md-6">
          <p><strong>Total Amount:</strong> ${order.total}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
