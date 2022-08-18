import React, { useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import { useState } from "react";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });
  const { name, email, password, error, success } = values;
  const { token } = isAuthenticated();
  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value }); 
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, {name, email, password}).then((data) => {
      // console.log(data.name)
      if (data.error) {
        console.log(data.error);
      } else { 
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
    // console.log(values)
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const profileUpdate = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" onChange={handleChange("name")} value={name} />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" onChange={handleChange("email")} value={email} />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="text"
            onChange={handleChange("password")}
            value={password}
          />
        </div>
        <button className="btn btn-primary" onClick={(e) => clickSubmit(e)}>
          Submit
        </button>
      </form>
    );
  };

  return (
    <Layout
      title="Update Profile"
      description={`Have a good day ${name} !!!`}
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      {/* {JSON.stringify(values)} */}
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
