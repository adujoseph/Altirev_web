"use client";
import React, { useEffect, useState } from "react";
import PieChart from "./Chart";
import { ArrowView, BackArrow, EyeView, FilterView } from "../icons/Arrow";
import Link from "next/link";
import { ElectionCard } from "./ElectionList";
import { getApi } from "../services";
import Loading from "../loading";
import { addThousandSeparator } from "../utils";
import { VoteBreakDown } from "./VoteBreakDown";
import { useStateContext } from "../context/context";
import { partyColors } from "../constant/party";

export default function PastLive({ handleModal, data, loading }: any) {
  const [details, setDetails] = useState<null | any>();
  const [electiondetails, setElectionDetails] = useState<null | any>();
  const [view, setView] = useState(1);
  const { setElectionData, setShowOverview } = useStateContext();
  const [show, setShow] = useState(false);
  const handleShow = (item: any) => {
    setDetails(item);
    setView(2);
  };
  const handleBack = () => {
    setView(1);
    setDetails(null);
    setShowOverview(false);
  };
  const handleElectionResult = async () => {
    setShow(true);
    const resp = await getApi(`polls/vote_count/${details?.id}`);
    const mergedData = resp?.resultArray?.map((vote: any) => {
      const partyColor = partyColors.find(
        (color) => color.party === vote.partyName
      );
      return {
        ...vote,
        partyColor: partyColor ? partyColor.color : null,
      };
    });
    setElectionDetails({
      date: details?.createdAt,
      resultArray: mergedData,
      totalAccreditedVoters: resp?.totalAccreditedVoters,
      totalInvalidVotes: resp?.totalInvalidVotes,
      totalVotesCasted: resp?.totalVotesCasted,
    });
    setShowOverview(true);
    setElectionData({
      date: details?.createdAt,
      name: details?.name,
    ...resp,
    });
    setShow(false);
  };

  useEffect(() => {
    details?.id && handleElectionResult();
  }, [details?.id]);
  return (
    <>
      {view === 2 && (
        <>
          {show ? (
            <Loading />
          ) : electiondetails?.totalVotesCasted ? (
            <>
              <span
                onClick={handleBack}
                className="flex my-4 cursor-pointer items-center space-x-1 pl-5"
              >
                <>
                  <BackArrow color="#272727" />
                </>
                <p className="font-semibold text-[#272727]">Back</p>
              </span>
              <div onClick={() => setView(3)} className="ml-auto flex w-max">
                <span className="flex items-center space-x-2 border-b-2 border-[#272727] w-max cursor-pointer">
                  <p>view all</p>
                  <ArrowView color="#272727" />
                </span>
              </div>
              <aside className="bg-white rounded-lg shadow p-4 my-8 w-full">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xl">
                    {new Date(details?.createdAt).getFullYear()}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold sm:text-xl">
                      {details?.description}
                    </p>
                    {/* <p
                      onClick={handleModal}
                      className="w-max border-[1px] border-[#CBCBCB] rounded flex items-center justify-center p-2 cursor-pointer"
                    >
                      <FilterView />
                    </p> */}
                  </div>
                </div>
                <aside className="flex flex-col space-y-2  items-center sm:flex-row sm:justify-between w-full">
                  <div className="w-full sm:w-2/3">
                    {/* <ChartData type="PieChart" data={data} options={options} /> */}
                    <PieChart electiondetails={electiondetails} />
                  </div>
                  <div className=" p-4 w-full sm:w-1/3">
                    <h2 className="font-semibold text-xl">
                      Accredited Voters:
                    </h2>
                    <p className="font-semibold text-[#656565]">
                      {addThousandSeparator(
                        electiondetails?.totalAccreditedVoters
                      )}
                    </p>
                    <h2 className="font-semibold text-xl mt-4">Vote Casted:</h2>
                    <p className="font-semibold text-[#656565]">
                      {addThousandSeparator(electiondetails?.totalVotesCasted)}
                    </p>

                    <div className="my-4 flex flex-col">
                      <h2 className="font-semibold text-xl">Valid Vote</h2>
                      <span>
                        <progress
                          className="progressBar"
                          value={
                            ((electiondetails?.totalVotesCasted -
                              electiondetails?.totalInvalidVotes) /
                              electiondetails?.totalVotesCasted) *
                            100
                          }
                          max={100}
                        >
                          {(
                            ((electiondetails?.totalVotesCasted -
                              electiondetails?.totalInvalidVotes) /
                              electiondetails?.totalVotesCasted) *
                            100
                          )?.toFixed(2)}
                          %
                        </progress>
                      </span>
                      <p className="text-[#656565]">
                        {addThousandSeparator(
                          electiondetails?.totalVotesCasted -
                            electiondetails?.totalInvalidVotes
                        )}{" "}
                        ({" "}
                        {(
                          ((electiondetails?.totalVotesCasted -
                            electiondetails?.totalInvalidVotes) /
                            electiondetails?.totalVotesCasted) *
                          100
                        )?.toFixed(2)}
                        %)
                      </p>
                    </div>
                    <div className=" flex flex-col">
                      <h2 className="font-semibold text-xl">Invalid Vote</h2>
                      <span>
                        <progress
                          className="progressBar"
                          value={
                            (electiondetails?.totalInvalidVotes /
                              electiondetails.totalVotesCasted) *
                            100
                          }
                          max={100}
                        >
                          {(
                            (electiondetails?.totalInvalidVotes /
                              electiondetails?.totalVotesCasted) *
                            100
                          )?.toFixed(2)}
                          %
                        </progress>
                      </span>
                      <p className="text-[#656565]">
                        {" "}
                        {addThousandSeparator(
                          electiondetails?.totalInvalidVotes
                        )}{" "}
                        ({" "}
                        {(
                          (electiondetails?.totalInvalidVotes /
                            electiondetails?.totalVotesCasted) *
                          100
                        )?.toFixed(2)}
                        %)
                      </p>
                    </div>
                  </div>
                </aside>
              </aside>
              <Link
                prefetch
                href="/dashboard/liveFeed"
                className="text-white bg-[#2550C0] rounded-lg flex items-center flex-col sm:flex-row sm:justify-between"
              >
                <div className="w-full sm:w-1/2 p-3 sm:p-7 flex flex-col space-y-2">
                  <h2 className="font-semibold  text-xl">
                    View Polling Unit Reports
                  </h2>
                  <p>
                    Click to follow live election updates and vote counts in
                    real-time with our interactive report. Stay informed as
                    numbers change.
                  </p>
                </div>
                <div className="flex p-3 flex-col sm:items-center sm:justify-center w-full sm:w-1/3">
                  <p>
                    <EyeView />
                  </p>
                  <span className="flex items-center space-x-2">
                    <p className="text-sm ">View List</p>
                    <p className="mt-1">
                      <ArrowView color="#fff" />
                    </p>
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <span
                onClick={handleBack}
                className="flex my-4 cursor-pointer items-center space-x-1 pl-5"
              >
                <>
                  <BackArrow color="#272727" />
                </>
                <p className="font-semibold text-[#272727]">Back</p>
              </span>
              <p className="font-semibold mt-4 text-gray-500 ">No Result</p>
            </>
          )}
        </>
      )}

      {view === 3 && (
        <VoteBreakDown
          data={{
            totalVotes: electiondetails?.totalVotesCasted,
            results: electiondetails?.resultArray,
          }}
          setView={setView as never}
          handleModal={handleModal}

        />
      )}

      {view === 1 && (
        <div className="w-full sm:w-1/2">
          {loading ? (
            <p className="flex items-center p-4 justify-center">
              <svg
                className="animate-spin size-10 p-2.5 mr-3 border-l-transparent border-2 rounded-full border-[#3399FF]"
                viewBox="0 0 24 24"
              ></svg>
            </p>
          ) : data?.length > 0 ? (
            data?.map((item: any) => (
              <ElectionCard
                item={item}
                color="#fff"
                handleShow={handleShow}
                key={item?.id}
              />
            ))
          ) : (
            <p className="font-semibold mt-4 text-gray-500 ">No Result</p>
          )}
        </div>
      )}
    </>
  );
}
