import React from "react";
import "./choose.css";
import Link from "next/link";

const page = () => {
    return (
    <div className="choose_container">
      <div className="login_div">
        <div className="login_register_contents">
          <h1>Join As A User</h1>
          <div  className="flex1">
         <Link href={"/routes/user/loginUser"}>
            <button>Login</button>
          </Link>
          <Link href={"/routes/user/registerUser"}>
            <button>Register</button>
          </Link>

          </div>
    
        </div>
      </div>
      <div className="register_div">
        <div className="login_register_contents">
          <h1>Join As A Provider</h1>
          <div className="flex1">
          <Link href={"/routes/provider/loginProvider"}>
            <button>Login</button>
          </Link>
          <Link href={"/routes/provider/registerProvider"}>
            <button>Register</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
