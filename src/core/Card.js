import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddCartButton = true,
  showremoveProuctButton = false,
  cartUpdate = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const showViewButton = () => {
    if (showViewProductButton) {
      return (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      );
    }
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = () => {
    if (showAddCartButton) {
      return (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Cart
        </button>
      );
    }
  };

  const showRemoveButton = () => {
    if (showremoveProuctButton) { 
      return (
        <button
          className="btn btn-outline-danger mt-2 mb-2 mr-2"
          onClick={() => removeItem(product._id)}
        >
          Remove Product
        </button>
      );
    }
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span
        style={{
          backgroundColor: "#104ee0",
          padding: "5px 20px",
          borderRadius: "25em",
        }}
      >
        In Stock
      </span>
    ) : (
      <span
        style={{
          backgroundColor: "#e31e10",
          padding: "5px 20px",
          borderRadius: "25em",
        }}
      >
        Out of Stock
      </span>
    );
  };

  const handleChange = (productId) => (e) => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    console.log(count)
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };

  const showCartUpdateOption = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    // <div className="col-4 mb-3">
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="/product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p> 
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />
        {showViewButton()}
        {showAddToCartButton()}
        {showCartUpdateOption(cartUpdate)}
        {showRemoveButton()}
      </div>
    </div>
    // </div>
  );
};

export default Card;
