"use client";
import React from "react";
import {
  FacebookIcon,
  InstaIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../icons/Social";
import Image from "next/image";
import vector from "@/app/imgs/grey.png";
import { WhiteLogo } from "../icons/Logo";

export default function Footer() {
  const backToTop = () => window.scrollTo(0, 0);
  return (
    <div className="bg-[#181818] sm:h-[300px] text-white  !overflow-hidden relative z-10">
      <div className="flex items-center absolute justify-center mt-4 w-full">
        <Image src={vector} className="w-full -ml-20" alt="" />
        <Image src={vector} className="w-full mt-60" alt="" />
        <Image src={vector} className="w-full ml-40" alt="" />
      </div>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-around p-7">
        <aside className="flex flex-col space-y-1">
          <>
            <WhiteLogo />
          </>
          <p>An Election Monitoring Platform</p>
        </aside>
        <aside className="flex space-y-4 flex-col my-5 sm:my-0">
          <h2 className="text-xl font-semibold">Services</h2>
          <div className="flex space-y-4 flex-col">
            <p>Election Observation </p>
            <p>Election Support </p>
            <p> Election Report</p>
          </div>
        </aside>
        <aside className="flex space-y-4 flex-col">
          <h2 className="font-semibold text-2xl">Follow Us</h2>
          <div className="flex items-center space-x-4">
            <p className="size-10 flex items-center justify-center rounded bg-[#D9D9D9]">
              <LinkedinIcon />
            </p>
            <p className="size-10 flex items-center justify-center rounded bg-[#D9D9D9]">
              <FacebookIcon />
            </p>
            <p className="size-10 flex items-center justify-center rounded bg-[#D9D9D9]">
              <TwitterIcon />
            </p>
            <p className="size-10 flex items-center justify-center rounded bg-[#D9D9D9]">
              <InstaIcon />
            </p>
          </div>
          <p
            onClick={backToTop}
            className="rounded bg-white p-2 w-max text-[#225E72] cursor-pointer z-10"
          >
            Back to top
          </p>
        </aside>
      </div>

      <hr className="my-7" />
      <p className="text-center">All rights Reserved</p>
    </div>
  );
}
