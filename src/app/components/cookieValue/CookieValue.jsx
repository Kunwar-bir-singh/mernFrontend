    'use client'
    import React, { useEffect, useState } from 'react'

    const CookieValue = ({CookieValueProp}) => {
        const [jwtCookie , setJwtCookie] = useState(null);
        const cookieResult = ()=>{
            const cookies = document.cookie;
            const cookiesArray = cookies.split(';');
            cookiesArray.forEach((cookie)=>{
                const [name , value] = cookie.trim().split("=");
                if(name == 'token'){
                    setJwtCookie(value);
                    return;
                }
                // CookieValueProp(jwtCookie);
            })
        }
        useEffect(()=>{
            cookieResult();
        },[])
        
        useEffect(() => {
            if (jwtCookie !== null) {
              CookieValueProp(jwtCookie);
            }
          }, [jwtCookie, CookieValueProp]);

    return (
            null
    )
    }

    export default CookieValue