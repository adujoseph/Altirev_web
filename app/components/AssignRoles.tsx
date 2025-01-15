"use client";
import React, { useEffect, useState } from "react";
import ModalCard from "./modal/Modal";
import Button from "./Button";
import Input from "./Input";
import useAddUser from "../hooks/useAddUser";
interface Props {
  handleModal: () => boolean;
  modal: boolean;
  data: any;
}
export default function AssignRoles({ handleModal, modal, data}: Props) {
  const {
    states,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    wardId,
    ward,
    pollingUnit,
    pollingUnitId,
    setPollingUnitId,
    setWardId,
    email,
    setEmail,
    role,
    setRole,
    assignRole,
    upload,
    loading,
    handleFileChange,
    handleClick,
    file,
    hiddenFileInput,
    handleUploadName,
    assignBulkRole,
  } = useAddUser(handleModal);

  useEffect(() => {
    data?.email ? setEmail(data?.email) : setEmail("");
  }, [data?.email]);
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">
        {" "}
        {data?.email ? "Reassign Roles " : "Assign Roles"}
      </h2>
      {data?.email ? null :
      <div className="flex items-center justify-between">
        <p
          onClick={() => handleUploadName("single")}
          className={`rounded font-semibold p-2 w-1/2 flex items-center justify-center mx-2  capitalize cursor-pointer ${
            upload === "single"
              ? "bg-[#2550C0] text-white"
              : "border-[#2550C0] border-2 text-[#2550C0]"
          }`}
        >
          single upload
        </p>
        <p
          onClick={() => handleUploadName("bulk")}
          className={`rounded  p-2 w-1/2 flex items-center justify-center mx-2 font-semibold capitalize cursor-pointer ${
            upload === "bulk"
              ? "bg-[#2550C0] text-white"
              : "border-[#2550C0] border-2 text-[#2550C0]"
          }`}
        >
          bulk upload
        </p>
      </div>}
      {upload === "single" && (
        <>
          <hr className=" my-2 h-0.5" />
          {data?.email ? (
            <Input
              label="Email"
              placeholder="email@email.com"
              name=""
              type="email"
              // onChange={() => }
              value={data?.email}
            />
          ) : (
            <Input
              label="Email"
              placeholder="email@email.com"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          )}

          <div className="font-semibold capitalize flex flex-col space-y-1 w-full my-2">
            <label htmlFor="role" className="text-sm font-medium">
              User Role
            </label>
            <select
              className={`p-2 outline-none rounded w-full ${
                role
                  ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                  : "border-[1px] border-gray-300 text-sm text-[#979797]"
              }`}
              onChange={(e) => setRole(e.target.value)}
              value={role ?? data?.role}
              name="role"
            >
              <option value="">Select User Role</option>
              {/* {tables.map((item: any) => (
                  <option value={item?.alias}>{item?.name}</option>
                ))} */}
              <option value="agent">Agent</option>
              <option value="comms">Comms</option>
            </select>
          </div>
          <aside className="flex flex-col">
            <div className=" flex items-center justify-between">
              <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
                <label htmlFor="state" className="text-sm font-medium">
                  state
                </label>
                <select
                  className={`p-2 outline-none rounded w-full ${
                    stateId
                      ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                      : "border-[1px] border-gray-300 text-sm text-[#979797]"
                  }`}
                  onChange={(e) => setStateId(e.target.value)}
                  //   value={values.table}
                  value={stateId ?? data?.state}
                  name="state"
                >
                  <option value="">select state</option>
                  {states.map((item: any) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.title}
                    </option>
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
                      ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                      : "border-[1px] border-gray-300 text-sm text-[#979797]"
                  }`}
                  value={stateLgaId}
                  onChange={(e) => setStateLgaId(e.target.value)}
                  name="LGA"
                >
                  <option value="">select LGA</option>
                  {stateLga.map((item: any) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.title}
                    </option>
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
                      ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                      : "border-[1px] border-gray-300 text-sm text-[#979797]"
                  }`}
                  onChange={(e) => setWardId(e.target.value)}
                  value={wardId}
                  name="ward"
                >
                  <option value="">select ward</option>
                  {ward?.map((item: any) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.title}
                    </option>
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
                      ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                      : "border-[1px] border-gray-300 text-sm text-[#979797]"
                  }`}
                  onChange={(e) => setPollingUnitId(e.target.value)}
                  value={pollingUnitId}
                  name="PU"
                >
                  <option value="">select PU</option>
                  {pollingUnit?.map((item: any) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={assignRole}
              label={data?.email ? "Reassign" : "Save"}
              styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
              loading={loading}
            />
          </aside>
        </>
      )}
      {upload === "bulk" && (
        <>
          <div className="my-4">
            <label htmlFor="Transcript" className="text-sm font-semibold">
              Upload Excel File:
            </label>

            <span
              style={{
                width: "auto",
                borderBottom: file?.name ? "2px solid #2550C0" : "none",
                background: file?.name ? "#E4ECFF" : "#F6F6F6",
              }}
              className="input flex items-center space-x-4 !text-[#BABABB]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 20 24"
                fill="none"
              >
                <path
                  d="M2.69311 21.7248C1.24114 20.6275 0.377431 19.1913 0.101974 17.4163C-0.173484 15.6412 0.237467 14.0277 1.33483 12.5758L9.11283 2.28439C9.8846 1.26323 10.9048 0.667983 12.1734 0.49866C13.4421 0.329337 14.587 0.63056 15.6081 1.40233C16.6452 2.18616 17.2515 3.2084 17.4268 4.46906C17.6022 5.72971 17.2979 6.8786 16.5141 7.91572L9.3873 17.3455C8.92906 17.9518 8.33274 18.3096 7.59833 18.4189C6.86392 18.5282 6.19356 18.3537 5.58724 17.8955C4.98093 17.4373 4.64219 16.824 4.57102 16.0557C4.49985 15.2875 4.69942 14.5922 5.16971 13.9699L12.2604 4.58801L13.2177 5.31154L6.07279 14.7653C5.80749 15.1163 5.69707 15.5029 5.74151 15.9251C5.78596 16.3472 5.97571 16.6849 6.31078 16.9382C6.64585 17.1914 7.0195 17.2858 7.43174 17.2213C7.84398 17.1568 8.17672 16.957 8.42996 16.622L15.5749 7.16825C16.1537 6.40238 16.3748 5.55419 16.2383 4.62368C16.1017 3.69317 15.6505 2.9385 14.8846 2.35967C14.1187 1.78084 13.2696 1.55271 12.3371 1.67527C11.4046 1.79783 10.649 2.24205 10.0702 3.00792L2.25599 13.3472C1.37569 14.5119 1.05388 15.8168 1.29055 17.2616C1.52723 18.7065 2.23592 19.8752 3.41664 20.7675C4.61331 21.6719 5.93799 22.0338 7.39066 21.8532C8.84334 21.6725 10.0159 20.9918 10.9082 19.8111L18.7224 9.47187L19.6797 10.1954L11.8836 20.5107C10.7863 21.9627 9.34318 22.8024 7.55433 23.0298C5.76548 23.2572 4.14507 22.8222 2.69311 21.7248Z"
                  fill="#BABABB"
                />
              </svg>
              <p
                onClick={handleClick}
                style={{
                  color: file?.name ? "#333" : "#BABABB",
                }}
                className="cursor-pointer text-sm p-3"
              >
                {file?.name ? file?.name : " Upload Excel File"}
              </p>
            </span>
            <input
              onChange={handleFileChange}
              ref={hiddenFileInput}
              className="input hidden"
              type="file"
            />
          </div>
          <Button
            onClick={assignBulkRole}
            label={"Save"}
            styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
            loading={loading}
          />
        </>
      )}
    </ModalCard>
  );
}
