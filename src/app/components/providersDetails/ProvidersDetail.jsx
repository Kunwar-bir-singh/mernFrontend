import React, { useEffect } from "react";

const ProvidersDetail = ({ params, onResult }) => {
  const results = async () => {
    try {
      let queryString = `name=${params.name[0]
        .toLowerCase()
        .trim()}&city=${params.name[1].toLowerCase().trim()}`;
      const api = await fetch(
        `http://localhost:3001/api/authProfession/getProviders?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await api.json();
      onResult(response.providers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      results();
},[])
  return null;
};

export default ProvidersDetail;
