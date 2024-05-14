"use client";
import React from "react";
import "./globals.css";
import dynamic from "next/dynamic";


const MainContent = dynamic(
  () => import("./components/mainContent/MainContent"),
  { ssr: false }
);

const page = () => {
  return (
    <>
      <div>
        <MainContent />
      </div>
    </>
  );
};

export default page;
