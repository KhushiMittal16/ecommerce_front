import { isAuthenticated } from "../auth";

//jwt token in getItem should be equal to the jwt token of addItem as the only person who added the item to cart should see that product in cart
export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log("auth token", isAuthenticated().token);
    cart.push({
      ...item,
      count: 1,
    });

    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const ItemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      console.log("auth token", isAuthenticated().token);
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return 0;
};

export const updateItem = (productId, count) => {
  //let cart = [];
  let cartItems;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      // console.log(JSON.parse(localStorage.getItem("cart")));
      cartItems = JSON.parse(localStorage.getItem("cart"));
      // console.log(cartItems);
    }
    cartItems.map((p, i) => {
      if (p._id === productId) {
        cartItems[i].count = count;
      }
      // return JSON.stringify(cartItems);
    });
    // console.log(JSON.parse(cartItems));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
};

export const removeItem = (productId) => {
  let cartItems;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cartItems = JSON.parse(localStorage.getItem("cart"));
    }
    // console.log(cartItems);
    cartItems.map((p, i) => {
      if (p._id === productId) {
        cartItems.splice(i, 1);
      }
      // return;
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  return cartItems;
};

export const emptyCart = (next) => {
  // let cart = [];
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
  // cart.map((p, i) => {
  //   if (p._id === productId) {
  //     cart.splice(i,1);
  //   }
  // });
  // localStorage.setItem("cart", JSON.stringify(cart));
};

// return cart
