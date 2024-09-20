import Image from "next/image";
import React from "react";
import bg from "@/app/imgs/Hero.png";
import { AppStore, PlayStore } from "../icons/Toast";
export default function Banner() {
  return (
    <div className=" w-full h-[600px] relative z-2">
      <Image src={bg} className=" -z-10 object-cover h-full" fill alt="" />
      <section className="flex items-center justify-center">
        <div className="flex flex-col space-y-5 mx-auto items-center justify-center absolute top-1/4 text-white">
          <h1 className="text-center text-4xl sm:text-6xl font-bold">
            Welcome to ............ <br />
            Election Monitoring Platform
          </h1>
          <p className="text-center sm:w-3/4 sm:text-xl text-[#CDCDCD]">
            As a crucial part of democratic processes worldwide, election
            monitoring plays a pivotal role in ensuring fairness, transparency,
            and integrity in electoral systems.
          </p>
          <span className="flex items-center sm:space-y-0 sm:space-x-5 flex-col space-y-3 sm:flex-row">
            <AppStore />
            <PlayStore />
          </span>
        </div>
      </section>
    </div>
  );
}
