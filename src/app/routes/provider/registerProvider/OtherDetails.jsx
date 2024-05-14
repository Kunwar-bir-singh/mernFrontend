import React, { useEffect, useState } from "react";
import "./register.css";
import { toast } from "sonner";

const OtherDetails = ({ firstHalfInput }) => {
  const [input, setInput] = useState(firstHalfInput);

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
    setFormErrors(validate(input));
    setIsSubmit(true);

    console.log(input);
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!values.city) {
      errors.city = "City is required.";
    }
     else if (values.city.length < 3) {
      errors.city= "City must be atleast 3 characters long.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    }
    else if(!regex.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    if (!values.profession) {
      errors.profession = "Profession is required.";
    }
      else if (values.profession.length < 3) {
      errors.profession= "Profession must be  atleast 3 characters long.";
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
            "http://localhost:3001/api/authProvider/registerProvider",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            }
          );
          const res = await response.json();
          console.log(res);
          if (res.code === 1) {
            toast.success("Registration Successfull", {
              duration: 2000,
            });
            setTimeout(() => {
              window.location.href = "http://localhost:3000/routes/provider/loginProvider";

            },1500)
            console.log("Registration Successfull");
            setInput({
              profession: "",
              username: "",
              phone: "",
              password: "",
              city: "",
            });
          } else if (res.code === 0) {
            toast.error(" Provider Already Exists", {
              duration: 2000,
            });
            console.log("Provider Already Exists");
          }
        } catch (error) {
          toast.error("Something Went Wrong");
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
          <label htmlFor="username">Profession</label>
          <input
            type="text"
            placeholder="Profession Name"
            id="profession"
            onChange={inputHandler}
            name="profession"
            value={input.profession}
          />
          <p className="formErrors">{formErrors.profession}</p>

          <label htmlFor="username">City</label>
          <input
            type="text"
            placeholder="City"
            id="city"
            onChange={inputHandler}
            name="city"
            value={input.city}
          />
          <p className="formErrors">{formErrors.city}</p>

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

          <button>Register</button>
        </form>
      </div>
    </>
  );
};

export default OtherDetails;
