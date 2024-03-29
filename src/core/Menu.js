import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { ItemTotal } from "./cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fff" };
  } else {
    return { color: "#ff99" };
  }
};

const Menu = ({ history }) => {
  //console.log("user", isAuthenticated() && isAuthenticated().user);
  return (
    <>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(history, "/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/shop"
            style={isActive(history, "/shop")}
          >
            Shop
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link
            className="nav-link"
            to="/cart"
            style={isActive(history, "/cart")}
          >
            Cart
            <sup>
              <small >{itemTotal}</small>
            </sup>
          </Link>
        </li> */}

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/cart"
            style={isActive(history, "/cart")}
          >
            Cart
            {isAuthenticated() && (
              <sup
                className="cart-badge"
                style={{
                  backgroundColor: "black",
                  borderRadius: "100%",
                  padding: "2px",
                  fontSize: "12px",
                  fontStyle: "italic",
                }}
              >
                <small>
                  <ItemTotal />
                </small>
              </sup>
            )}
          </Link>
        </li>
        {isAuthenticated()
          ? isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/user/dashboard"
                  style={isActive(history, "/user/dashboard")}
                >
                  Dashboard
                </Link>
              </li>
            )
          : ""}
        {isAuthenticated()
          ? isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/dashboard"
                  style={isActive(history, "/admin/dashboard")}
                >
                  Dashboard
                </Link>
              </li>
            )
          : ""}

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                Signup
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() ? (
          <>
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
                style={{ cursor: "pointer", color: "#ff99" }}
              >
                SignOut
              </span>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      {/* {console.log(isAuthenticated())} */}
    </>
  );
};

export default withRouter(Menu);
