"use server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookie = request.cookies.get("token");
  if (!cookie) {
    const allowedPaths = [
      "/",
      "/routes/choose",
      "/routes/user/loginUser",
      "/routes/user/registerUser",
      "/routes/provider/loginProvider",
      "/routes/provider/registerProvider",
    ];
    if (!allowedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect("http://localhost:3000/"); // Redirect to the home page
    }
  } else {
    console.log("Middleware cookie : ", cookie.value);
    const response = await fetch("http://localhost:3001/api/auth/jwtVerify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.value}`,
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.error && data.error.name === "TokenExpiredError") {
      console.log("Cookie has expired.");
      return NextResponse.redirect("http://localhost:3000/routes/logout");
    }
    if (!data.valid) {
      return NextResponse.redirect("http://localhost:3000/routes/choose");
    }

    const decoded = data.decoded;

    const responseHeader = new NextResponse(NextResponse.next());
    response.headers.set('Decoded-JWT', JSON.stringify(decoded));

    console.log(decoded);
    if (decoded.isProvider) {
      if (request.nextUrl.pathname === "/routes/createProfession") {
        return NextResponse.next();
      }
    } else {
      // If the user is not a service provider, deny access to createProfession route
      if (request.nextUrl.pathname === "/routes/createProfession") {
        return NextResponse.redirect("http://localhost:3000/routes/choose"); // Redirect to an unauthorized page
      }
    }

    // Allow access to the myProfile route for all logged-in users
    if (request.nextUrl.pathname === "/routes/myProfile" || request.nextUrl.pathname === "/pages/myProfile") {
      return NextResponse.next();
    }

    // Deny access to the login route if the user is already logged in
    if (
      request.nextUrl.pathname === "/routes/choose" ||
      request.nextUrl.pathname === "/routes/user/loginUser" ||
      request.nextUrl.pathname === "/routes/user/registerUser" ||
      request.nextUrl.pathname === "/routes/provider/loginProvider" ||
      request.nextUrl.pathname === "/routes/provider/registerProvider"
    ) {
      return NextResponse.redirect("http://localhost:3000/"); // Redirect to the home page or any other appropriate page
    }
  }

  // Allow access to other routes
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/routes/createProfession",
    "/routes/myProfile",
    "/routes/choose",
    "/routes/provider/loginProvider",
    "/routes/provider/registePprovider",
    "/routes/user/loginUser",
    "/routes/user/registerUser",
  ],
};
