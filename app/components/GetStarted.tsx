"use client";
import React, { useEffect } from "react";
import Button from "./Button";
import vector from "@/app/imgs/gray.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const GetStarted = () => {
  const navigate = useRouter();
  const register = () => {
    navigate.push("/register");
  };
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/register");
  }, [navigate]);
  return (
    <>
      <div className="relative flex flex-col sm:flex-row items-center space-y-4 sm:justify-between border-[1px] border-grey-200 p-5 bg-white rounded-xl w-[90%]  sm:w-[80%] mx-auto my-6 overflow-hidden">
        <div className="hidden sm:flex absolute mt-[9em] w-full left-0 -ml-28">
          {/* <Image src={vector} className="" alt="" />
        <Image src={vector} className="" alt="" /> */}
          <Image src={vector} className="w-full" alt="" />
          <Image src={vector} className="" alt="" />
          <Image src={vector} className="w-full ml-32" alt="" />
        </div>
        <aside className="w-full sm:w-[80%] relative z-20">
          <h2 className="text-2xl font-bold mb-3">Get Started Now</h2>
          <p className="w-full sm:w-3/4 text-[#272727]">
            Join us today to access real-time data and analytics, ensuring
            transparency and accountability in the electoral process.
          </p>
        </aside>
        <aside className="w-full sm:w-[20%]">
          <Button
            label="join now"
            styles=" text-[#fff] bg-[#2550C0] font-medium"
            onClick={() => register()}
          />
        </aside>
      </div>
    </>
  );
};
