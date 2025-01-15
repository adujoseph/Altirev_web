import Image from "next/image";
import Countdown from "./timer";
import bg from "../imgs/vote.png";

export const CountDown = ({ handleShow }: any) => (
  <div>
    <span onClick={handleShow} className="flex items-center p-5 cursor-pointer">
      <p> 👈</p>
      <p className="text-[#272727] font-medium">back</p>
    </span>
    <article className="flex items-center justify-center space-y-4 flex-col p-5 sm:p-10">
      <h2 className="mt-6 text-center font-bold text-2xl bg-black rounded p-3 text-white">
        COUNT DOWN
      </h2>
      <Image src={bg} className="w-full sm:w-2/3" alt="" />
      <Countdown
        targetDate={"December 31, {new Date().getFullYear()} 10:00:00"}
      />
      <span>
        <h2 className="mt-5 text-xl font-semibold text-center text-[#272727]">
          Nigeria Presidential Election{" "}
        </h2>
        <p className="text-center text-[#272727]">
          28th of Feburary, {new Date().getFullYear()}
        </p>
      </span>
    </article>
  </div>
);
