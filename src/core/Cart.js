import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../admin/apiAdmin";
import Layout from "../core/Layout"; 
import Card from "./Card";  
import { getCart } from "./cartHelpers";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]); 

  useEffect(() => {
    setItems(getCart());
  }, []);

    const { user } = isAuthenticated();

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {items.length} items</h2>
        {items.map((p, i) => {
          return (
            <Card
              key={i}
              product={p}
              showAddCartButton={false}
              cartUpdate={true}
              showremoveProuctButton={true}
            />
          );
        })}
      </div>
    );
  };

  const noItemsMessage = () => {
    return <h2>
      Your cart is empty!!! <br />
      <Link to="/shop">Continue Shopping</Link>
    </h2>;
  };
  return (
    <Layout
      title="Shopping Cart"
      description={`Hey ${user.name}!!! Ready to buy items in your cart...`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
          {/* {items.length && showItems(items)} */}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr/>
          {/* <p>other info like option, total, etc.</p> */}
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
