"use client";
import React, { useEffect, useRef, useState } from "react";
import { ApprovedImg, ArrowView, BackArrow, RejectedImg } from "../icons/Arrow";
import { PollingDetails } from "./PollingDetails";
import Card from "./Card";
import { AudioIcon } from "../icons/Close";
import UserDetails from "./UserDetails";
import { Approve } from "./Approve";
import { Reject } from "./Reject";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { useRouter } from "next/navigation";
import { LiveAudioVisualizer, AudioVisualizer } from "react-audio-visualize";
import { Escalate } from "./Escalate";
import useReport from "../hooks/useReport";
import { ReportType } from "../typings";
import Loading from "../loading";

interface Props {
  setEdit: (e: boolean) => boolean;
  userDetails: any;
  details: ReportType;
}

export default function ReportDetails({
  setEdit,
  userDetails,
  details,
}: Props) {
  const [modal3, setModal3] = useState(false);
  const [modal, setModal] = useState(false);
  const [escalate, setEscalate] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleModal2 = () => setModal2((prev) => !prev);
  const handleModal = () => setModal((prev) => !prev);
  const handleModal3 = () => setModal3((prev) => !prev);
  const [mediaRecorder, setMediaRecorder] = useState(details?.audioUrl ?? "");
  const [blob, setBlob] = useState<Blob>();
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const navigate = useRouter();
      // const sanitizedHTML = DOMPurify.sanitize('');

  const back = () => {
    navigate.push("/dashboard/report");
    setEdit(false);
  };
  const handleEscalateModal = () => setEscalate((prev) => !prev);
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/dashboard/report");
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
          sanitizedHTML={''}
        />
      )}
      {escalate && (
        <Escalate
          editData={null}
          loading={false}
          modal={escalate}
          handleModal={handleEscalateModal}
          handleSubmit={() => {}}
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
      {details?.id ? (
        <>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="">
              <h2 className="text-xl font-bold capitalize">
                {details?.title} Polling Unit
              </h2>
              <p className="text-[#272727] text-sm">
                {details?.createdAt &&
                  new Date(details?.createdAt)?.toDateString()}
              </p>
            </div>
            <h2
              onClick={handleEscalateModal}
              className="bg-[#272727] cursor-pointer text-white rounded w-max py-2 px-7"
            >
              Escalate to Moderator
            </h2>
          </div>

          <hr className="my-5 bg-[#CBCBCB]" />
          <section className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <Card>
                <div className="p-4">
                  <span className="my-2">
                    <h2 className="font-semibold mt-4">Video File of Report</h2>

                    {details?.videoUrl ? (
                      <>
                        <p className="text-sm">
                          This video shows the evidence of the incident.
                        </p>
                        <hr className="bg-black my-2 h-0.5" />

                        <div>
                          {/* videos */}
                          <Player>
                            <source src={details.videoUrl ?? ""} />
                          </Player>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm capitalize">No video report</p>
                    )}
                  </span>
                  <span className="my-2">
                    <h2 className="font-semibold">Audio Recording</h2>

                    {details?.audioUrl ? (
                      <>
                        <p className="text-sm">
                          Audio recording during the election.
                        </p>
                        <hr className="bg-black my-2 h-0.5" />
                        <div>
                          {mediaRecorder && (
                            <LiveAudioVisualizer
                              mediaRecorder={mediaRecorder}
                              width={200}
                              height={75}
                              barWidth={1}
                              gap={0}
                              barColor={"#f76565"}
                            />
                          )}
                          {blob && (
                            <AudioVisualizer
                              ref={visualizerRef}
                              blob={blob}
                              width={500}
                              height={75}
                              barWidth={1}
                              gap={0}
                              barColor={"#f76565"}
                            />
                          )}
                          {/* <p>
                    <AudioIcon />
                  </p> */}
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
                <div className="p-5">
                  <span
                    onClick={handleModal}
                    className="cursor-pointer ml-auto flex items-center space-x-2 rounded py-2 px-4 w-max border-[1px] border-[#2550C0] justify-center text-[#2550C0] font-semibold"
                  >
                    <small>View User Contact</small>
                    <p>
                      <ArrowView color="#2550C0" />
                    </p>
                  </span>
                  <span className="my-2">
                    <h2 className="font-semibold"> Comment</h2>
                    <hr className="bg-black my-2 h-0.5" />
                    <p>{details?.message}</p>
                  </span>
                </div>
              </Card>
              {details?.status === "pending" && (
                <Card>
                  <div className="flex items-center justify-center flex-col p-5 space-y-2">
                    <button
                      onClick={handleModal3}
                      className="w-full bg-[#FF0E00] text-white rounded font-semibold capitalize p-2 "
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleModal2}
                      className="w-full bg-[#2550C0] text-white rounded font-semibold capitalize p-2 "
                    >
                      Approve
                    </button>
                  </div>
                </Card>
              )}
              {details?.status === "rejected" && (
                <Card>
                  <div className="p-5">
                    <h2 className="font-semibold"> Reason for Rejection</h2>
                    <hr className="bg-black my-2 h-0.5" />
                    <p>Not detailed enough and the video part is missing</p>
                  </div>
                </Card>
              )}
              {details?.status === "rejected" && (
                <Card>
                  <div className="p-5 relative">
                    <p>{details?.status === "rejected" && <RejectedImg />}</p>
                    <p className="bottom-3 right-3 absolute">Bolaji Raphael</p>
                  </div>
                </Card>
              )}
              {details?.status === "approved" && (
                <Card>
                  <div className="p-5 relative">
                    <p>{details?.status === "approved" && <ApprovedImg />}</p>
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
