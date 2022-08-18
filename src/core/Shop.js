import React, { useEffect, useState } from "react";
import { getProducts, getCategories } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";
import { getFilteredProducts } from "./apiCore";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilterResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilterResults(skip, limit, myFilters.filters);
  }, []);

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilterResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and find books of Your Choice"
      >
        <div className="row">
          <div className="col-4">
            <h3>Filter By Categories</h3>
            <br />
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
            <h3>Filter By Price Range</h3>
            <br />
            <div>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </div>
          <div className="col-8">
            {/* {JSON.stringify(filteredResults)} */}
            <h2 className="mb-4">Products</h2>
            <div className="row">
              {filteredResults?.map((product, i) => {
                return (
                  <div key={i} className="col-4 mb-3">
                    <Card product={product} />
                  </div>
                );
              })}
              <hr />
              {loadMoreButton()}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
