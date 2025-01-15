"use client";
import React, { useState } from "react";
import ModalCard from "./modal/Modal";
import Button from "./Button";
import Input from "./Input";
interface Props {
  handleModal: () => void;
  modal: boolean;
}
export default function AddUser({ handleModal, modal }: Props) {
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">Add User</h2>
      <hr className=" my-2 h-0.5" />

      <Input
        label="Username"
        placeholder="john doe"
        name="fname"
        type="text"
        //   onChange={handleChange}
        //   onBlur={handleBlur}
        //   value={values.name}
      />

      <div className="font-semibold capitalize flex flex-col space-y-1 w-full my-2">
        <label htmlFor="role" className="text-sm font-medium">
          User Role
        </label>
        <select
          className={`p-2 outline-none rounded w-full ${
            true
              ? "border-[1px] border-[#2550C0] "
              : "border-[1px] border-gray-300 text-sm text-[#979797]"
          }`}
          //   onChange={handleChange}
          //   onBlur={handleBlur}
          //   value={values.table}
          name="role"
        >
          <option value="">Select User Role</option>
          {/* {tables.map((item: any) => (
                  <option value={item?.alias}>{item?.name}</option>
                ))} */}
        </select>
      </div>
      <Button
        onClick={() => {}}
        label={ "Save"}
        styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
        //   loading={loading}
      />
    </ModalCard>
  );
}
