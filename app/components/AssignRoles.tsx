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
  user:any
}
export default function AssignRoles({ handleModal, modal, data ,user}: Props) {
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
    loading,
  } = useAddUser(user);

  useEffect(() => {
    data?.email ? setEmail(data?.email) : setEmail("");
  }, [data?.email]);
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">
        {" "}
        {data?.email ? "Reassign Roles " : "Assign Roles"}
      </h2>
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
                <option key={item?.value}  value={item?.value}>{item?.title}</option>
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
                <option key={item?.value}  value={item?.value}>{item?.title}</option>
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
                <option key={item?.value}  value={item?.value}>{item?.title}</option>
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
                <option key={item?.value}  value={item?.value}>{item?.title}</option>
              ))}
            </select>
          </div>
        </div>
        <Button
          onClick={assignRole}
          label={data?.Email ? "Reassign" : "Save"}
          styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
          loading={loading}
        />
      </aside>
    </ModalCard>
  );
}
