"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";

export default function page() {
  const [view, setView] = useState(0);
  return (
    <>
      <Header />
      <div className="mx-auto p-5 sm:p-10">
        <h2 className="text-center font-bold text-4xl my-5">
          {" "}
          Request to delete account
        </h2>
        <form className="flex flex-col space-y-4 items-center justify-center w-full sm:w-1/2 mx-auto">
          <Input type="text" label="Username:" value=""  />
          <Button
            loading={false}
            label="Delete Account"
            styles="bg-red-600 w-full"
          />
        </form>
      </div>
      <Footer />
    </>
  );
}