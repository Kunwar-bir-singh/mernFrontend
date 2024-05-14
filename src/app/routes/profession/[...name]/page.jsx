"use client";
import ProvidersDetail from "@/app/components/providersDetails/ProvidersDetail";
import "./page.css";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [providers, setProviders] = useState([]);
  const handleProviders = (providers) => {
    setProviders(providers);
  };
  console.log(providers);
  return (
    <div>
      <ProvidersDetail params={params} onResult={handleProviders} />
      {providers.length == 0 ? (
        <div className="loading_svg_div">
          <svg viewBox="25 25 50 50" className="loading_svg">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      ) : (
        <>
          <h1 className="provider_title">
            {providers.length} Providers Found!{" "}
          </h1>
          <div className="container">
            {providers.map((item, index) => (
              <>
                <div className="box" key={index}>
                  <div className="provider_image">
                    <img src={item.image.url} alt="Provider Image" srcSet="" />
                  </div>
                  <div className="provider_details">
                    <h5>Username : {item.username}</h5>
                    <h5>Fullname : {item.fullname}</h5>
                    <h6>Profession : {item.profession}</h6>
                    <h6>Phone : {item.phone}</h6>
                    <h6>Address : {item.address}</h6>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
