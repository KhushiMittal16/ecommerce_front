import React, { useEffect, useState } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Layout from "./Layout";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts("createdAt")
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setProductsBySell(data);
        }
      })
      .catch((err) => {
        console.log(error);
      });
  };
  const loadProductByArrival = () => {
    getProducts("createdAt")
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setProductsByArrival(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
  }, []);

  return (
    <>
      <Layout title="Home Page" description="Welcome to Books For All. Hope we will be able to provide you a book more conveniently!!!">
        {/* <Card product={productsBySell}/> */}
        {/* <Card product={productsByArrival}/> */}
        <Search />
        <h2>Best Sellers</h2>
        <div className="row p-3">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
        <h2>New Arrivals</h2>
        <div className="row p-3">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
