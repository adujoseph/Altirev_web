"use client";
import Card from "@/app/components/Card";
import { PollingDetails } from "@/app/components/PollingDetails";
import { SearchField } from "@/app/components/Search";
import useReport from "@/app/hooks/useReport";
import { ArrowView, FilterView } from "@/app/icons/Arrow";
import Loading from "@/app/loading";
import { ReportType } from "@/app/typings";
import React, { useEffect, useState } from "react";

export default function page() {
  const {
    reportSearch,
    reportByID,
    report,
    inputText,
    setInputText,
    details,
    setDetails,
    handleDetails,
  } = useReport("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [details]);
  return (
    <div>
      <h2 className="text-2xl font-bold">Polling Unit Reports</h2>
      <div className="flex flex-col-reverse lg:flex-row">
        <section className="w-full lg:w-2/3">
          <Card>
            <div className="flex items-center space-x-4 justify-center p-5 shadow">
              <span className="">
                <SearchField
                  inputText={inputText}
                  setInputText={setInputText}
                />
              </span>
              <p
                // onClick={handleModal}
                className=""
              >
                <FilterView />
              </p>
            </div>
            <div className="flex flex-col  h-screen overflow-y-scroll">
              {report?.isLoading ? (
                <span className="flex items-center justify-center">
                  <Loading />
                </span>
              ) : reportSearch?.length > 0 ? (
                reportSearch?.map((i: ReportType) => (
                  <aside
                    key={i.id}
                    onClick={() => handleDetails(i)}
                    className="flex items-center justify-between py-3 px-6 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      {/* <span>
                        <img
                          className="size-10 rounded-full object-cover"
                          src={i?.imageUrl ?? ""}
                          alt="report"
                        />
                      </span> */}
                      <span className="flex flex-col">
                        <h2 className="font-medium">{i?.title} Polling Unit</h2>
                        <small className="text-[#272727]">
                          {new Date(i?.createdAt)?.toDateString()}
                        </small>
                      </span>
                      <p className="p-2 bg-[#FFEFEE] w-max rounded text-sm font-medium">
                        Report
                      </p>
                    </div>
                    <p>
                      <ArrowView color="#BCBCBC" />
                    </p>
                  </aside>
                ))
              ) : (
                <p className=" font-semibold p-5 text-gray-500 capitalize">
                  no result
                </p>
              )}
            </div>
          </Card>
        </section>
        {details && (
          <div className="w-full lg:w-1/3">
            <PollingDetails
              handleDetails={() => setDetails(false)}
              loading={reportByID?.isLoading}
              data={reportByID?.data}
              type={"report"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
