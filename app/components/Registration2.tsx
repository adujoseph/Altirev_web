"use client";
import React, { useEffect } from "react";
import { useSignUpQuery } from "../hooks/useSignUpQuery";
import { Hurray } from "../register/page";
import ModalCard from "./modal/Modal";

import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { BackIcon2 } from "../icons/Social";
import { useSignUpQuery2 } from "../hooks/useSignUpQuery2";
import { useRouter } from "next/navigation";

function Registration2({ setView, country,value,item }: any) {
  const navigate = useRouter();

  const {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
    isSubmitting,
    setModal,
    modal,
    handleModal,
    sex,
    setSex,
    states,
    stateId,
    setStateId,
  } = useSignUpQuery2(country, value,item);
    useEffect(() => {
      // Prefetch the dashboard page
      navigate.prefetch("/dashboard/report/:{id}");
      navigate.prefetch(`/dashboard/result/:{id}`);
    }, [navigate]);
  return (
    <div className="w-full p-5 relative overflow-y-scroll bg-white">
      {modal && (
        <ModalCard setOpen={handleModal} open={modal}>
          <Hurray />
        </ModalCard>
      )}

      <>
        <p
          onClick={() => setView(2)}
          className="border-[1px] w-max px-3 py-1 border-gray-100 rounded-md cursor-pointer"
        >
          <BackIcon2 />
        </p>
        <h2 className="text-center font-bold text-3xl mb-2">
          Location & Password
        </h2>
        <span className="w-full space-y-1 flex flex-col items-center justify-center">
          <p className="text-[#656565]">
            Complete your registration by setting your location and creating a
            secure password
          </p>
        </span>

        <form className="flex flex-col w-full overflow-x-hidden mx-auto my-10">
          <div className="flex items-center space-x-5 w-full">
            <span
              onClick={() => setSex("male")}
              className={`flex cursor-pointer items-center p-2 w-1/2 space-x-2
            ${
              sex === "male"
                ? "border-b-2 bg-[#EDF6FF] text-[#3399FF] font-semibold rounded border-[#3399FF]"
                : "border-[1px] border-gray-300 text-sm rounded"
            }`}
            >
              <input
                type="radio"
                value="male"
                onChange={(e) => setSex(e.target.value)}
                checked={sex === "male"}
              />
              <p>male</p>
            </span>
            <span
              onClick={() => setSex("female")}
              className={`flex cursor-pointer items-center w-1/2 p-2 space-x-2
            ${
              sex === "female"
                ? "border-b-2 rounded  bg-[#EDF6FF] border-[#3399FF] text-[#3399FF] font-semibold "
                : "border-[1px] border-gray-300 text-sm rounded"
            }`}
            >
              <input
                type="radio"
                onChange={(e) => setSex(e.target.value)}
                value="female"
                checked={sex === "female"}
              />
              <p>female</p>
            </span>
          </div>
          {country === "Nigeria" && (
            <div className="font-semibold capitalize flex flex-col space-y-1 w-full">
              <label htmlFor="state" className="text-sm font-medium">
                state
              </label>
              <select
                className={`p-2 outline-none rounded w-full ${
                  values.table
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
          )}

          <Input
            label="Password"
            placeholder="********"
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password ? (
            <b className="text-xs text-red-500 -mt-4">{errors.password}</b>
          ) : null}
          <Input
            label="Re-enter Password"
            placeholder="********"
            name="cpassword"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cpassword}
          />
          {errors.cpassword ? (
            <b className="text-xs text-red-500 -mt-4">{errors.cpassword}</b>
          ) : null}
          <Button
            loading={isSubmitting}
            label="Continue"
            onClick={handleSubmit}
            styles="bg-[#2550C0] mt-5 w-full"
          />
          <Link prefetch href="/login" className="text-center">
            Already have an account? <b className="text-[#2550C0]">Log In</b>{" "}
          </Link>
        </form>
      </>
    </div>
  );
}

export default Registration2;
