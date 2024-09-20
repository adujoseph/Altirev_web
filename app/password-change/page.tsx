"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import { InputSMS } from "../icons/Inputs";
import Button from "../components/Button";
import { useForgotQuery } from "../hooks/useForgotQuery";
import ModalCard from "../components/modal/Modal";
import { Hurray } from "../login/page";
import { BackIcon2 } from "../icons/Social";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";

export default function page() {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs: any = useRef([]);
   const searchParams = useSearchParams();
  const hash = searchParams.get("hash");
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleResetPassword,
    loading,
    handleSubmit,
    isSubmitting,
    setView2,
    view2,
    modal,
    handleModal,
  } = useForgotQuery(hash);

  const handleChange2 = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    // Move to the next input field
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to the previous input field on Backspace
    if (
      event.nativeEvent.key === "Backspace" &&
      index > 0 &&
      otp[index] === ""
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  return (
    <>
      <Header />
      <div className="overflow-hidden mt-10">
        {modal && (
          <ModalCard setOpen={handleModal} open={modal}>
            <Hurray />
          </ModalCard>
        )}
        {view2 === 1 && (
          <>
            <span className="flex flex-col space-y-3 items-center justify-center">
              <h2 className="text-3xl font-bold">Reset Password</h2>
              <p className="text-[#5F6C72]">
                {" "}
                Please provide the new password for your account.
              </p>
            </span>
            <div className="flex items-center justify-center mt-10">
              <form className="flex flex-col items-center justify-center space-y-2 w-[320px] sm:w-[400px]  bg-white px-3 py-5 sm:p-5 rounded-xl">
                <div className="w-full flex flex-col">
                  <div className="flex flex-col ">
                    <Input
                      label="New Password"
                      placeholder="enter new password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password ? (
                      <b className="text-xs text-red-500">{errors.password}</b>
                    ) : null}
                    <Input
                      label="Confirm Password"
                      placeholder="confirm password"
                      name="cpassword"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cpassword}
                    />
                    {errors.cpassword ? (
                      <b className="text-xs text-red-500">{errors.cpassword}</b>
                    ) : null}
                  </div>
                </div>

                <Button
                  loading={loading}
                  onClick={handleResetPassword}
                  label="Proceed"
                  styles="bg-[#2550C0] w-full"
                />
              </form>
            </div>
          </>
        )}
        {view2 === 2 && (
          <>
            <p
              onClick={() => setView2(1)}
              className=" border-[1px] w-max px-3 py-1 border-gray-100 rounded-md top-10 absolute left-10 cursor-pointer"
            >
              <BackIcon2 />
            </p>
            <span className="flex flex-col space-y-3 items-center justify-center">
              <h2 className="text-xl font-bold"> Verification</h2>
              <p className="text-[#5F6C72]">
                Please, enter the OTP we just sent to “{values.email}”
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
                  onChange={(e: any) => handleChange2(e.target.value, index)}
                  onKeyDown={(event) => handleKeyPress(event, index)}
                />
              ))}
            </div>

            <aside className="w-full flex items-center justify-between">
              <p>{formatTime(seconds)}</p>
              <small
                onClick={seconds !== 0 ? () => {} : handleOtp}
                className="!mt-0  ml-auto cursor-pointer font-semibold"
              >
                Don’t receive OTP? Resend OTP
              </small>
            </aside>
            <Button
              icon={<ArrowLogin />}
              loading={false}
              onClick={() => setView2(3)}
              label="Verify"
              styles="bg-[#2550C0] w-full"
            />
          </>
        )}
        {view2 === 3 && (
          <>
            <p
              onClick={() => setView2(2)}
              className=" border-[1px] w-max px-3 py-1 border-gray-100 rounded-md top-10 absolute left-10 cursor-pointer"
            >
              <BackIcon2 />
            </p>
            <span className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold">Reset Password</h2>
              <p className="text-[#5F6C72] w-3/4 text-center">
                Strengthen your account! Update your password for added security
              </p>
            </span>
            <Input
              label="New password"
              placeholder="password"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />{" "}
            <Input
              label="Re-enter password"
              placeholder="password"
              name="cpassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cpassword}
            />
            <Button
              icon={<ArrowLogin />}
              loading={isSubmitting}
              onClick={handleSubmit}
              label="Submit"
              styles="bg-[#2550C0] w-full"
            />
          </>
        )}
      </div>
    </>
  );
}
