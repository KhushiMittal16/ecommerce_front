import React from "react";
import { listRelated, read } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";
import { useState } from "react";
import { useEffect } from "react";
const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(error);
      } else {
        setProduct(data);
        //fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    console.log(props.match.params.productId);
    loadSingleProduct(productId);
    // loadRelatedProducts(productId);
  }, [props]);

  return (
    <Layout
      title={product.name}
      description={
        product && product.description
      }
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
        <h4>Related Product</h4>
          {relatedProduct.map((p,i)=>{
            return(
              <div className="mb-3">
                <Card key={i} product={p}/>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
