import React, { useState } from "react";
// import Checkbox from './Checkbox';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId,1);
    }
    setChecked(newCheckedCategoryId)
    // console.log(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  return (
    // <div>Checkbox</div>
    <>
      {categories.map((c, i) => {
        return (
          <li className="list-unstyled" key={i}>
            <input
              type="Checkbox"
              value={checked.indexOf(c._id === -1)}
              className="form-check-input"
              onChange={handleToggle(c._id)}
            />
            <label className="form-check-label">{c.name}</label>
          </li>
        );
      })}
    </>
  );
};

export default Checkbox;
