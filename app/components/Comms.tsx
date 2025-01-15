"use client";
import React, { useState } from "react";
import {
  DashboardAgent,
  DashboardReport,
  DashboardReportClip,
} from "../icons/Dashboard";
import Card from "./Card";
import { ArrowView } from "../icons/Arrow";
import Link from "next/link";
import SkeletonTable from "./skeleton/Table";
import SendReport from "./SendReport";
import ModalCard from "./modal/Modal";
import useReport from "../hooks/useReport";
import Paginate from "./table/table";
import useResult from "../hooks/useResult";
import useRole from "../hooks/useRole";
import { addThousandSeparator } from "../utils";

export default function Comms() {
  const [reportModal, setReportModal] = useState(false);
  const handleModal = () => setReportModal((prev) => !prev);
  const { report } = useReport("");
  const { agentLists, activeAgentLists } = useRole();
  const { results } = useResult("");
  return (
    <section>
      {reportModal && (
        <ModalCard open={reportModal} setOpen={handleModal}>
          <SendReport handleModal={handleModal} modal={reportModal} />
        </ModalCard>
      )}
      <aside className="flex flex-col justify-center items-center sm:items-start sm:flex-row sm:justify-start sm:space-x-5">
        <div className="bg-[#698AE2] rounded-xl p-5 w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5">
          <span className="flex items-center justify-between">
            <p>
              <DashboardAgent />
            </p>
            <h2 className="font-bold text-white">AGENTS</h2>
          </span>
          <div className="flex items-center justify-between font-bold">
            <span className="flex flex-col text-white">
              <p>Total</p>
              <h1 className="text-xl">
                {addThousandSeparator(agentLists?.length ?? 0)}
              </h1>
            </span>
            <span className="flex flex-col text-white">
              <p>Active</p>
              <h1 className="text-xl">
                {addThousandSeparator(activeAgentLists?.length ?? 0)}
              </h1>
            </span>
          </div>
        </div>
        <div className="bg-black rounded-xl p-5  w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5 relative text-white">
          <span>
            <h1 className="text-xl font-semibold">New Result</h1>
            <p className="text-sm">
              Stay Updated! Fresh election poll data just arrived
            </p>
          </span>

          <h1 className="ml-auto bottom-5 right-5 text-4xl font-semibold absolute">
            {addThousandSeparator(results?.data?.length) ?? 0}
          </h1>
        </div>
        {/* <div className="bg-white rounded-xl p-5  w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5 relative ">
          <div className="flex items-center justify-between">
            <span>
              <h1 className="text-xl font-semibold"> Send Report</h1>
              <p className="text-sm">Click to “Quickly send Report”</p>
            </span>
            <p>
              <DashboardReport />
            </p>
          </div>

          <span
            onClick={handleModal}
            className="cursor-pointer p-2 ml-auto bottom-3 right-3 bg-[#2550C0] rounded-md text-white font-semibold absolute flex items-center space-x-2"
          >
            <p className="text-sm">Send Report</p>
            <p>
              <DashboardReportClip />
            </p>
          </span>
        </div> */}
      </aside>
      <Card>
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-xl text-[#272727] font-semibold">Report</h1>
          <Link prefetch href="/dashboard/report" className="">
            <span className="flex items-center font-semibold space-x-2 cursor-pointer">
              <p>view all</p>
              <ArrowView color="#000" />
            </span>
          </Link>
        </div>
        <hr />
        <div className="w-full overflow-auto my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
          {report?.isLoading ? (
            <SkeletonTable />
          ) : report?.data?.length > 0 ? (
            <Paginate
              action="view report"
              color={"#272727"}
              dropdown={[]}
              data={report.data}
            />
          ) : (
            <p className="text-[#98989A] text-xl text-center capitalize font-medium">
              no report
            </p>
          )}
        </div>
      </Card>
    </section>
  );
}
