"use client";
import React, { useEffect, useState } from "react";
import "./myProfile.css";
import "./EditDetails.css";
import CookieValue from "@/app/components/cookieValue/CookieValue";
import { toast } from "sonner";

const Page = () => {
  const [cookieValue, setCookieValue] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [resFromDetailsSaved, setResFromDetailsSaved] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    username: "",
    fullname: "",
    phone: 0,
    profession: "",
    city: "",
    email: "",
    address: "",
    isProvider: null,
  });
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  let [checkDetailsSaved, setCheckDetailsSaved] = useState(0);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setCheckDetailsSaved(++checkDetailsSaved);
  };
  const handleCookieValue = (value) => {
    setCookieValue(value);
  };
  const jwtVerify = async () => {
    const response = await fetch("http://localhost:3001/api/auth/jwtVerify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      const getDetails = async () => {
        const api = await fetch(
          "http://localhost:3001/api/auth/getUserDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const userData = await api.json();
        setUserDetails(userData.user);
      };
      getDetails();
    });
  };

  const getInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEditedDetails({
      ...editedDetails,
      [name]: value,
    });
  };

  // convert image file to base64
  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  // receive file from form
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/createImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDetails, image: imageBase64 }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };

  useEffect(() => {
    if (checkDetailsSaved === 1) {
      setEditedDetails({
        ...editedDetails,
        username: userDetails.username,
        fullname: userDetails.fullname,
        phone: userDetails.phone,
        profession: userDetails.profession,
        city: userDetails.city,
        email: userDetails.email,
        address: userDetails.address,
        isProvider: userDetails.isProvider,
      });
    } else if (checkDetailsSaved === 2) {
      console.log(editedDetails);
      const response = async () => {
        const api = await fetch(
          "http://localhost:3001/api/auth/editUserDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedDetails),
          }
        );
        const apiRes = await api.json();
        setResFromDetailsSaved(apiRes);
        console.log("API Response ", apiRes);
      };
      response();

      if (image) {
        const getImageApi = async () => {
          const response = await fetch(
            "http://localhost:3001/api/auth/createImage",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userDetails, image: imageBase64 }),
            }
          );
        };
        getImageApi();
      }
      toast.info("Loading...Please wait");
      setCheckDetailsSaved(0);
    }
  }, [checkDetailsSaved]);

  useEffect(() => {
    if (resFromDetailsSaved!=null) {
      setTimeout(() => {
          toast.success(resFromDetailsSaved.msg);
          window.location.href = "/routes/myProfile";
        }, 2000);
    }
  }, [resFromDetailsSaved])
  

  useEffect(() => {
    console.log("Value 0f checkDetailsSaved ", checkDetailsSaved);
  }, [checkDetailsSaved]);

  useEffect(() => {
    if (userDetails && userDetails.image && userDetails.image.url) {
      console.log("userDetails : ", userDetails);
      setProfileImg(userDetails.image.url);
    }
  }, [userDetails]);
  
  useEffect(() => {
    if (cookieValue !== null) {
      console.log("Cookie Value in Profile : ", cookieValue);
      jwtVerify();
    }
  }, [cookieValue]);

  return userDetails != null ? (
    <div className="myProfile_body">
      <div className="myProfile_container">
        <div className="profile_user_img">
          <div
            className={`user-avatar ${
              checkDetailsSaved === 0 ? "with-margin" : ""
            }`}
          >
            {checkDetailsSaved === 1 ? (
              <label id="edit_image_svg" htmlFor="image">
                <svg
                  className="feather feather-edit"
                  fill="none"
                  height="27"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="27"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </label>
            ) : (
              <></>
            )}

            <img src={profileImg} alt="Loading..." />
            <form onSubmit={handleSubmit} action="" method="post">
              <input
                name="image"
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Image"
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImage}
                style={{ display: "none" }}
              />
            </form>
          </div>
          <div className="user_deatils_view">
            {image ? (
              <div className="ifImageSeleected">
                <h6>Image Selected!</h6>
              </div>
            ) : (
              <></>
            )}
            <div className="username_phone">
              <h5 className="user-name">{userDetails.username}</h5>
              <h6 className="user-phone">
                <strong>Phone :</strong> {userDetails.phone}
              </h6>
            </div>
            <div>
              <h5 className="user-profession">
                {" "}
                <strong>Profession :</strong> {userDetails.profession}
              </h5>
              <h6 className="user-city">
                <strong>City :</strong> {userDetails.city}
              </h6>
            </div>
          </div>
        </div>

        <div className="profile_user_details">
          {!editMode ? (
            <>
              <button className="btn" onClick={toggleEditMode}>
                <span className="icon">
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </span>
                <span className="edit_button_text">Edit</span>
              </button>
            </>
          ) : (
            <button className="btn" id="saveBtn" onClick={toggleEditMode}>
              <span className="icon">
                {/* <svg
                  height="18px"
                  version="1.1"
                  viewBox="0 0 18 18"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title />
                  <desc />
                  <defs />
                  <g
                    fill="none"
                    fillRule="evenodd"
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                  >
                    <g
                      fill="#000000"
                      id="Core"
                      transform="translate(-255.000000, -381.000000)"
                    >
                      <g
                        id="save"
                        transform="translate(255.000000, 381.000000)"
                      >
                        <path
                          d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,4 L14,0 L14,0 Z M9,16 C7.3,16 6,14.7 6,13 C6,11.3 7.3,10 9,10 C10.7,10 12,11.3 12,13 C12,14.7 10.7,16 9,16 L9,16 Z M12,6 L2,6 L2,2 L12,2 L12,6 L12,6 Z"
                          id="Shape"
                        />
                      </g>
                    </g>
                  </g>
                </svg> */}
                <svg
                  className="feather feather-save"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              </span>
              <span className="edit_button_text">Save</span>
            </button>
          )}

          <form action="#">
            <div className="form-row">
              <div className="coolinput">
                <label htmlFor="input" className="text">
                  Username:
                </label>
                <input
                  type="text"
                  placeholder={userDetails.username}
                  name="username"
                  className="input"
                  {...(checkDetailsSaved === 0
                    ? { readOnly: true, id: "grayed-out" }
                    : { value: editedDetails.username, onChange: getInput })}
                />
              </div>
              <div className="coolinput">
                <label htmlFor="input" className="text">
                  Fullname:
                </label>
                <input
                  type="text"
                  placeholder={userDetails.fullname}
                  name="fullname"
                  className="input"
                  {...(checkDetailsSaved !== 1
                    ? { readOnly: true, id: "grayed-out" }
                    : { value: editedDetails.fullname, onChange: getInput })}
                />
              </div>
            </div>
            {userDetails.isProvider ? (
              <div className="form-row">
                <div className="coolinput">
                  <label htmlFor="input" className="text">
                    Profession:
                  </label>
                  <input
                    type="text"
                    placeholder={userDetails.profession}
                    name="profession"
                    className="input"
                    {...(checkDetailsSaved !== 1
                      ? { readOnly: true, id: "grayed-out" }
                      : {
                          value: editedDetails.profession,
                          onChange: getInput,
                        })}
                  />
                </div>
                <div className="coolinput">
                  <label htmlFor="input" className="text">
                    City:
                  </label>
                  <input
                    type="text"
                    placeholder={userDetails.city}
                    name="city"
                    className="input"
                    {...(checkDetailsSaved !== 1
                      ? { readOnly: true, id: "grayed-out" }
                      : { value: editedDetails.city, onChange: getInput })}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="form-row">
              <div className="coolinput">
                <label htmlFor="input" className="text">
                  Phone Number:
                </label>
                <input
                  type="text"
                  placeholder={userDetails.phone}
                  name="phone"
                  className="input"
                  {...(checkDetailsSaved !== 1
                    ? { readOnly: true, id: "grayed-out" }
                    : { value: editedDetails.phone, onChange: getInput })}
                />
              </div>
              <div className="coolinput">
                <label htmlFor="input" className="text">
                  E-Mail:
                </label>
                <input
                  type="text"
                  placeholder={userDetails.email}
                  name="email"
                  className="input"
                  {...(checkDetailsSaved !== 1
                    ? { readOnly: true, id: "grayed-out" }
                    : { value: editedDetails.email, onChange: getInput })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="coolinput" id="address_input">
                <label htmlFor="input" className="text">
                  Address:
                </label>
                <textarea
                  rows="8"
                  cols="80"
                  type="text"
                  placeholder={userDetails.address}
                  name="address"
                  className="address_input"
                  {...(checkDetailsSaved !== 1
                    ? { readOnly: true, id: "grayed-out" }
                    : { value: editedDetails.address, onChange: getInput })}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="loading_svg_div">
      <CookieValue CookieValueProp={handleCookieValue} />
      <svg viewBox="25 25 50 50" className="loading_svg">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Page;
