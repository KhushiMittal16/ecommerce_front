import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();
  const loadOrders = () => {
    listOrders(user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else setOrders(data);
      })
      .catch((err) => console.log(err));
  };
  const loadStatusValues = () => {
    getStatusValues(user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else setStatusValues(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = (orders) => {
    return orders.length < 1 ? (
      <h2 className="text-danger display-2">No Orders</h2>
    ) : (
      <div className="text-danger display-2" style={{fontSize:"3.6em", fontWeight:"bold"}}>
        {orders.length} orders have been placed
      </div>
    );
  };

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input type="text" value={value} className="form-control" readOnly />
      </div>
    );
  };

  const handleStatusChange = (e, orderId) => {
    // console.log("update order status");
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => {
    return (
      <div className="form-group">
        <h3 className="mark mb-4">Status: {o.status}</h3>
        {/* {JSON.stringify(o)} */}
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o._id)}
        >
          <option>Update Status</option>
          {statusValues.map((statusVal, svIndex) => (
            <option
              key={svIndex}
              value={statusVal}
            >
              {statusVal}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <Layout
      title="orders"
      description={`Have a good day ${user.name} !!!You can manage all the orders here.`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">{o._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID:{o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: {o.amount}</li>
                  <li className="list-group-item">Ordered by: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {o.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in order:{o.products.length}
                </h3>
                {o.products.map((p, pIndex) => {
                  return (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{ padding: "20px", border: "1px solid indigo" }}
                    >
                      {showInput("Product name", p.name)}
                      {showInput("Product price", p.price)}
                      {showInput("total number of Product", p.count)}
                      {showInput("Product id", p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default Orders;
