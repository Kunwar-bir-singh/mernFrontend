import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./mainContent.scss";
import Response from "./response/Response";
import { toast } from "sonner";

const MainContent = () => {
  const [res, setRes] = useState(null);
  const [cookieValue, setCookievalue] = useState("");

  const search = async () => {
    try {
      let queryString = `name=${input.name
        .toLowerCase()
        .trim()}&city=${input.city.toLowerCase().trim()}`;
      const api = await fetch(
        `http://localhost:3001/api/authProfession/getProfession?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieValue}`,
          },
        }
      );
      const response = await api.json();
      setRes(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [res]);
  useEffect(() => {
    const cookie = document.cookie.slice(6);
    setCookievalue(cookie);
  }, []);

  const [input, setInput] = useState({
    name: "",
    city: "",
  });

  const getInput = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <>
      <div className="content_container">
        <div className="card">
          <label className="input">
            <input
              className="input__field mb-5"
              type="text"
              name="name"
              onChange={getInput}
              value={input.name}
              id=""
              placeholder=" "
            />
            <span className="input__label">Profession</span>
          </label>
          <label className="input">
            <input
              className="input__field"
              type="text"
              name="city"
              onChange={getInput}
              value={input.city}
              id=""
              placeholder=" "
            />
            <span className="input__label">City</span>
          </label>
          <div className="button-group">
            <button className="searchBtn" onClick={search}>
              {" "}
              Search
            </button>
            <button
            className="searchBtn"
            id="resetBtn"
              type="reset"
              onClick={() => {
                setInput({
                  name: "",
                  city: "",
                });
                toast("Input Cleared");
              }}
            >
               {" "}
              Reset
            </button>
          </div>
        </div>
        <Response inputData={input} res={res} />
      </div>
    </>
  );
};

export default MainContent;
