"use client";
import React, { useEffect, useState } from "react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout } from "../redux/userSlice";
import { Toast } from "./Toast";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { Logo } from "../icons/Logo";

export default function Header() {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((prev) => !prev);
  const navigate = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    Toast({ title: "User Logged Out", error: true });
    navigate.push("/");
  };

  const getStarted = () => {
    navigate.push("/register");
  };
  const login = () => {
    navigate.push("/login");
  };
  useEffect(() => {
    // Prefetch page
    navigate.prefetch("/login");
    navigate.prefetch("/");
    navigate.prefetch("/register");
  }, [navigate]);
  const user = useAppSelector((state) => state?.user?.user);
  return (
    <header className="sticky top-0 left-0 z-50">
      <nav className="hidden lg:flex items-center justify-around h-[80px] shadow-sm bg-white">
        <div>
          <Link href="/" className="flex text-4xl font-semibold">
            <Logo />
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-20">
          <p className="text-[#272727] font-medium cursor-pointer">Home</p>
          <p
            onClick={() => handleClickScroll("services")}
            className="text-[#272727] font-medium cursor-pointer"
          >
            Services
          </p>
          <p
            onClick={() => handleClickScroll("contact")}
            className="text-[#272727] font-medium cursor-pointer"
          >
            Contact Us
          </p>
        </div>
        <div className="hidden lg:flex space-x-5 items-center">
          <Button
            label="Login"
            onClick={login}
            styles="border-[1px] border-[#2550C0] !text-[#2550C0] text-xs font-medium text-canter"
          />
          <Button
            label="Get Started"
            onClick={getStarted}
            styles=" text-[#fff] bg-[#2550C0] text-xs font-medium"
          />
        </div>
      </nav>
      {/* mobile */}
      <nav className="flex items-center justify-between px-5 h-[80px] shadow-sm bg-white lg:hidden">
        <div>
          <Link href="/" className="flex text-4xl font-semibold">
               <Logo />
          </Link>
        </div>
        <div className="cursor-pointer">
          {!toggle ? (
            <Bars2Icon
              onClick={handleToggle}
              className="size-6 text-[#2550C0]"
            />
          ) : (
            <XMarkIcon
              onClick={handleToggle}
              className="size-6 text-[#FF0E00]"
            />
          )}
        </div>
        {toggle && (
          <div className="flex flex-col space-y-4 absolute top-20  bg-white p-4 rounded right-0 shadow">
            <div className="flex space-y-2 flex-col">
              <p className="text-[#272727] font-medium cursor-pointer">Home</p>
              <p className="text-[#272727] font-medium cursor-pointer">
                Services
              </p>
              <Link
                href="/#contact"
                className="text-[#272727] font-medium cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex space-y-2 flex-col items-center">
              <Button
                label="Login"
                onClick={login}
                styles="border-[1px] border-[#2550C0] !text-[#2550C0] text-xs font-medium w-full"
              />
              <Button
                label="Get Started"
                onClick={getStarted}
                styles=" text-[#fff] bg-[#2550C0] text-xs font-medium"
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
  export const handleClickScroll = (id: string) => {
    const element = document.getElementById(`${id}`);

    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
