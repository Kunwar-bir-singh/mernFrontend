  'use client'
  import { useRouter } from "next/navigation";
  import React, { useEffect } from "react";
  const Logout = () => {
    const router = useRouter();
    const handleClick = async () => {
      try {
        const reponse = await fetch("http://localhost:3001/api/auth/clearCookies", {
          credentials: "include",
        });  
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      handleClick();
    }, []);
    return (
      null
    );
  };

  export default Logout;
