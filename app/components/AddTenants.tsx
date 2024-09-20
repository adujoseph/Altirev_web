"use client";
import React, { useState } from "react";
import ModalCard from "./modal/Modal";
import Button from "./Button";
import Input from "./Input";
interface Props {
  handleModal: () => boolean;
  modal: boolean;
}
export default function AddTenants({ handleModal, modal }: Props) {
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">Add Tenants</h2>
      <hr className=" my-2 h-0.5" />

      <Input
        label="Tenants Name"
        placeholder="comms"
        name="fname"
        type="text"
        //   onChange={handleChange}
        //   onBlur={handleBlur}
        //   value={values.name}
      />
      <Button
        onClick={() => {}}
        label={"Save"}
        styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
        //   loading={loading}
      />
    </ModalCard>
  );
}
