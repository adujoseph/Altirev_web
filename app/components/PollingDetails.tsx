import Image from "next/image";
import {
  Accredited,
  CastedVotes,
  DownloadVotes,
  InvalidVotes,
} from "../icons/Search";
import { Votes } from "./Votes";
import Card from "./Card";
import { BackArrow } from "../icons/Arrow";
import voteDown from "../imgs/votedoc.png";
import { ReportType } from "../typings";
import Loading from "../loading";
import "video-react/dist/video-react.css";
import { useRef } from "react";
import { Player } from "video-react";
interface Props {
  handleDetails: () => void;
  type: string;
  loading: boolean;
  data: ReportType;
}

export const PollingDetails = ({ type, handleDetails, data, loading }: Props) => { 
  const audioRef: any = useRef(null);
  return (
    <Card>
      <aside className="flex space-x-4 p-4 shadow w-full">
        <p
          onClick={handleDetails}
          className="cursor-pointer rounded border-[1px] bg-gray-50 py-1 px-3.5 flex items-center justify-center "
        >
          <BackArrow />
        </p>
        <div className="">
          <h2 className="capitalize font-medium">{data?.lga} Polling Unit</h2>
          <p className="text-[#272727] text-sm">
            {new Date(data?.createdAt)?.toDateString()}
          </p>
        </div>
      </aside>
        <section>
          {type !== "result" ? (
            <div className="p-4">
              <span>
                <h1 className="font-semibold ">Comment</h1>
                <hr className="bg-black my-2 h-0.5" />

                <p className="">{data?.message}</p>
              </span>
              <span className="my-2">
                <h2 className="font-semibold mt-4">Video File of Report</h2>
                <p className="text-sm">
                  This video shows the evidence of the incident.
                </p>
                {data?.videoUrl ? (
                  <span>
                    <hr className="bg-black my-2 h-0.5" />

                    <div className="w-[400px]">
                      {/* videos */}
                      <Player>
                        <source src={data?.videoUrl ?? ""} />
                      </Player>
                    </div>
                  </span>
                ) : (
                  <p className="text-sm capitalize">No video report</p>
                )}
              </span>
              <span className="my-2">
                <h2 className="font-semibold">Audio Recording</h2>

                {data?.audioUrl ? (
                  <>
                    <p className="text-sm">
                      Audio recording during the election.
                    </p>
                    <hr className="bg-black my-2 h-0.5" />

                    <div>
                      <audio
                        controls
                        ref={audioRef}
                        className=""
                        src={data?.audioUrl}
                        // onTimeUpdate={handleTimeUpdate}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm capitalize">No audio report</p>
                )}
              </span>
            </div>
          ) : (
            <>
              <section className="p-5">
                <h2 className="bg-[#272727] text-white rounded w-max py-2 px-7">
                  Presidential Result
                </h2>
                <aside className="flex space-y-2 flex-col">
                  <Votes
                    title="Number of Accredited Votes"
                    icon={<Accredited />}
                    num={data?.accreditedVoters ?? 0}
                  />
                  <Votes
                    title="Number of Votes Casted"
                    icon={<CastedVotes />}
                    num={data?.voteCasted ?? 0}
                  />
                  <Votes
                    title="Number of Invalid Votes"
                    icon={<InvalidVotes />}
                    num={data?.accreditedVoters ?? 0}
                  />
                </aside>
              </section>
              <section>
                <h2 className="bg-[#F4F4F4] w-full py-2 px-6">Document</h2>
                <div className="p-5">
                  <h2 className="font-semibold">CTC Copy of the Election</h2>
                  <p className="text-sm">
                    This is the CTC copy taken by the agent
                  </p>
                  <hr className="my-4" />
                  <div className="bg-[#CBCBCB] flex items-center justify-center p-2 flex-col relative">
                    <Image src={data?.imageUrl} alt="doc" />
                    <p className="ml-auto  absolute bottom-3 cursor-pointer right-10">
                      <DownloadVotes />
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </section>
    </Card>
  );};
