"use client";
import React, { useState, useEffect } from "react";
import "./login.css";
import { toast } from "sonner";

const page = () => {
  const [input, setInput] = useState({
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    setFormErrors(validate(input));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!values.phone) {
      errors.phone = "Phone Number is required.";
    }
    //  else if (values.phone.length != 10) {
    //   errors.phone = "Phone Number must be of 10 digits.";
    // }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Submitted");
      const api = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/authProvider/loginProvider",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            }
          );
          const jsonResponse = await response.json();
          if (jsonResponse.code === 1) {
            console.log("User Login Successfull", jsonResponse);
            toast.success("Login Successfull!");
            setInput({
              phone: "",
              password: "",
            });
            // setTimeout(() => {
            //   window.location.href = "/";
            // }, 500);
          } 
          else if (jsonResponse.code === 0) {
            console.log("Invalid Credentails.");
            toast.warning("Invalid Credentails.");
          } else {
            toast.error("Some Error Has Occured.");
            console.log("Some Error Has Occured.");
          }
        } catch (error) {
          console.log(error);
        }
      };
      api();
    }
  }, [formErrors]);

  return (
    <>
      <div className="user_form_container">
        <form onSubmit={submitHandler}>
          <h3>Login Provider</h3>
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
          <p className="formErrors">{formErrors.phone}</p>
          <button className="login_provider_btn">Log In</button>
          <div className="social">
            <div className="go">
              <i className="fab fa-google"></i> Google
            </div>
            <div className="fb">
              <i className="fab fa-facebook"></i> Facebook
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
