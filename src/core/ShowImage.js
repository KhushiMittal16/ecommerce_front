import React from "react";
import { API } from "../config";
import { imageShow } from "./apiCore";

const ShowImage = ({ item, url }) => {
  return (
    <div className="product_img">
      <img
        src={`data:image/png;base64,+${item.photo}+`}

        // src={`data:image/png;base64,${item.photo.data.toString('base64')}`}
        // src={imageShow(item._id)}
        // src={imageShow(item._id)}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );
};

export default ShowImage;
