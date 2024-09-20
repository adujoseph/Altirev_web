'use client'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import classNames from "classnames";

function DashboardWrapper({ children }:any) {
  const { openMenu, handleToggle, setOpenMenu } = useStateContext();
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
  }, [windowSize]);

  return (
    <section
      className={classNames("", {
        "ml-[210px] p-5 w-[83%]": openMenu,
        "ml-0 p-2 w-full": !openMenu,
      })}
    >
      <span
        className={classNames("cursor-pointer", {
          "lg:hidden fixed top-0 left-44 z-[2000] bg-secondary/50 mb-2 p-1 flex items-center justify-center rounded-full":
            openMenu,
          "left-10": !openMenu,
        })}
      >
        {openMenu ? (
          <XMarkIcon onClick={handleToggle} className="h-6 w-6 text-red-500" />
        ) : (
          <Bars3Icon onClick={handleToggle} className="h-6 w-6 text-[#000]" />
        )}
      </span>
      {children}
    </section>
  );
}

export default DashboardWrapper;
