"use client";
import React, { useEffect, useState } from "react";
import "./createProfession.css";
import LinkProfession from "@/app/components/linkProfession/LinkProfession";
import { toast } from "sonner";

const page = () => {
  const [linkClicked, setLinkClicked] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [responseStatus, setResponseStatus] = useState({});
  
  const linkClickedOrNot = () => {
    setLinkClicked(true);
    setTimeout(()=>{
      setLinkClicked(false);
    },1000)
  };
  
  const [input, setInput] = useState({
    name: "",
    city: "",
  });
  
  const getInput = async (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value.toLowerCase(),
    });
  };

  
  const handleStatus = (status) => {
    setResponseStatus(status);
  };

  useEffect(() => {
    console.log("responseStatus.msg : ", responseStatus.msg);
    // if(responseStatus.code == 0) toast.warn(responseStatus.msg);
    console.log("responseStatus.code", responseStatus.code);
  }, [responseStatus]);

  const validate = (values) => {
    const errors = {};
    // const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!values.name) {
      errors.name = "Profession name is required.";
    }
    //  else if (values.phone.length != 10) {
    //   errors.phone = "Phone Number must be of 10 digits.";
    // }
    if (!values.city) {
      errors.city = "City name is required.";
    }
    return errors;
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(input));
    setIsSubmit(true);

    if ((input.name || input.city) == "") {
      return apiResponse;
    }
    const api = await fetch(
      "http://localhost:3001/api/authProfession/createProfession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );
    const result = await api.json();
    console.log("The Result of the api ", result);
    setApiResponse(result);
  };

  return (
    <div className="createProfession_container">
      <div className="login-box">
        <h2>Create A Profession</h2>
        <form action="" className="createProfession" onSubmit={submit}>
          <div className="user-box">
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={getInput}
              id=""
            />
            <label>Enter Name:</label>
          <p className="formErrors">{formErrors.name}</p>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="city"
              value={input.city}
              onChange={getInput}
              id=""
            />
            <label>Enter City:</label>
          <p className="formErrors">{formErrors.city}</p>
          </div>
          <button type="submit" className="createProfession_btn">
            <span className="button_top"> Create</span>
          </button>
        </form>
      </div>
      <div className="apiResponse">
        <div className="apiResponse_msg">{apiResponse.msg}</div>
        <div>
          {apiResponse.success == "true" ? (
            <>
              <div className="want_to_click_link" onClick={linkClickedOrNot}>
                Click To Link With This Profession.
              </div>
              <div>
                {linkClicked && (
                  <LinkProfession params={input} onResponse={handleStatus} />
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
