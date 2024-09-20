"use client";
import React, { useState } from "react";
import ModalCard from "./modal/Modal";
import Button from "./Button";
import Input from "./Input";
interface Props {
  handleModal: () => boolean;
  modal: boolean;
  isSubmitting: boolean;
  values: any;
  errors: any;
  handleBlur: () => void;
  handleChange: () => void;
  handleSubmit: () => void;
}
export default function AddElection({
  handleModal,
  modal,
  values,
  errors,
  handleBlur,
  handleChange,
  isSubmitting,
  handleSubmit,
}: Props) {
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">Add Election</h2>
      <hr className=" my-2 h-0.5" />

      <Input
        label="Election name"
        placeholder="presidential"
        name="name"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      {errors.name ? (
        <b className="text-xs text-red-500">{errors.name}</b>
      ) : null}
      <Input
        label="Election description"
        placeholder="description"
        name="description"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
      />
      {errors.description ? (
        <b className="text-xs text-red-500">{errors.description}</b>
      ) : null}
      <div className="login font-semibold capitalize flex flex-col w-full">
        <label className="text-sm font-medium">status</label>
        <select
          onChange={handleChange}
          name="status"
          onBlur={handleBlur}
          value={values.status}
          className={`w-full outline-none border-[1px] cursor-pointer p-2 flex rounded    ${
            values.status
              ? "border-2 border-[#3399FF]"
              : "border-[1px] border-gray-300 text-sm"
          }`}
        >
          <option value="">choose status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="previous">Previous</option>
        </select>
      </div>
      {errors.status ? (
        <b className="text-xs text-red-500">{errors.status}</b>
      ) : null}
      <Button
        onClick={handleSubmit}
        label={"Add"}
        styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
        loading={isSubmitting}
      />
    </ModalCard>
  );
}
