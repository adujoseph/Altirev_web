import React, { useState, useEffect } from "react";
import bg from "@/app/imgs/dash.png";
import Image from "next/image";
import { BackArrow } from "../icons/Arrow";

const Countdown = ({ targetDate, handleShow }: any) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        <>
          <span
            onClick={handleShow}
            className="flex my-4 cursor-pointer items-center space-x-1 pl-5"
          >
            <>
              <BackArrow color="#272727" />
            </>
            <p className="font-semibold text-[#272727]">Back</p>
          </span>
          <h2 className="px-5 py-3 rounded bg-black text-white uppercase flex items-center mx-auto my-7 justify-center  w-max">
            count down
          </h2>
          <Image
            src={bg}
            className="w-full sm:w-1/2 flex items-center justify-center mx-auto"
            alt=""
          />

          <article className="flex items-center sm:space-x-5 flex-wrap justify-center px-10">
            <div className="flex items-center justify-center flex-col">
              <h2 className="shadow-md rounded py-4 px-8 size-20 m-4 flex text-[#515151] font-semibold text-2xl items-center justify-center ">
                {timeLeft?.days}
              </h2>
              <p className="mb-4 font-semibold">Days</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h2 className="shadow-md rounded py-4 px-8 size-20 m-4 flex text-[#515151] font-semibold text-2xl items-center justify-center ">
                {timeLeft?.hours}
              </h2>
              <p className="mb-4 font-semibold">Hours</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h2 className="shadow-md rounded py-4 px-8 size-20 m-4 flex text-[#515151] font-semibold text-2xl items-center justify-center ">
                {timeLeft?.minutes}
              </h2>
              <p className="mb-4 font-semibold">Minutes</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h2 className="shadow-md rounded py-4 px-8 size-20 m-4 flex text-[#515151] font-semibold text-2xl items-center justify-center ">
                {timeLeft?.seconds}
              </h2>
              <p className="mb-4 font-semibold">Seconds</p>
            </div>
          </article>
          <div className="flex items-center justify-center flex-col my-5">
            <h2 className="text-[#272727] font-semibold">
              Nigeria Presidential Election{" "}
            </h2>
            <p className="text-xs font-semibold">28th of Feburary, 2024</p>
          </div>
        </>
      ) : (
        <h1 className="text-center text-xl font-semibold">
          No Upcoming Election
        </h1>
      )}
    </div>
  );
};

export default Countdown;
