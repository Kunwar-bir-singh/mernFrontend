"use client";
import React, { useEffect, useState } from "react";
import CookieValue from "../cookieValue/CookieValue";
import { toast } from "sonner";

const LinkProfession = ({ params, onResponse }) => {

  const [cookieValue, setCookieValue] = useState(null);
  
  const handleCookieValue = (value) => {
    setCookieValue(value);
    console.log("Value Of Cookie : ", cookieValue);
  };

  const result = async () => {
    const api = await fetch(
      `http://localhost:3001/api/authProfession/editProfession/?city=${params.city}&name=${params.name}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieValue}`,
        },
      }
    );
    const response = await api.json();
    onResponse(response);
    if (response.code === 0) {
      toast.error("You are already linked!");
    } else if (response.code === 1) {
      toast.success("Successfully Linked");
    } else {
      toast.error("Some Error Has Occcured.");
    }
    console.log("Response : " , response);
  };

  useEffect(() => {
    if(cookieValue != null)
    result();
  }, [cookieValue]);

  return <CookieValue CookieValueProp={handleCookieValue} />;
};

export default LinkProfession;
