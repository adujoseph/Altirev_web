"use client";
import React, { useState } from "react";
import PieChart from "./Chart";
import { ArrowView, BackArrow, EyeView, FilterView } from "../icons/Arrow";
import Link from "next/link";
import { ElectionCard } from "./ElectionList";

export default function PastLive({ setView, handleModal, bar }: any) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow((prev) => !prev);
  return (
    <>
      {show ? (
        <>
          <span
            onClick={handleShow}
            className="flex my-4 cursor-pointer items-center space-x-1 pl-5"
          >
            <>
              <BackArrow color="#272727" />
            </>
            <p className="font-semibold text-[#272727]">Back</p>
          </span>
          <div onClick={() => setView(2)} className="ml-auto flex w-max">
            <span className="flex items-center space-x-2 border-b-2 border-[#272727] w-max cursor-pointer">
              <p>view all</p>
              <ArrowView color="#272727" />
            </span>
          </div>
          <aside className="bg-white rounded-lg shadow p-4 my-8 w-full">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-xl">2024</p>
              <div className="flex items-center space-x-2">
                <p className="font-semibold sm:text-xl">
                  Edo Gubernatorial Election
                </p>
                <p
                  onClick={handleModal}
                  className="w-max border-[1px] border-[#CBCBCB] rounded flex items-center justify-center p-2 cursor-pointer"
                >
                  <FilterView />
                </p>
              </div>
            </div>
            <aside className="flex flex-col space-y-2  items-center sm:flex-row sm:justify-between w-full">
              <div className="w-full sm:w-2/3">
                {/* <ChartData type="PieChart" data={data} options={options} /> */}
                <PieChart />
              </div>
              <div className=" p-4 w-full sm:w-1/3">
                <h2 className="font-semibold text-xl">Accredited Voters:</h2>
                <p className="font-semibold text-[#656565]">0</p>
                <h2 className="font-semibold text-xl mt-4">Vote Casted:</h2>
                <p className="font-semibold text-[#656565]">0</p>

                <div className="my-4 flex flex-col">
                  <h2 className="font-semibold text-xl">Valid Vote</h2>
                  <span>
                    <progress className="progressBar" value={77} max={100}>
                      {77}%
                    </progress>
                  </span>
                  <p className="text-[#656565]">0 (0%)</p>
                </div>
                <div className=" flex flex-col">
                  <h2 className="font-semibold text-xl">Invalid Vote</h2>
                  <span>
                    <progress className="progressBar" value={bar} max={100}>
                      {bar}%
                    </progress>
                  </span>
                  <p className="text-[#656565]">0 (0%)</p>
                </div>
              </div>
            </aside>
          </aside>
          <Link
            prefetch
            href="/dashboard/liveFeed"
            className="text-white bg-[#2550C0] rounded-lg flex items-center flex-col sm:flex-row sm:justify-between"
          >
            <div className="w-full sm:w-1/2 p-3 sm:p-7 flex flex-col space-y-2">
              <h2 className="font-semibold  text-xl">
                View Polling Unit Reports
              </h2>
              <p>
                Click to follow live election updates and vote counts in
                real-time with our interactive report. Stay informed as numbers
                change.
              </p>
            </div>
            <div className="flex p-3 flex-col sm:items-center sm:justify-center w-full sm:w-1/3">
              <p>
                <EyeView />
              </p>
              <span className="flex items-center space-x-2">
                <p className="text-sm ">View List</p>
                <p className="mt-1">
                  <ArrowView color="#fff" />
                </p>
              </span>
            </div>
          </Link>
        </>
      ) : (
        <div className="w-full sm:w-1/2">
          {Array(4)
            .fill("")
            .map((i) => (
              <ElectionCard color="#fff" handleShow={handleShow} key={i} />
            ))}
        </div>
      )}
    </>
  );
}
