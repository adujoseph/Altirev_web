"use client";
import React from "react";
import { CheckIcon } from "../icons/Social";
import Image from "next/image";
import vector from "@/app/imgs/grey.png";
import Link from "next/link";
import { Plan } from "../typings";
import usePlan from "../hooks/usePlan";

export default function Plans() {
  const { plan, handlePlanId } = usePlan();
  return (
    <div>
      <article className="bg-[#212121] w-[90%] lg:w-[80%] py-4 mx-auto flex justify-around  rounded-xl my-5 lg:h-[500px] items-center overflow-hidden">
        <div className="hidden sm:flex items-center absolute justify-center w-3/4 mt-40">
          <Image src={vector} className="w-full" alt="" />
          <Image src={vector} className="w-full" alt="" />
          <Image src={vector} className="w-full" alt="" />
        </div>
        <aside className="w-full mx-auto ">
          <h2 className="text-3xl text-white font-semibold text-center mt-20 xl:mt-32">
            Subscription Plans
          </h2>
          <p className="text-white text-center p-3 sm:w-3/4 mx-auto my-5">
            Choose from our range of affordable pricing plans designed to
            provide you with the features and support you need, backed by
            transparent pricing and no hidden fees.
          </p>
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between text-white border-t-2 border-white mt-4">
            {plan?.data?.length > 0 &&
              plan?.data.map((item: Plan) => (
                <>
                  <div key={item?.id} className="p-3 lg:p-10 m-2 z-20">
                    <span className="flex flex-col space-y-2">
                      <h1 className="text-xl font-semibold">{item?.title}</h1>
                      <p className="">{item?.subtitle}</p>
                      <Link
                        href={item.link}
                        onClick={() => handlePlanId(item)}
                        className={`rounded p-2 w-max text-sm cursor-pointer ${
                          !item?.pricing
                            ? "border-[1px] border-white"
                            : "bg-[#2550C0]"
                        }`}
                      >
                        Subscribe {item?.title}
                      </Link>
                    </span>
                    <div className="text-xs text-[#fff] flex flex-col space-y-4 mt-4">
                      <span className="flex items-center space-x-2">
                        <p>
                          <CheckIcon />
                        </p>
                        <p>{item?.feature}</p>
                      </span>
                      {item?.description && (
                        <span className="flex items-center space-x-2">
                          <p>
                            <CheckIcon />
                          </p>
                          <p>{item?.description}</p>
                        </span>
                      )}
                    </div>
                  </div>
            
                  <p className="sm:h-[380px] w-0.5 bg-white" />
                </>
              ))}
          </div>
        </aside>
      </article>
    </div>
  );
}
