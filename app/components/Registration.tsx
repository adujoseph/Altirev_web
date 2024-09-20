"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { useSignUpQuery } from "../hooks/useSignUpQuery";
import { Hurray } from "../register/page";
import ModalCard from "./modal/Modal";
import { InputCall, InputProfile, InputSMS } from "../icons/Inputs";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { BackIcon2 } from "../icons/Social";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countryNames } from "../constant/countryNames";

function Registration() {
  const email = localStorage.getItem("email") || "";
  const {
    getOtp,
    handleSubmit,
    errors,
    values,
    handleBlur,
    handleChange,
    isSubmitting,
    setView,
    view,
    validateOtp,
    loading,
    setOtp,
    otp,
    length,
    setModal,
    modal,
    loading2,
    setSeconds,
    seconds,
    code,
    setCode,
    handleOtp,
    formatTime,
    handleKeyPress,
    handleInputChange,
    handleModal,
    sex,
    setSex,
    inputRefs,
    states,
    stateId,
    setStateId,
    value,
    setValue,
    setCountry,
    country,
  } = useSignUpQuery();
  return (
    <div className="w-full lg:w-1/2 p-5 relative overflow-y-scroll bg-white">
      {modal && (
        <ModalCard setOpen={handleModal} open={modal}>
          <Hurray />
        </ModalCard>
      )}
      {view === 0 && (
        <>
          <h2 className="text-center font-bold text-3xl mb-2">
            Create Account
          </h2>
          <span className="space-y-1 flex flex-col items-center justify-center">
            <p className="text-[#656565]">
              Kindly enter your details to create an account
            </p>
          </span>

          <form className="flex flex-col w-full overflow-x-hidden sm:w-3/4 mx-auto my-10">
            <Input
              label="first name"
              placeholder="john doe"
              name="fname"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fname}
              icon={<InputProfile />}
            />
            {errors.fname ? (
              <b className="text-xs text-red-500 -mt-4">{errors.fname}</b>
            ) : null}
            <Input
              label="last name"
              placeholder="john doe"
              name="lname"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lname}
              icon={<InputProfile />}
            />
            {errors.lname ? (
              <b className="text-xs text-red-500 -mt-4">{errors.lname}</b>
            ) : null}
            <Input
              label="username"
              placeholder="john doe"
              name="username"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              icon={<InputProfile />}
            />
            {errors.username ? (
              <b className="text-xs text-red-500 -mt-4">{errors.username}</b>
            ) : null}
            <Input
              label="email address"
              placeholder="you@gmail.com"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              icon={<InputSMS />}
            />
            {errors.email ? (
              <b className="text-xs text-red-500 -mt-4">{errors.email}</b>
            ) : null}
            <PhoneInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
              className={`p-2 outline-none rounded w-full my-5 ${
                value
                  ? "border-b-2 border-[#3399FF] bg-[#EDF6FF]"
                  : "border-[1px] border-gray-300 text-sm"
              }`}
              defaultCountry="NG"
              onCountryChange={(countryCode) => {
                const countryName = countryNames[countryCode];
                setCountry(countryName);
              }}
            />
            <Button
              loading={loading2}
              label="Continue"
              onClick={() => setView(1)}
              styles="bg-[#2550C0]  w-full"
            />
            <Link prefetch href="/login" className="text-center">
              Already have an account? <b className="text-[#2550C0]">Log In</b>{" "}
            </Link>
          </form>
        </>
      )}
      {view === 1 && (
        <>
          <p
            onClick={() => setView(0)}
            className="border-[1px] w-max px-3 py-1 border-gray-100 rounded-md cursor-pointer"
          >
            <BackIcon2 />
          </p>
          <h2 className="text-center font-bold text-3xl mb-2">
            Location & Password
          </h2>
          <span className="space-y-1 flex flex-col items-center justify-center">
            <p className="text-[#656565]">
              Complete your registration by setting your location and creating a
              secure password
            </p>
          </span>

          <form className="flex flex-col w-full overflow-x-hidden sm:w-3/4 mx-auto my-10">
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
      )}
      {view === 2 && (
        <>
          <p
            onClick={() => setView(1)}
            className="border-[1px] w-max px-3 py-1 border-gray-100 rounded-md cursor-pointer"
          >
            <BackIcon2 />
          </p>
          <div className="my-10 mx-auto flex flex-col space-y-5 items-center justify-center sm:w-3/4 w-full">
            <span>
              <h2 className="text-3xl font-bold">Verify Your Account</h2>
              <p className="text-[#656565] ">
                Enter the 6 digit OTP sent to your email
              </p>
            </span>
            <h2 className="font-bold">OTP:</h2>
            <div className="flex items-center space-x-2">
              {otp?.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref: any) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                  type="tel"
                  value={digit}
                  className="size-12 m-2 border-[1px] border-[#E4E7E9] p-2 rounded text-center "
                  onChange={(e: any) =>
                    handleInputChange(e.target.value, index)
                  }
                  onKeyDown={(event) => handleKeyPress(event, index)}
                />
              ))}
            </div>
            <aside className="w-full sm:w-3/4 lg:w-full flex items-center justify-between">
              <p>{formatTime(seconds)}</p>
              <small
                onClick={handleOtp}
                className="!mt-0  ml-auto cursor-pointer font-semibold"
              >
                Don’t receive OTP? Resend OTP
              </small>
            </aside>
            <Button
              loading={loading}
              onClick={validateOtp}
              label="Verify"
              styles="bg-[#2550C0] w-3/4"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Registration;
