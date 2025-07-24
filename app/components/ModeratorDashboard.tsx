"use client";
import React, { useState } from "react";
import { ArrowView, Danger, FilterView } from "../icons/Arrow";
import Link from "next/link";
import PieChart from "./Chart";
import { FilterVotes } from "./FilterVotes";
import ModalCard from "./modal/Modal";
import useResult from "../hooks/useResult";
import useReport from "../hooks/useReport";
import PastLive from "./PastLive";
import useElection from "../hooks/useElection";

interface Props {
  category: string;
  setCategory: (e?: string) => void;
  setView: (e?: string) => void;
}

export default function ModeratorDashboard({ setCategory, category, setView }: Props) {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal((prev) => !prev);
  const { results } = useResult("");
  const {
    states,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    setWardId,
    pollingUnit,
    setPollingUnitId,
    wardId,
    pollingUnitId,
    ward,
    report,
  } = useReport("");
  const { pastElection } = useElection();
  return (
    <>
    
      {modal && (
        <ModalCard open={modal} setOpen={handleModal}>
          <FilterVotes
            states={states}
            stateLga={stateLga}
            setStateId={setStateId}
            stateId={stateId}
            setStateLgaId={setStateLgaId}
            stateLgaId={stateLgaId}
            setWardId={setWardId}
            pollingUnit={pollingUnit}
            setPollingUnitId={setPollingUnitId}
            pollingUnitId={pollingUnitId}
            wardId={wardId}
            ward={ward}
            setModal={setModal}
          />
        </ModalCard>
      )}
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
            <p>
              {category === "past" && (
                <p className="size-2 rounded-full bg-[#101720]" />
              )}
            </p>
          </div>
          <div
            onClick={() => setCategory("overview")}
            className={
              category === "overview"
                ? "font-semibold text-[#101720] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#101720] sm:w-[120px]"
                : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[120px]"
            }
          >
            <p className="text-sm sm:text-base">Overview</p>

            <p>
              {category === "overview" && (
                <p className="size-2 rounded-full bg-[#101720]" />
              )}
            </p>
          </div>
        </div>
        {/* <div onClick={() => setView(2)} className="ml-auto flex w-max">
          <span className="flex items-center space-x-2 border-b-2 border-[#272727] w-max cursor-pointer">
            <p>view all</p>
            <ArrowView color="#272727" />
          </span>
        </div> */}
        <PastLive
          data={pastElection?.data?.previous}
          loading={pastElection?.isLoading}
          setView={setView}
          handleModal={handleModal}
        />
        <aside className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between items-center">
          <div className="bg-white hover:bg-[#FFA49F] rounded-lg flex  flex-col sm:flex-row sm:justify-between  w-full sm:w-1/2 h-[160px]">
            <div className="w-full sm:w-2/3 p-3 flex flex-col">
              <h2 className="font-bold  text-xl">Escalated Incident</h2>
              <small className="font-semibold">
                Stay Updated! get live report that needs urgent response
              </small>
            </div>
            <div className="flex p-3 flex-col sm:items-center sm:justify-center w-full sm:w-1/3 space-y-5">
              <p>
                <Danger />
              </p>
              <span className="flex items-center space-x-2">
                <p className="text-4xl font-bold">
                  {report?.data?.length ?? 0}
                </p>
              </span>
            </div>
          </div>
          <div className="bg-black rounded-xl p-5  w-full sm:w-1/2 h-[160px] m-4  flex flex-col space-y-5 relative text-white">
            <span>
              <h1 className="text-xl font-semibold">New Result</h1>
              <p className="text-sm">
                Stay Updated! Fresh election poll data just arrived
              </p>
            </span>

            <h1 className="ml-auto bottom-5 right-5 text-4xl font-bold absolute">
              {results?.data?.length ?? 0}
            </h1>
          </div>
        </aside>
      </section>
    </>
  );
}

export const ShowResult = ({ handleModal }: any) => (
  <aside className="bg-white rounded-lg shadow p-4 my-8 w-full">
    <div className="flex items-center justify-between">
      <p className="font-semibold text-xl">{new Date().getFullYear()}</p>
      <div className="flex items-center space-x-2">
        <p className="font-semibold sm:text-xl">Election</p>
        <p
          onClick={handleModal}
          className="w-max border-[1px] border-[#CBCBCB] rounded flex items-center justify-center p-2 cursor-pointer"
        >
          <FilterView />
        </p>
      </div>
    </div>
    <aside className="flex flex-col space-y-2 items-center sm:flex-row sm:justify-between w-full">
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
            <progress className="progressBar" value={0} max={100}>
              {0}%
            </progress>
          </span>
          <p className="text-[#656565]">0(0%)</p>
        </div>
        <div className=" flex flex-col">
          <h2 className="font-semibold text-xl">Invalid Vote</h2>
          <span>
            <progress className="progressBar" value={bar} max={100}>
              {bar}%
            </progress>
          </span>
          <p className="text-[#656565]">0(0%)</p>
        </div>
      </div>
    </aside>
  </aside>
);
