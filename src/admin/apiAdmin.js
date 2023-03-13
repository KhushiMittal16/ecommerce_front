import axios from "axios";
import { API } from "../config";

export const createCategory = (userId, token, category) => {
  // console.log(name, email, password);
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const createProduct = (userId, token, product) => {
//   // console.log(name, email, password);
//   return fetch(`${API}/product/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: product,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const createProduct = async (userId, token, product) => {
  console.log(product);
  var config = {
    method: "post",
    url: `${API}/product/create/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: product,
  };
  let response = await axios(config);
  // let response = await axios.post(
  //   `${API}/product/create/${userId}`,
  //   { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  //   { data: product }
  // );
  console.log("Here the data: ", response.data);
  return response.data;
  // return fetch(`${API}/product/create/${userId}`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(product),
  // })
  //   .then((response) => {
  //     console.log(product);
  //     return response.json();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
// export const uploadProductImage = (uri) => {
//   return fetch(`${API}/uploadimage`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: { urls: uri },
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log("image error: ", err));
// };

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  // if(typeof(window)!=="undefined"){
  //     return false
  // }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//CRUD on products
// get all the products
export const getAllProducts = () => {
  return fetch(`${API}/products?limit=100`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//get single product
export const getSingleProduct = (productId) => {
  console.log(productId);
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//delete a product
export const deleteProduct = (userId, token, productId) => {
  console.log(productId);
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProduct = (userId, token, productId, product) => {
  console.log(productId);
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
