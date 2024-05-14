"use client";
import React, { useEffect, useState } from "react";
import "./register.css";
import { toast } from "sonner";
const page = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    setIsSubmit(true)
    setFormErrors(validate(input));
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!values.phone) {
      errors.phone = "Phone Number is required.";
    } else if (values.phone.length != 10) {
      errors.phone = "Phone Number must be of 10 digits.";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    if (!values.username) {
      errors.username = "Username is required.";
    } else if (values.username.length < 3) {
      errors.username = "Username must be atleast 3 characters long.";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Submitted");
      const api = async () => {
        try {
          const data = await fetch(
            "http://localhost:3001/api/auth/registerUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            }
          );
          const res = await data.json();
          console.log(res);
          if (res.code === 1) {
            toast.success("User Registered Successfull!");
            console.log("User Registered Successfull");
            setTimeout(() => {
              window.location.href = "http://localhost:3000/routes/user/loginUser";
            }, 500);
            setInput({
              phone: "",
              password: "",
            });
          } else if (res.code === 0) {
            toast.warning("User Already Exists!");
            console.log("User Already Exists!");
          } else {
            toast.error("Some Error Has Occured!");
            console.log("Some Error Has Occured!");
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

          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={inputHandler}
            name="email"
            value={input.email}
          />
          <p className="formErrors">{formErrors.email}</p>
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
          <button>Register</button>
          {/* <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div> */}
        </form>
      </div>
    </>
  );
};

export default page;
