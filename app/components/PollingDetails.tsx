import Image from "next/image";
import {
  Accredited,
  CastedVotes,
  DownloadVotes,
  InvalidVotes,
} from "../icons/Search";
import { Votes } from "./Votes";
import Card from "./Card";
import { ApprovedImg, BackArrow, RejectedImg } from "../icons/Arrow";
import voteDown from "../imgs/votedoc.png";
import { ReportType } from "../typings";
import Loading from "../loading";
import "video-react/dist/video-react.css";
import { useEffect, useRef, useState } from "react";
import { Player } from "video-react";
import { addThousandSeparator } from "../utils";
import { PreviewImg } from "./PreviewImg";
interface Props {
  handleDetails: () => void;
  type: string;
  loading: boolean;
  data: ReportType;
  title: string;
  user: any;
}

export const PollingDetails = ({
  type,
  handleDetails,
  data,
  loading,
  title,
  user,
}: Props) => {
  const audioRef: any = useRef(null);
  const [counts, setCounts] = useState([]);
  const [modalImg, setModalImg] = useState(false);

  const handleModalImg = () => setModalImg((prev) => !prev);

  const countArr = () => {
    const array: any = Object.entries(data?.counts).map(([party, votes]) => ({
      party,
      votes: parseInt(votes, 10), // Convert votes to numbers
    }));
    setCounts(array);
  };

  useEffect(() => {
    data?.counts && countArr();
  }, [data?.counts]);
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
          <h2 className="capitalize font-medium">
            {data?.pollingUnit} Polling Unit
          </h2>
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

                  <div className="!h-[400px] !flex-1 flex overflow-hidden w-full rounded-lg">
                    {/* videos */}

                    <Player
                      playsInline
                      src={data?.videoUrl ?? ""}
                      fluid={false}
                      width={350}
                      height={400}
                    />
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
                Result
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
            {modalImg && (
              <PreviewImg
                img={data?.fileUrl ?? ""}
                modal={modalImg}
                handleModal={handleModalImg}
              />
            )}
            <section>
              <h2 className="bg-[#F4F4F4] w-full py-2 px-6">Document</h2>
              <div className="p-5">
                <h2 className="font-semibold">CTC Copy of the Election</h2>
                <p className="text-sm">
                  This is the CTC copy taken by the agent
                </p>
                <hr className="my-4" />
                <div className="bg-[#CBCBCB] flex items-center justify-center p-2 flex-col relative">
                  <img
                    className="size-[300px] object-cover"
                    src={data?.fileUrl}
                    alt="doc"
                  />
                  <p
                    onClick={handleModalImg}
                    className="ml-auto  absolute bottom-3 cursor-pointer right-10"
                  >
                    <DownloadVotes />
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex-col flex">
                <Card>
                  <h2 className="shadow w-full py-4 px-6">Party Votes</h2>
                  <div className="p-5 flex flex-col space-y-2">
                    {counts?.length > 0
                      ? counts?.map((i) => (
                          <span className="flex flex-col">
                            <p className="text-[#656565]">
                              Overall votes for {i?.party}
                            </p>
                            <h2 className="font-semibold">
                              {addThousandSeparator(i?.votes ?? 0)}
                            </h2>
                          </span>
                        ))
                      : null}
                  </div>
                </Card>
                {data?.status === "processing" &&
                  user?.role === "comms" &&
                  title !== "Observer" && (
                    <Card>
                      <div className="flex items-center justify-center flex-col p-5 space-y-2">
                        <button className="w-full bg-[#FF0E00] text-white rounded font-semibold capitalize p-2 ">
                          reject
                        </button>
                        <button className="w-full bg-[#2550C0] text-white rounded font-semibold capitalize p-2 ">
                          approve
                        </button>
                      </div>
                    </Card>
                  )}
                {data?.status === "rejected" && (
                  <Card>
                    <div className="p-5">
                      <h2 className="font-semibold"> Reason for Rejection</h2>
                      <hr className="bg-black my-2 h-0.5" />
                      <p>{data?.reasons}</p>
                    </div>
                  </Card>
                )}
                {data?.status === "rejected" && (
                  <Card>
                    <div className="p-5 relative">
                      <p>{data?.status === "rejected" && <RejectedImg />}</p>
                      <p className="bottom-3 right-3 absolute">
                        {`${user?.firstName} ${user.lastName}`}
                      </p>
                    </div>
                  </Card>
                )}
                {data?.status === "approved" && (
                  <Card>
                    <div className="p-5 relative">
                      <p>{data?.status === "approved" && <ApprovedImg />}</p>
                      <p className="bottom-3 right-3 absolute">
                        {`${user?.firstName} ${user.lastName}`}
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </section>
          </>
        )}
      </section>
    </Card>
  );
};
