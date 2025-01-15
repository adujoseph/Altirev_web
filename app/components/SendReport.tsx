"use client";
import React, { useState } from "react";
import ModalCard from "./modal/Modal";
import Button from "./Button";
import useReport from "../hooks/useReport";

export default function SendReport({
  handleModal,
  modal,
  loading,
  sendReport,
  comment,
  setReportStatus,
  category,
  setComment,
}: any) {
  const [view, setView] = useState(1);
const statusArr = ['pending', 'approved', 'rejected', 'escalated'];
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      {view === 1 && (
        <>
          <h2 className="font-bold mb-4 text-xl">Change Report Status</h2>

          <hr className=" my-2 h-0.5" />

          <aside className="flex flex-col">
            {/* <div className=" flex items-center justify-between">
              <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2">
                <label htmlFor="state" className="text-sm font-medium">
                  state
                </label>
                <select
                  className={`p-2 outline-none rounded w-full ${
                    stateId
                      ? "border-[1px] border-[#2550C0] "
                      : "border-[1px] border-gray-300 text-sm"
                  }`}
                  onChange={(e) => setStateId(e.target.value)}
                  value={stateId}
                  name="state"
                >
                  <option value="">select state</option>
                  {states.map((item: any) => (
                    <option value={item?.value}>{item?.title}</option>
                  ))}
                </select>
              </div>
              <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
                <label htmlFor="LGA" className="text-sm font-medium">
                  LGA
                </label>
                <select
                  className={`p-2 outline-none rounded w-full ${
                    stateLgaId
                      ? "border-[1px] border-[#2550C0] "
                      : "border-[1px] border-gray-300 text-sm text-[#979797]"
                  }`}
                  //   onChange={handleChange}
                  //   onBlur={handleBlur}
                  value={stateLgaId}
                  //   value={values.table}
                  onChange={(e) => setStateLgaId(e.target.value)}
                  name="LGA"
                >
                  <option value="">select LGA</option>
                  {stateLga.map((item: any) => (
                    <option value={item?.value}>{item?.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" flex items-center justify-between">
              <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
                <label htmlFor="ward" className="text-sm font-medium">
                  ward
                </label>
                <select
                  className={`p-2 outline-none rounded w-full ${
                    wardId
                      ? "border-[1px] border-[#2550C0] "
                      : "border-[1px] border-gray-300 text-sm text-[#979797]"
                  }`}
                  //   onChange={handleChange}
                  onChange={(e) => setWardId(e.target.value)}
                  //   onBlur={handleBlur}
                  value={wardId}
                  name="ward"
                >
                  <option value="">select ward</option>
                  {ward?.map((item: any) => (
                    <option value={item?.value}>{item?.title}</option>
                  ))}
                </select>
              </div>
              <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
                <label htmlFor="PU" className="text-sm font-medium">
                  PU
                </label>
                <select
                  className={`p-2 outline-none rounded w-full ${
                    pollingUnitId
                      ? "border-[1px] border-[#2550C0] "
                      : "border-[1px] border-gray-300 text-sm text-[#979797]"
                  }`}
                  //   onChange={handleChange}
                  //   onBlur={handleBlur}
                  onChange={(e) => setPollingUnitId(e.target.value)}
                  value={pollingUnitId}
                  name="PU"
                >
                  <option value="">select PU</option>
                  {pollingUnit?.map((item: any) => (
                    <option value={item?.value}>{item?.title}</option>
                  ))}
                </select>
              </div>
            </div> */}
            {/* <div className="font-semibold capitalize flex flex-col space-y-1 my-2">
              <label htmlFor="commentP" className="text-sm font-medium">
                Comment Priority
              </label>
              <div className="flex items-center justify-center sm:justify-start">
                <div
                  onClick={() => setReportStatus("normal")}
                  className={
                    category === "normal"
                      ? "font-semibold rounded text-white p-2 flex items-center justify-center text-center text-sm bg-[#272727] w-1/2"
                      : " rounded p-2 flex items-center justify-center cursor-pointer text-center text-sm border-[1px] border-[#CBCBCB] w-1/2"
                  }
                >
                  <p className="text-sm sm:text-base">Normal Status </p>
                </div>
                <div
                  onClick={() => setReportStatus("high")}
                  className={
                    category === "high"
                      ? "font-semibold rounded text-white p-2 flex items-center justify-center text-center text-sm bg-[#FF0000] w-1/2"
                      : "text-center p-2 rounded flex items-center justify-center cursor-pointer text-sm border-[1px] border-[#CBCBCB] w-1/2"
                  }
                >
                  <p className="text-sm sm:text-base">High Status</p>
                </div>
              </div>
            </div> */}
            <div className="font-semibold capitalize flex flex-col space-y-1 w-full">
              <label htmlFor="state" className="text-sm font-medium">
                status
              </label>
              <select
                className={`p-2 outline-none rounded w-full capitalizedash ${
                  category
                    ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                    : "border-[1px] border-gray-300 text-sm text-[#979797]"
                }`}
                onChange={(e: React.FormEvent) =>
                  setReportStatus(e.target.value)
                }

                value={category}
                name="status"
              >
                <option value="">select status</option>
                {statusArr.map((item: string) => (
                  <option className="capitalize" key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold capitalize flex flex-col space-y-1 my-2">
                <label htmlFor="comment" className="text-sm font-medium">
                  Comment
                </label>
                <textarea
                  name="comment"
                  placeholder="comment"
                  value={comment}
                  // onBlur={handleBlur}
                  onChange={(e) => setComment(e.target.value)}
                  className={`p-2 rounded resize-none outline-none ${
                    comment
                      ? "border-2 border-green-500"
                      : "border-[1px] border-gray-300 text-sm"
                  }`}
                ></textarea>
              </div>
            </div>
            <Button
              onClick={sendReport}
              label="Send"
              styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
              loading={loading}
            />
          </aside>
        </>
      )}

      {view === 2 && <SendReportConfirmation setView={setView} />}
    </ModalCard>
  );
}

export const SendReportConfirmation = ({ setView }: any) => (
  <div>
    <h2 className="font-bold text-xl">Send Report</h2>
    <hr className="my-5" />

    <p className="text-sm text-center mt-6">
      Are you sure you want to <b> Send Report?</b>
    </p>
    <div className="flex items-center space-x-3">
      <Button
        onClick={() => setView(1)}
        label="Cancel"
        styles="!text-[#898989] border-[1px] border-[#CDCDCD] rounded w-1/2 mx-auto mt-4"
        loading={false}
      />
      <Button
        // onClick={() => handleSubmit(editData, "approved")}
        label="Yes"
        styles="bg-[#2550C0] rounded mx-auto mt-4 w-1/2"
        // loading={loading}
      />
    </div>
  </div>
);
