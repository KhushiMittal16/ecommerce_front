import React, { useEffect, useState } from "react";
import { getCategories, list, categoryList } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "All",
    search: "",
    results: [],
    searched: false,
  });
  // const [optionAll, setOptionAll] = useState('All')
  const { categories, category, search, results, searched } = data;
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length === 0) {
      return `No products Found.`;
    }
  };

  const searchData = () => {
    if (category && search) {
      console.log(search, category);
      categoryList(category, search).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchAll = () => {
    if (search) {
      console.log(search);
      list(search).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    if (category === "All") {
      searchAll();
    } else {
      searchData();
    }
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">All Categories</option>
                {categories.map((c, i) => {
                  return (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search product"
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-append">Search</button>
          </div>
        </span>
      </form>
    );
  };
  return (
    <div>
      <div className="container mb-3">
        {searchForm()}
        {/* {JSON.stringify(results)} */}
      </div>
      <div className="container-fluid">
        {searchedProducts(results)}
        {/* {JSON.stringify(results)} */}
      </div>
    </div>
  );
};

export default Search;
