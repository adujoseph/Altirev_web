import { useEffect, useState } from "react";
import { politicalPartyNames } from "../constant/paries";
import { BackArrow, FilterView } from "../icons/Arrow";
import { addThousandSeparator } from "../utils";
import Card from "./Card";
// import PieChart, { ChartData } from "./Chart";
import BarChartRace from "./d3Chart";

interface Props {
  data?: any;
  setView: (e?: number) => void;
}

export const VoteBreakDown = ({ data, setView }: Props) => {

  return (
    <div>
      <span
        onClick={() => setView(2)}
        className="flex items-center cursor-pointer space-x-1 p-5"
      >
        <p>
          <BackArrow color="#272727" />
        </p>
        <p className="text-[#272727] font-medium">Back</p>
      </span>
      <span className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Vote Breakdown</h2>
        <p className="w-max border-[1px] border-[#CBCBCB] rounded flex items-center justify-center p-2">
          <FilterView />
        </p>
      </span>
      <hr className="my-4" />
      <section className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <Card>
            {data?.results?.length > 0 ? (
              <BarChartRace data={data?.results} />
            ) : (
              <p className="text-gray-500 p-10">No data available</p>
            )}
          </Card>
        </div>
        <div className="w-full lg:w-1/4">
          <Card>
            <div className=" flex flex-col space-y-3 h-screen overflow-y-scroll">
              {data?.results?.map((i: any) => (
                <div className="flex items-center justify-between my-1 px-3 py-1">
                  <span className="flex items-center space-x-1">
                    <p className="text-xs">{i?.partyName}</p>
                  </span>
                  <p className="text-sm font-semibold">
                    {((i?.partyVote / data?.totalVotes) * 100)?.toFixed(0)}%
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
