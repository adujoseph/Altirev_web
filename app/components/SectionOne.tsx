import React from "react";
import { SectionList } from "../constant";
import { SectionCard } from "./SectionCard";
import { tree } from "next/dist/build/templates/app-page";

export default function SectionOne() {
  return (
    <div className=" w-full sm:w-3/4 mx-auto my-20 ">
      <h2 className="text-[#2550C0] text-3xl text-center font-medium my-4">Our Unique Value Proposition</h2>
      <p className="text-center my-4 w-3/4 mx-auto">
        We specialize in providing impartial and expert monitoring to promote
        free and fair elections, building public trust and fostering democratic
        values.
      </p>
      <article className="flex space-y-5 flex-col justify-center items-center">
        {SectionList.map((item,i) => (
          <SectionCard
            img={item.image}
            key={item.title}
            body={item.body}
            color={item.color}
            title={item.title}
            position={i % 2 == 0 ? true : false}
          />
        ))}
      </article>
    </div>
  );
}
