import React, { Fragment, useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  return (
    <Fragment>
      {prices.map((p, i) => {
        {/* console.log(p.array); */}
        return (
          <div key={i}>
            <input
              onChange={handleChange}
              name={p}
              value={`${p._id}`}
              type="radio"
              className="mr-2 ml-6"
            />
            <label className="form-check-label">{p.name}</label>
          </div>
        );
      })}
    </Fragment>
  );
};

export default RadioBox;
