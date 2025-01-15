"use client";
import React from "react";
import { useSignUpQuery } from "../hooks/useSignUpQuery";
import ModalCard from "./modal/Modal";
import { InputCall, InputProfile, InputSMS } from "../icons/Inputs";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { BackIcon2 } from "../icons/Social";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countryNames } from "../constant/countryNames";
import Registration2 from "./Registration2";

function Registration() {
  const {
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
    otp,
    seconds,
    handleOtp,
    formatTime,
    handleKeyPress,
    handleInputChange,
    inputRefs,
    value,
    setValue,
    setCountry,
    country,
  } = useSignUpQuery();

  return (
    <div className="w-full lg:w-1/2 p-5 relative overflow-y-scroll bg-white">

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
              <b className="text-xs text-red-500 -mt-4">{errors?.fname}</b>
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
              loading={isSubmitting}
              label="Continue"
              onClick={handleSubmit}
              styles="bg-[#2550C0]  w-full"
            />
            <Link prefetch href="/login" className="text-center">
              Already have an account? <b className="text-[#2550C0]">Log In</b>{" "}
            </Link>
          </form>
        </>
      )}
      {view === 1 && (
       <Registration2 item={values} value={value} country={country} setView={setView}/>
      )}
      {view === 2 && (
        <>
          <p
            onClick={() => setView(0)}
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
