import React, { useEffect, useState } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { isAuthenticated } from "../auth";
import { emptyCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    loading: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId) => {
    getBraintreeClientToken(userId).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return (
      products &&
      products.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0)
    );
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link className="btn btn-primary" to="/signin">
        Sign in
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = async () => {
    setData({ loading: true });
    // let  = data.instance
    //send nonce to server
    // let paymentMethod = await data.instance.requestPaymentMethod();
    // console.log(paymentMethod);
    let getNonce = await data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        let nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        // console.log(paymentData)
        // console.log(paymentData.paymentMethodNonce);
        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            setData({ ...data, success: response.success });
            const createOrderData = {
              products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };
            createOrder(userId, token, createOrderData);
            emptyCart(() => {
              console.log("payment success");
              setData({ loading: false, success: true });
            });
          })
          .catch((err) => {
            console.log(err);
            setData({ loading: false });
          });
      })
      .catch((err) => {
        // console.log("dropin error:", err);
        setData({ ...data, error: err.message });
      });
  };

  const showError = (error) => {
    // console.log("show error: ", error);
    return (
      <>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </>
    );
  };

  const showSuccess = (success) => {
    // console.log("show error: ", error);
    return (
      <>
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          Your payment is Successful. Thank You for shopping!!!
        </div>
      </>
    );
  };

  const showLoading = (loading) => {
    // console.log("show error: ", error);
    return (
      <>
        <div
          className="alert alert-warning"
          style={{ display: loading ? "" : "none" }}
        >
          loading...
        </div>
      </>
    );
  };

  const handleAddress = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label className="text-muted">Delivery address</label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here..."
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={buy} className="btn btn-success btn-block">
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      {showLoading(data.loading)}
      {data.error && showError(data.error)}
      {data.success && showSuccess(data.success)}
      <h2>Total:${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
