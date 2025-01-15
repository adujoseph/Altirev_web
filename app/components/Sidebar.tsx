"use client";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { list, list2, list3, list4, list5 } from "../constant/sidebar";
import { Logout } from "../icons/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useStateContext } from "../context/context";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useAppSelector } from "../redux/hook";
import classNames from "classnames";
import { User } from "../typings";
import { postApi } from "../services";
import { useSettingQuery } from "../hooks/useSettingQuery";
import Image from "next/image";
import profile from "../imgs/profile.png";
import { Close, Close2 } from "../icons/Close";
import { Logo } from "../icons/Logo";

export default function Sidebar() {
  const { openMenu, title, setEdit, setOpenMenu } = useStateContext();
  const pathname = usePathname();
  const user: User = useAppSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useRouter();
  // const { authCheck } = useSettingQuery();
  const sideBar =
    title === "moderator"
      ? list3
      : title === "comms"
      ? list2
      : title === "admin"
      ? list4
      : title === "superadmin"
      ? list5
      : list;
  const logoutFn = async () => {
    navigate.push("/login");
    const resp = await postApi("v1/auth/logout", "");
    localStorage.clear();
    dispatch(logout());
  };
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMemo(() => {
    windowSize.width <= 1000 ? setOpenMenu(false) : setOpenMenu(true);
  }, [windowSize, pathname]);

  useLayoutEffect(() => {
    if (!user?.email) navigate.push("/login");
  }, [user?.email]);

  const reset = () => {
    setEdit(false);
  };
  useEffect(() => {
    // Prefetch the page
    navigate.prefetch("/login");
  }, [navigate]);
  return (
    <div
      className={classNames("", {
        "w-[220px] flex items-center pt-5 flex-col h-screen bg-[#F3F3F3] z-[99999] shadow fixed top-0 left-0":
          openMenu,
        "hidden w-0 ": !openMenu,
      })}
    >
      <p onClick={() => setOpenMenu(false)} className="ml-auto xl:hidden cursor-pointer">
        <Close2 />
      </p>
      <div className="">
        <Link
          prefetch
          href="/dashboard"
          className=""
        >
                    <Logo/>

        </Link>
      </div>
      <ul className="flex flex-col space-y-5 sm:space-y-7 sm:mt-10">
        {sideBar?.map((cat) => (
          <Link
            href={cat.path}
            className="flex items-center space-x-5 cursor-pointer"
            key={cat.title}
            prefetch
            onClick={reset}
          >
            <p>
              {pathname
                ?.replace("/dashboard/", "")
                ?.startsWith(cat?.path?.replace("/dashboard/", ""))
                ? cat.icon2
                : cat.icon}
            </p>
            <p
              className={
                pathname
                  ?.replace("/dashboard/", "")
                  ?.startsWith(cat?.path?.replace("/dashboard/", ""))
                  ? "text-[#2550C0] font-semibold"
                  : "text-[#CBCBCB]"
              }
            >
              {cat.title}
            </p>
          </Link>
        ))}
      </ul>
      <hr className="my-5 h-0.5 w-3/4 bg-[#CBCBCB]" />
      <div
        onClick={logoutFn}
        className="flex space-x-2 items-center cursor-pointer"
      >
        <p>
          <Logout />
        </p>
        <p className="flex items-center space-x-3 text-[#FF0E00] font-semibold">
          Logout
        </p>
      </div>
      <Link
        href="/dashboard/profile"
        className="absolute bottom-2 lg:bottom-10 left-0 flex items-center justify-center space-x-4 mx-auto w-full capitalize cursor-pointer"
      >
        <Image src={profile} className="" alt="profile" />

        <p>{user?.firstName}</p>
      </Link>
    </div>
  );
}
