import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getAllProducts().then((data) => {
      // console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
    // console.log(products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const destroy = (productId) => {
    console.log(productId);
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  const totalProducts = (products) => {
    if (products.length) {
      return <>Total products: {products.length}</>;
    } else
      return (
        <div style={{ color: "red" }}>
          No products Found!!!
          <br />
          <Link to={`/create/product`}>Continue adding new products</Link>
        </div>
      );
  };

  return (
    <Layout title="Manage Products" description={`Perform CRUD on products`}>
      <h2 className="mb-4">Manage Products</h2>
      {/* {JSON.stringify(values)} */}
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">{totalProducts(products)}</h2>
          <ul className="list-group-item">
            {/* {products && JSON.stringify(products)} */}
            {products &&
              products.map((p, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <strong>{p.name}</strong>
                    <Link to={`/update/product/${p._id}`}>
                      <span className="badge bg-warning badge-pill">
                        Update
                      </span>
                    </Link>
                    <span
                      onClick={() => destroy(p._id)}
                      className="badge badge-pill bg-danger"
                      style={{ border: "none" }}
                    >
                      Delete
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
