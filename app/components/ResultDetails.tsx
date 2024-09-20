"use client";
import React, { useEffect, useState } from "react";
import { ApprovedImg, ArrowView, BackArrow, RejectedImg } from "../icons/Arrow";
import { PollingDetails } from "./PollingDetails";
import Card from "./Card";
import { AudioIcon } from "../icons/Close";
import UserDetails from "./UserDetails";
import { Approve } from "./Approve";
import { Reject } from "./Reject";
import { PlusIcon } from "../icons/Social";
import { Votes } from "./Votes";
import {
  Accredited,
  CastedVotes,
  DownloadVotes,
  InvalidVotes,
} from "../icons/Search";
import Image from "next/image";
import voteDown from "../imgs/votedoc.png";
import { SelecTags } from "./SelectTags";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import AudioWaveform from "./Waveform";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { ResultType } from "../typings";

interface Props {
  setEdit: (e: boolean) => boolean;
  data: ResultType;
  userDetails: any;
}
export default function ResultDetails({ setEdit, userDetails, data }: Props) {
  const [details, setDetails] = useState(false);
  const handleDetails = () => setDetails((prev) => !prev);
  const [modal4, setModal4] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleModal2 = () => setModal2((prev) => !prev);
  const handleModal = () => setModal((prev) => !prev);
  const handleModal3 = () => setModal3((prev) => !prev);
  const navigate = useRouter();
  const handleModal4 = () => setModal4((prev) => !prev);
  const back = () => {
    navigate.push("/dashboard/result");
    setEdit(false);
  };
    useEffect(() => {
      // Prefetch the dashboard page
      navigate.prefetch("/dashboard/result");
    }, [navigate]);
  return (
    <>
      {modal && (
        <UserDetails
          data={userDetails}
          modal={modal}
          handleModal={handleModal}
        />
      )}
      {modal4 && <SelecTags modal={modal4} handleModal={handleModal4} />}
      {modal2 && (
        <Approve
          editData={null}
          loading={false}
          modal={modal2}
          handleModal={handleModal2}
          handleSubmit={() => {}}
        />
      )}

      {modal3 && (
        <Reject
          editData={null}
          loading={false}
          modal={modal3}
          handleModal={handleModal3}
          handleSubmit={() => {}}
          setComment={() => {}}
        />
      )}
      <span
        onClick={back}
        className="flex my-4 cursor-pointer items-center space-x-1"
      >
        <>
          <BackArrow color="#272727" />
        </>
        <p className="font-semibold text-[#272727]">Back</p>
      </span>
      {data?.id ? (
        <>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="">
              <h2 className="text-xl font-bold ">{data?.title} Polling Unit</h2>
              <p className="text-[#272727]">
                {" "}
                {data?.createdAt && new Date(data?.createdAt)?.toDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                onClick={handleModal4}
                className="flex items-center space-x-2 text-[#656565] rounded py-2 px-4 w-max border-[1px] border-[#656565] font-semibold cursor-pointer"
              >
                <p>Add</p>
                <p>
                  <PlusIcon />
                </p>
              </span>
              <h2 className="bg-[#272727] text-white rounded w-max py-2 px-7">
                Presidential Result
              </h2>
            </div>
          </div>

          <hr className="my-5 bg-[#CBCBCB]" />
          <section>
            <Card>
              <aside className="flex flex-col space-y-2 sm:space-y-0 sm:items-center sm:justify-between p-3 sm:flex-row">
                <Votes
                  title="Number of Accredited Votes"
                  icon={<Accredited />}
                  num={data?.accreditedVoters}
                />
                <p className="sm:h-[80px] m-4 w-0.5 bg-[#CBCBCB]" />
                <Votes
                  title="Number of Votes Casted"
                  icon={<CastedVotes />}
                  num={data?.voteCasted}
                />
                <p className="sm:h-[80px] m-4 w-0.5 bg-[#CBCBCB]" />
                <Votes
                  title="Number of Invalid Votes"
                  icon={<InvalidVotes />}
                  num={data?.accreditedVoters}
                />
                <span
                  onClick={handleModal}
                  className="cursor-pointer flex items-center space-x-2 rounded py-2 px-4 w-max border-[1px] border-[#2550C0] justify-center text-[#2550C0] font-semibold"
                >
                  <small>View User Contact</small>
                  <p>
                    <ArrowView color="#2550C0" />
                  </p>
                </span>
              </aside>
            </Card>
          </section>
          <section className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <Card>
                <h2 className="shadow w-full py-4 px-6">Document</h2>
                <div className="p-5">
                  <section className="">
                    <div className="">
                      <h2 className="font-semibold">
                        CTC Copy of the Election
                      </h2>
                      <p className="text-sm">
                        This is the CTC copy taken by the agent
                      </p>
                      <hr className="my-4" />
                      <div className="bg-[#CBCBCB] flex items-center justify-center p-2 flex-col relative">
                        <Image src={data?.fileUrl ?? ""} alt="doc" />
                        <p className="ml-auto  absolute bottom-3 cursor-pointer right-10">
                          <DownloadVotes />
                        </p>
                      </div>
                    </div>
                  </section>
                  <span className="my-2">
                    <h2 className="font-semibold mt-4">
                      Video File of Vote Count
                    </h2>

                    {data?.videoUrl ? (
                      <>
                        <p className="text-sm">
                          This video shows the process of counting the votes.
                        </p>
                        <hr className="bg-black my-2 h-0.5" />

                        <div>
                          {/* videos */}
                          <Player>
                            <source src={data.videoUrl ?? ""} />
                          </Player>
                        </div>
                      </>
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
                          <p>
                            <AudioIcon />
                          </p>
                          {/* <AudioWaveform /> */}
                          <audio
                            className="w-1/2 bg-slate-500 p-4 h-1/2"
                            src={data?.audioUrl ?? ""}
                          ></audio>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm capitalize">No audio report</p>
                    )}
                  </span>
                </div>
              </Card>
            </div>

            <div className="w-full sm:w-1/2 flex-col flex">
              <Card>
                <h2 className="shadow w-full py-4 px-6">Party Votes</h2>
                <div className="p-5 flex flex-col space-y-2">
                  <span className="flex flex-col">
                    <p className="text-[#656565]">Overall votes for APC</p>
                    <h2 className="font-semibold">0</h2>
                  </span>
                  <span className="flex flex-col">
                    <p className="text-[#656565]">Overall votes for PDP</p>
                    <h2 className="font-semibold">0</h2>
                  </span>
                  <span className="flex flex-col">
                    <p className="text-[#656565]">Overall votes for LP</p>
                    <h2 className="font-semibold">0</h2>
                  </span>
                </div>
              </Card>
              {data?.status === "pending" && (
                <Card>
                  <div className="flex items-center justify-center flex-col p-5 space-y-2">
                    <button
                      onClick={handleModal3}
                      className="w-full bg-[#FF0E00] text-white rounded font-semibold capitalize p-2 "
                    >
                      reject
                    </button>
                    <button
                      onClick={handleModal2}
                      className="w-full bg-[#2550C0] text-white rounded font-semibold capitalize p-2 "
                    >
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
                    <p>Not detailed enough and the video part is missing</p>
                  </div>
                </Card>
              )}
              {data?.status === "rejected" && (
                <Card>
                  <div className="p-5 relative">
                    <p>{data?.status === "rejected" && <RejectedImg />}</p>
                    <p className="bottom-3 right-3 absolute">Bolaji Raphael</p>
                  </div>
                </Card>
              )}
              {data?.status === "approved" && (
                <Card>
                  <div className="p-5 relative">
                    <p>{data?.status === "approved" && <ApprovedImg />}</p>
                    <p className="bottom-3 right-3 absolute">Bolaji Raphael</p>
                  </div>
                </Card>
              )}
            </div>
          </section>
        </>
      ) : (
        <p>
          <Loading />
        </p>
      )}
    </>
  );
}
