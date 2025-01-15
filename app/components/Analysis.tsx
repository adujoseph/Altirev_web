"use client";
import React, { useState } from "react";
import CircularProgressBar from "./ProgressBar";
import { Accredited, Incident } from "../icons/Toast";
import PieChart from "./Chart";
import { BackArrow } from "../icons/Arrow";
import ModalCard from "./modal/Modal";
import { useStateContext } from "../context/context";
import { addThousandSeparator } from "../utils";

export default function Analysis({ setView, setOpenMenu, toggleFullscreen }: any) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow((prev) => !prev);
  const { electionData } = useStateContext();

  const back = () => {
    setView(1);
    setOpenMenu(true);
    toggleFullscreen();
  };
  return (
    <div className="px-0 sm:px-20">
      {show && (
        <ModalCard open={show} setOpen={handleShow}>
          <div className="sm:w-[400px]">
            <ShowIncident />
          </div>
        </ModalCard>
      )}
      <span
        onClick={back}
        className="flex my-4 cursor-pointer items-center space-x-1"
      >
        <>
          <BackArrow color="#272727" />
        </>
        <p className="font-semibold text-[#272727]">Back</p>
      </span>
      <h2 className="text-center font-semibold text-xl">
        {new Date(electionData?.date).getFullYear()} Gubernatorial Election
      </h2>
      <section className="w-full flex flex-col space-y-4 items-center sm:space-y-0 justify-center sm:justify-around sm:flex-row mt-10">
        <div className="">
          <CircularProgressBar
            percentage={
              (
                electionData?.totalInvalidVotes / electionData.totalVotesCasted
              )?.toFixed(2) * 100
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <span>
            <Incident />
          </span>
          <span
            onClick={handleShow}
            className="flex items-center text-red-500 font-semibold text-2xl ml-20 space-x-2 hover:underline cursor-pointer"
          >
            <p>0</p>
            <p>Incidents</p>
          </span>
        </div>
        <div className="">
          <PieChart electiondetails={electionData} />
        </div>
      </section>
      <section className="w-full flex flex-col space-y-2 p-5 sm:p-0 sm:justify-between sm:flex-row mt-20 sm:space-y-0">
        <div>
          <p className="text-xl text-[#272727]">Vote Casted</p>
          <h1 className="text-4xl font-semibold">
            {addThousandSeparator(electionData?.totalVotesCasted)}
          </h1>
        </div>
        <div>
          <p className="text-xl text-[#272727]">Accredited Voters</p>
          <span className="flex items-center">
            {Array(5)
              .fill("")
              .map((i) => (
                <Accredited />
              ))}
            {addThousandSeparator(electionData?.totalAccreditedVoters)}
          </span>
        </div>
      </section>
    </div>
  );
}

export const ShowIncident = () => (
  <div className="flex flex-col justify-center items-center space-y-5">
    <h2 className="text-center text-xl font-semibold">Incident Details</h2>
    <ol type="1" className="text-gray-500">
      <li> Hoodlums scattered 22 polling units</li>
      <li>Delayed voting at 4 polling units</li>
    </ol>
  </div>
);
