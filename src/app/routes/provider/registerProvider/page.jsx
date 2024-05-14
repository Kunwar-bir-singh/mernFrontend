"use client";
import React, { useState } from "react";
import "./register.css";
import OtherDetails from "./OtherDetails";


const page = () => {
  const [halfDetailCheck, setHalfDetailCheck] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
    phone: "",
    profession: "",
    city: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
     setFormErrors(validate(input));
    setHalfDetailCheck(true);
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!values.phone) {
      errors.phone = "Phone Number is required.";
    }
     else if (values.phone.length != 10) {
      errors.phone = "Phone Number must be of 10 digits.";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    if (!values.username) {
      errors.username = "Username is required.";
    }else if (values.username.length < 3) {
      errors.username = "Username must be atleast 3 characters long.";
    }
    return errors;
  };
  return (
    <>
    {Object.keys(formErrors).length === 0 && halfDetailCheck ?(<div>
        <OtherDetails firstHalfInput={input} /> 
    </div>) : (  <div className="user_form_container">
        <form onSubmit={submitHandler}>
          <h3>Register Here</h3>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            onChange={inputHandler}
            name="username"
            value={input.username}
          />
<p className="formErrors">{formErrors.username}</p>
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            placeholder="Phone"
            id="phone"
            onChange={inputHandler}
            name="phone"
            value={input.phone}
          />
          <p className="formErrors">{formErrors.phone}</p>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={inputHandler}
            name="password"
            value={input.password}
          />
<p className="formErrors">{formErrors.password}</p>
          <button>Next</button>
          {/* <div className="social">
          <div className="go">
          <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div> */}
        </form>
      </div>) }
    </>
  );
};

export default page;
