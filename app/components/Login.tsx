"use client";
import ModalCard from "../components/modal/Modal";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  InputCall,
  InputMessage,
  InputProfile,
  InputSMS,
} from "../icons/Inputs";
import { ForgetPassword } from "../components/ForgotPassword";
import { useRouter } from "next/navigation";
import { useLoginQuery } from "../hooks/useLoginQuery";
import { login } from "../redux/userSlice";
import { useStateContext } from "../context/context";
import { useEffect, useRef } from "react";
import { Toast } from "./Toast";
import Input from "./Input";
import { Hurray } from "../login/page";
import Button from "./Button";

function Login() {
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
  } = useLoginQuery();
  const dispatch = useAppDispatch();
  const inputRefs: any = useRef([]);
  const user = useAppSelector((state) => state?.user?.user);
  const navigate = useRouter();
  const handleModal = () => setModal((prev) => !prev);
  const handleInputChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    // Move to the next input field
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const { setTitle } = useStateContext();

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
    view === 1 && inputRefs?.current[0]?.focus();
  }, [view]);
  const handleOtp = (e: any) => {
    e.preventDefault();
    // if (
    //   !values.name ||
    //   !values.email ||
    //   !values.phone ||
    //   !code
    // ) {
    //   Toast({ title: "Fill All Fields", error: true });
    //   return;
    // }
    getOtp();
  };
  useEffect(() => {
    if (view === 1) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds, view]);
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/dashboard");
  }, [navigate]);
  return (
    <div className="w-full  items-center justify-center flex flex-col lg:w-1/2 p-5 relative overflow-y-scroll bg-white">
      {modal && (
        <ModalCard setOpen={handleModal} open={modal}>
          <Hurray />
        </ModalCard>
      )}
      {view === 0 && (
        <>
          <h2 className="text-center font-bold text-3xl mb-2">Login</h2>
          <span className="space-y-1 flex flex-col items-center justify-center">
            <p className="text-[#656565]">
              Welcome back! Enter your login details below.
            </p>
          </span>

          <form className="w-full flex flex-col justify-center w-ful overflow-x-hidden sm:w-3/4 mx-auto my-10">
            <Input
              label="Email"
              placeholder="john doe"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              icon={<InputProfile />}
            />
            {errors.email ? (
              <b className="text-xs text-red-500">{errors.email}</b>
            ) : null}
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
              <b className="text-xs text-red-500">{errors.password}</b>
            ) : null}
            <p
              onClick={() => setView(1)}
              className="text-[#2550C0] mb-4 ml-auto capitalize cursor-pointer -mt-2 font-bold"
            >
              forgot password
            </p>
            <Button
              loading={isSubmitting}
              label="Login"
              // onClick={dashboard}
              onClick={handleSubmit}
              styles="bg-[#2550C0]  w-full"
            />
            <Link prefetch href="/register" className="text-center">
              Don't have an account?{" "}
              <b className="text-[#2550C0]">Create Account</b>{" "}
            </Link>
          </form>
        </>
      )}
      {view === 1 && (
        <ForgetPassword
          setView={setView}
          formatTime={formatTime}
          view={view}
          seconds={seconds}
          handleOtp={handleOtp}
        />
      )}
    </div>
  );
}

export default Login;
