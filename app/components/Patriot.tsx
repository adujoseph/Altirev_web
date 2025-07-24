'use client'
import React from "react";
import { Upcoming } from "./Upcoming";
import PastLive from "./PastLive";
import useElection from "../hooks/useElection";

interface PatriotProps {
  category: string;
  setCategory: (e: string) => void;
  handleModal: () => void;
  setView: (e?: number) => void;
}

export default function Patriot({
  category,
  setCategory,
  handleModal,
  setView,
}: PatriotProps) {

  const { pastElection } = useElection();
  const data = [
    ["Parties", "No of Votes"],
    ["APC", 11],
    ["PDP", 2],
    ["LP", 2],
    ["Others", 2],
  ];

  const options = {
    title: "",
  };
  const bar = 66;
  return (
    <>
      <section className="my-10">
        <div className="flex items-center justify-center sm:justify-start">
          <div
            onClick={() => setCategory("past")}
            className={
              category === "past"
                ? "font-semibold text-[#101720] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#101720] sm:w-[120px]"
                : "text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-center text-sm border-b-2 border-[#CBCBCB] w-[120px]"
            }
          >
            <p className="text-sm sm:text-base">Past Election </p>
          </div>
          <div
            onClick={() => setCategory("live")}
            className={
              category === "live"
                ? "font-semibold text-[#101720] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#101720] sm:w-[120px]"
                : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[120px]"
            }
          >
            <p>
              {category === "live" && (
                <p className="size-2 rounded-full bg-[#2550C0] animate-ping" />
              )}
            </p>
            <p className="text-sm sm:text-base">Live Event</p>
          </div>
          <div
            onClick={() => setCategory("upcoming")}
            className={
              category === "upcoming"
                ? "font-semibold text-[#101720] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#101720] "
                : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] "
            }
          >
            <p className="text-sm sm:text-base w-full flex">
              Upcoming <p className="hidden sm:flex">Event</p>{" "}
            </p>
          </div>
        </div>
        {category === "upcoming" && (
          <Upcoming
            data={pastElection?.data?.upcoming}
          />
        )}
        {category === "past" && (
          <PastLive
            data={pastElection?.data?.previous}
            bar={bar}
            loading={pastElection?.isLoading}
            setView={setView}
            handleModal={handleModal}
          />
        )}
        {category === "live" && (
          <PastLive
            data={pastElection?.data?.ongoing}
            loading={pastElection?.isLoading}
            bar={bar}
            setView={setView}
            handleModal={handleModal}
          />
        )}
      </section>
    </>
  );
}
