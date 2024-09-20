import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  body: string;
  color: string;
  img: any;
  position:boolean
}

export const SectionCard = ({ title, body, color, img, position }: Props) => (
  <aside
    className={
      !position
        ? "flex sm:space-x-4 flex-col space-y-3 sm:flex-row-reverse"
        : "flex flex-col space-y-3 sm:flex-row sm:space-x-4"
    }
  >
    <div
      style={{
        background: color,
      }}
      className={`rounded-xl p-4 shadow-sm w-[320px] sm:w-[400px] flex items-center justify-center flex-col text-white ${
        !position ? "ml-5" : "ml-0"
      }`}
    >
      <h2>{title}</h2>
      <p className="w-3/4 h-1 my-2 bg-white" />
      <p>{body}</p>
    </div>
    <Image src={img} className="w-full rounded-xl" alt={title} />
  </aside>
);
