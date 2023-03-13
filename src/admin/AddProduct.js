// import React, { useEffect, useState } from "react";
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
// import { createProduct } from "./apiAdmin";
// import { getCategories } from "../core/apiCore";
// import Resizer from "react-image-file-resizer";
// import axios from "axios";
// //uploadProductImage
// const AddProduct = () => {
//   const [values, setValues] = useState({
//     name: "",
//     description: "",
//     price: "",
//     categories: [],
//     category: "",
//     quantity: "",
//     photo: [],
//     shipping: "",
//     loading: false,
//     error: "",
//     createdProduct: "",
//     redirectToProfile: "",
//     formData: "",
//   });
//   const [image, setImage] = useState([]);
//   // const [values, setValues] = useState({
//   //   name: "",
//   //   description: "",
//   //   price: "",
//   //   categories: [],
//   //   category: "",
//   //   quantity: "",
//   //   photo:[

//   //   ],
//   //   shipping: "",
//   //   loading: false,
//   //   error: "",
//   //   createdProduct: "",
//   //   redirectToProfile: "",
//   //   formData: "",
//   // });

//   const { user, token } = isAuthenticated();
//   // const {
//   //   name,
//   //   description,
//   //   price,
//   //   categories,
//   //   quantity,
//   //   loading,
//   //   error,
//   //   createdProduct,
//   //   formData,
//   // } = values;
//   const {
//     name,
//     description,
//     price,
//     categories,
//     quantity,
//     loading,
//     error,
//     createdProduct,
//   } = values;

//   // const init = () => {
//   //   getCategories().then((data) => {
//   //     if (data.error) {
//   //       setValues({ ...values, error: data.error });
//   //     } else {
//   //       setValues({ ...values, categories: data, formData: new FormData() });
//   //     }
//   //   });
//   // };

//   const init = () => {
//     getCategories().then((data) => {
//       if (data.error) {
//         setValues({ ...values, error: data.error });
//       } else {
//         setValues({ ...values, categories: data });
//       }
//     });
//   };

//   useEffect(() => {
//     init();
//   }, []);

//   const handleChange = (name) => (e) => {
//     const value = name === "photo" ? e.target.files[0] : e.target.value;
//     formData.set(name, value);
//     setValues({ ...values, [name]: value });
//     // setValues(value );
//   };

//   const clickSubmit = (e) => {
//     e.preventDefault();
//     setValues({ ...values, error: "", loading: true });
//     console.log("submit clicked");
//     // createProduct(user._id, token, formData)
//     console.log(values);
//     createProduct(user._id, token,values)
//     .then((data) => {
//       if (data.error) {
//           setValues({ ...values, error: data.error, loading: false });
//         } else {
//           setValues({
//             ...values,
//             name: "",
//             description: "",
//             photo: image,
//             category: "",
//             price: "",
//             quantity: "",
//             loading: false,
//             createdProduct: data.name,
//           });
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   // const clickSubmit = (e) => {
//   //   e.preventDefault();
//   //   setValues({ ...values, error: "", loading: true });
//   //   console.log("submit clicked");
//   //   createProduct(user._id, token, formData)
//   //     .then((data) => {
//   //       if (data.error) {
//   //         setValues({ ...values, error: data.error, loading: false });
//   //       } else {
//   //         setValues({
//   //           ...values,
//   //           name: "",
//   //           description: "",
//   //           photo: image,
//   //           category: "",
//   //           price: "",
//   //           quantity: "",
//   //           loading: false,
//   //           createdProduct: data.name,
//   //         });
//   //       }
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   // const clickSubmit = (e) => {
//   //   e.preventDefault();
//   //   setValues({ ...values, error: "", loading: true });
//   //   createProduct(user._id, token, formData)
//   //     .then((data) => {
//   //       if (data.error) {
//   //         setValues({ ...values, error: data.error, loading: false });
//   //       } else {
//   //         console.log(data);
//   //         setValues({
//   //           ...values,
//   //           name: "",
//   //           description: "",
//   //           photo: [
//   //             {
//   //               imageUrl: data.data.secure_url,
//   //               publicId: data.data.public_id,
//   //             },
//   //           ],
//   //           price: "",
//   //           quantity: "",
//   //           loading: false,
//   //           createdProduct: data.name,
//   //         });
//   //       }
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   const uploadImage = (e) => {
//     let files = e.target.files;
//     if (files) {
//       for (let i = 0; i < files.length; i++) {
//         Resizer.imageFileResizer(
//           files[i],
//           600,
//           600,
//           "JPEG",
//           100,
//           0,
//           async (uri) =>
//             await axios
//               .post("http://localhost:8080/api/uploadimage", {
//                 urls: uri,
//                 fName: "uploadimg",
//               })
//               .then((res) => {
//                 console.log(res.data);
//                 // image: [
//                 //   {
//                 //     imageUrl: res.data.secure_url,
//                 //     publicId: res.data.public_id,
//                 //   },
//                 // ],
//                 setImage([
//                   {
//                     imageUrl: res.data.secureUrl,
//                     publicId: res.data.public_id,
//                   },
//                 ]);
//               })
//         );
//       }
//     }
//   };

//   const newPostForm = () => {
//     // return (
//     //   <form className="mb-3" onSubmit={clickSubmit}>
//     //     {/* {console.log(token)} */}
//     //     <div className="uploadPhoto">
//     //       <label className="btn btn-primary btn-raised mt-3">
//     //         UPLOAD IMAGE
//     //         <input
//     //           type="file"
//     //           hidden
//     //           accept="images/*"
//     //           onChange={uploadImage}
//     //         />
//     //       </label>
//     //     </div>
//     //     <div className="form-group">
//     //       <label>Name</label>
//     //       <input
//     //         type="text"
//     //         className="form-control"
//     //         value={name}
//     //         onChange={handleChange("name")}
//     //       />
//     //     </div>
//     //     <div className="form-group">
//     //       <label>Description</label>
//     //       <input
//     //         type="text"
//     //         className="form-control"
//     //         onChange={handleChange("description")}
//     //         value={description}
//     //       />
//     //     </div>
//     //     <div className="form-group">
//     //       <label>Price</label>
//     //       <input
//     //         type="number"
//     //         className="form-control"
//     //         onChange={handleChange("price")}
//     //         value={price}
//     //       />
//     //     </div>
//     //     <div className="form-group">
//     //       <label>Category</label>
//     //       {/* <input type="file" value={category} /> */}
//     //       <select className="form-control" onChange={handleChange("category")}>
//     //         <option>Please select the category</option>
//     //         {categories.map((c, i) => (
//     //           <option key={i} value={c._id}>
//     //             {c.name}
//     //           </option>
//     //         ))}
//     //       </select>
//     //     </div>
//     //     <div className="form-group">
//     //       <label>Shipping</label>
//     //       {/* <input type="file" value={category} /> */}
//     //       <select className="form-control" onChange={handleChange("shipping")}>
//     //         <option>Please select</option>
//     //         <option value="0">No</option>
//     //         <option value="1">Yes</option>
//     //       </select>
//     //     </div>
//     //     <div className="form-group">
//     //       <label>Quantity</label>
//     //       <input
//     //         type="number"
//     //         className="form-control"
//     //         onChange={handleChange("quantity")}
//     //         value={quantity}
//     //       />
//     //     </div>
//     //     <button className="btn btn-outline-primary">Create Product</button>
//     //   </form>
//     // );
//     return (
//       <>
//         <div>
//           <div className="uploadPhoto">
//             <label className="btn btn-primary btn-raised mt-3">
//               UPLOAD IMAGE
//               <input
//                 type="file"
//                 hidden
//                 accept="images/*"
//                 onChange={uploadImage}
//               />
//             </label>
//           </div>
//           <label>Name</label>
//           <input type="text" value={name} onChange={handleChange("name")} />
//         </div>
//         <div>
//           <label>Description</label>
//           <input
//             type="text"
//             value={description}
//             onChange={handleChange("description")}
//           />
//         </div>
//         <div>
//           <label>Price</label>
//           <input type="number" value={price} onChange={handleChange("price")} />
//         </div>
//         <div>
//           <label>Category</label>
//           <select onChange={handleChange("category")}>
//             <option>Please select the Category</option>
//             {categories.map((c, i) => (
//               <option key={i} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Shipping</label>
//           <select onChange={handleChange("shipping")}>
//             <option>Please select</option>
//             <option value="0">No</option>
//             <option value="1">Yes</option>
//           </select>
//         </div>
//         <div>
//           <label>Quantity</label>
//           <input
//             type="number"
//             onChange={handleChange("quantity")}
//             value={quantity}
//           />
//         </div>
//         <button onClick={clickSubmit}>Submit</button>
//       </>
//     );
//   };

//   const showError = () => {
//     return (
//       <div
//         className="alert alert-danger"
//         style={{ display: error ? "" : "none" }}
//       >
//         {error}
//       </div>
//     );
//   };

//   const showSuccess = () => {
//     return (
//       <div
//         className="alert alert-info"
//         style={{ display: createdProduct ? "" : "none" }}
//       >{`${createdProduct} is created successfully.`}</div>
//     );
//   };

//   const showLoading = () => {
//     return (
//       loading && (
//         <div className="alert alert-success">
//           <h2>Loading...</h2>
//         </div>
//       )
//     );
//   };
//   return (
//     <Layout
//       title="Add a new Product"
//       description={`Have a good day ${user.name} !!! Ready to add a new Product???`}
//     >
//       <div className="row">
//         <div className="col-md-8 offset-md-2">
//           {showLoading()}
//           {showError()}
//           {showSuccess()}
//           {newPostForm()}
//         </div>
//       </div>
//       {/* {JSON.stringify(values)} */}
//     </Layout>
//   );
// };

// export default AddProduct;

import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct } from "./apiAdmin";
import { getCategories } from "../core/apiCore";
import Resizer from "react-image-file-resizer";
import axios from "axios";
//uploadProductImage
const AddProduct = () => {
  // const [imageVal, setImageVal] = useState([]);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    photo: {
      imageUrl: "",
      publicId: "",
    },
    shipping: "",
    loading: false,
    error: "",
    createdProduct: "",
  });
  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    photo,
    categories,
    category,
    quantity,
    loading,
    error,
    createdProduct,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const dataValue = e.target.value;
    setValues({ ...values, [name]: dataValue });
    console.log("name:", name, "\nvalue:", dataValue);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log("submit clicked");
    console.log(values);
    // createProduct(user._id, token, {
    //   name,
    //   description,
    //   price,
    //   photo,
    //   category,
    //   quantity,
    // })

    // async (user._id, token, values)=> await axios.post
    console.log(values);
    createProduct(user._id, token, values)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            category: "",
            price: "",
            quantity: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = (e) => {
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          600,
          600,
          "JPEG",
          100,
          0,
          async (uri) =>
            await axios
              .post("http://localhost:8080/api/uploadimage", {
                urls: uri,
                fName: "uploadimg",
              })
              .then((res) => {
                console.log("res: ", res.data);
                console.log(values);
                setValues({
                  ...values,
                  photo: {
                    imageUrl: res.data.secure_url,
                    publicId: res.data.public_id,
                  },
                });
                console.log("after upload: ", values.photo);
              })
          // })
          // .then((data) => {
          // console.log("data: ", data);
          // setImageVal([
          //   {
          //     imageUrl: data.secure_url,
          //     publicId: data.public_id,
          //   },
          // ]);
          // setImage(res.data.secure_url);
          // console.log("image: ", imageVal);
          // setValues({ ...values, photo: image });
          // })
        );
      }
    }
  };

  const newPostForm = () => {
    return (
      <>
        <div>
          <div className="uploadPhoto">
            <label className="btn btn-primary btn-raised mt-3">
              UPLOAD IMAGE
              <input
                type="file"
                hidden
                accept="images/*"
                onChange={uploadImage}
              />
            </label>
          </div>
          {/* {JSON.stringify(values)} */}
          <label>Name</label>
          <input type="text" value={name} onChange={handleChange("name")} />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={handleChange("price")} />
        </div>
        <div>
          <label>Category</label>
          <select onChange={handleChange("category")}>
            <option>Please select the Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Shipping</label>
          <select onChange={handleChange("shipping")}>
            <option>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            onChange={handleChange("quantity")}
            value={quantity}
          />
        </div>
        <button onClick={clickSubmit}>Submit</button>
      </>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: createdProduct ? "" : "none" }}
      >{`${createdProduct} is created successfully.`}</div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  return (
    <Layout
      title="Add a new Product"
      description={`Have a good day ${user.name} !!! Ready to add a new Product???`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default AddProduct;
