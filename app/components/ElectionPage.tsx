"use client";
import Analysis, { ShowIncident } from "@/app/components/Analysis";
import PieChart from "@/app/components/Chart";
import ModalCard from "@/app/components/modal/Modal";
import CircularProgressBar from "@/app/components/ProgressBar";
import { partyColors } from "@/app/constant/party";
import { useStateContext } from "@/app/context/context";
import useReport from "@/app/hooks/useReport";
import { BackArrow } from "@/app/icons/Arrow";
import { Accredited } from "@/app/icons/Toast";
import { Incident } from "@/app/icons/Toast";
import Loading from "@/app/loading";
import { getApi } from "@/app/services";
import { addThousandSeparator } from "@/app/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const ElectionPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [electiondetails, setElectionDetails] = useState<null | any>(null);
  const [view, setView] = useState(1);

  const { setOpenMenu, setShowOverview, setElectionData} = useStateContext()
  // Toggle fullscreen only changes local state here
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  // Listen for fullscreen change → update local state only
  useEffect(() => {
    const handleFullscreenChange = () => {
      // toggleFullscreen()
    setOpenMenu(false);

      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const { report } = useReport("");

  const handleElectionResult = async () => {
    const resp = await getApi(`polls/vote_count/${id}`);
    const newField = {
      partyName: "Invalid Votes",
      partyVote: resp?.totalInvalidVotes,
    };
    const res = [...(resp?.resultArray || []), newField];
    const mergedData = res.map((vote: any) => {
      const partyColor = partyColors.find(
        (color) => color.party === vote.partyName
      );
      return {
        ...vote,
        partyColor: partyColor ? partyColor.color : "#dfdfdf",
      };
    });

    // Update local state first
    setElectionDetails({
      resultArray: mergedData,
      totalAccreditedVoters: resp?.totalAccreditedVoters,
      totalInvalidVotes: resp?.totalInvalidVotes,
      totalVotesCasted: resp?.totalVotesCasted,
    });

      setShowOverview(true);
      setElectionData({
        resultArray: mergedData,
        totalAccreditedVoters: resp?.totalAccreditedVoters,
        totalInvalidVotes: resp?.totalInvalidVotes,
        totalVotesCasted: resp?.totalVotesCasted,
      });
  };

  useEffect(() => {
    if(!id) return;
      handleElectionResult()
  }, [id]);

  const totalVote =
    (electiondetails?.totalVotesCasted ?? 0) +
    (electiondetails?.totalInvalidVotes ?? 0);

  return (
    <>
      {electiondetails? 
      <div className="px-0 sm:px-20">
        {/* <span
          // onClick={() => router.back()}
          className="flex my-4 cursor-pointer items-center space-x-1"
        >
          <BackArrow color="#272727" />
          <p className="font-semibold text-[#272727]">Back</p>
        </span> */}
        <h2 className="text-center font-semibold text-xl">
          {new Date(date??'').getFullYear()}{" "}
          {name}
        </h2>
        <section className="w-full flex flex-col space-y-4 items-center sm:space-y-0 justify-center sm:justify-around sm:flex-row mt-10">
          <div>
            <CircularProgressBar
              percentage={
                electiondetails?.totalAccreditedVoters
                  ? (
                      (totalVote / electiondetails.totalAccreditedVoters) *
                      100
                    ).toFixed(2)
                  : 0
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Incident />
            <Link
              href="/dashboard/report/escalated"
              onClick={() => setView(2)}
              className="flex items-center text-red-500 font-semibold text-2xl ml-20 space-x-2 hover:underline cursor-pointer"
            >
              <p>{report?.data?.length ?? 0}</p>
              <p>Incidents</p>
            </Link>
          </div>
          <div>
            <PieChart electiondetails={electiondetails} />
          </div>
        </section>
        <section className="w-full flex flex-col space-y-2 p-5 sm:p-0 sm:justify-between sm:flex-row mt-20 sm:space-y-0">
          <div>
            <p className="text-xl text-[#272727]">Vote Casted</p>
            <h1 className="text-4xl font-semibold">
              {addThousandSeparator(totalVote)}
            </h1>
          </div>
          <div>
            <p className="text-xl text-[#272727]">Accredited Voters</p>
            <span className="flex items-center">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <Accredited key={index} />
                ))}
              {addThousandSeparator(electiondetails?.totalAccreditedVoters)}
            </span>
          </div>
        </section>
      </div>: <Loading/>}
    </>
  );
};

export default ElectionPage;
