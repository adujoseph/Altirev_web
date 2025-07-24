"use client";
import React, { useEffect, useRef, useState } from "react";
import { ApprovedImg, ArrowView, BackArrow, RejectedImg } from "../icons/Arrow";
import Card from "./Card";
import UserDetails from "./UserDetails";
import { Approve } from "./Approve";
import { Reject } from "./Reject";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { useRouter } from "next/navigation";
import { Escalate } from "./Escalate";
import { ReportType, User } from "../typings";
import Loading from "../loading";
import { useAppSelector } from "../redux/hook";
import { extractTime } from "./table";

interface Props {
  setEdit: (e: boolean) => boolean;
  userDetails: any;
  details: ReportType;
  sendReport: () => void;
  loading: boolean;
  setComment: (e?: any) => void;
  setSuccess: (e?: any) => void;
  comment: string;
  success: boolean;
  commsUser: string;
}

export default function ReportDetails({
  setEdit,
  details,
  sendReport,
  loading,
  setComment,
  comment,
  userDetails,
  success,
  setSuccess,
  commsUser,
}: Props) {
  const [modal3, setModal3] = useState(false);
  const [modal, setModal] = useState(false);
  const [escalate, setEscalate] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleModal2 = () => setModal2((prev) => !prev);
  const handleModal = () => setModal((prev) => !prev);
  const handleModal3 = () => setModal3((prev) => !prev);
  const navigate = useRouter();
  const user: User = useAppSelector((state) => state?.user?.user);
  const back = () => {
    navigate.push("/dashboard/report");
    setEdit(false);
  };
  const handleEscalateModal = () => setEscalate((prev) => !prev);
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/dashboard/report");
  }, [navigate]);
  const audioRef: any = useRef(null);

  const handleTimeUpdate = () => {
    audioRef.current.currentTime;
  };

  function isValidURL(string: string) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!urlPattern.test(string);
  }
  const result = details?.createdAt && extractTime(details?.createdAt);
  const changeReportstatus = () => {
    if (details?.status === "pending") sendReport("processing");
    setSuccess(false);
    return;
  };

  useEffect(() => {
    user?.role === "comms" ? changeReportstatus() : () => {};
  }, [details?.status, user?.role]);
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
          loading={loading}
          modal={modal2}
          handleModal={handleModal2}
          handleSubmit={() => sendReport("approved")}
          success={success}
        />
      )}
      {modal3 && (
        <Reject
          modal={modal3}
          handleModal={handleModal3}
          handleSubmit={() => sendReport("rejected")}
          setComment={setComment}
          comment={comment}
          success={success}
          loading={loading}
        />
      )}
      {escalate && (
        <Escalate
          loading={loading}
          modal={escalate}
          success={success}
          handleModal={handleEscalateModal}
          handleSubmit={() => sendReport("escalated")}
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
                {details?.pollingUnit?.toLowerCase()} Polling Unit
              </h2>
              <p className="text-[#272727] text-sm">
                {details?.createdAt &&
                  new Date(details?.createdAt)?.toDateString()}
                / {result?.time12}
              </p>
            </div>
            {details?.status !== "escalated" &&
              user.role.toLowerCase() !== "moderator" && (
                <h2
                  onClick={handleEscalateModal}
                  className="bg-[#272727] cursor-pointer text-white rounded w-max py-2 px-7"
                >
                  Escalate to Moderator
                </h2>
              )}
          </div>

          <hr className="my-5 bg-[#CBCBCB]" />
          <section className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <Card>
                <div className="p-4">
                  <span className="my-2">
                    <h2 className="font-semibold mt-4">Video File of Report</h2>

                    {isValidURL(details?.videoUrl) ? (
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

                    {isValidURL(details?.audioUrl) ? (
                      <>
                        <p className="text-sm">
                          Audio recording during the election.
                        </p>
                        <hr className="bg-black my-2 h-0.5" />
                        <div>
                          {/* {mediaRecorder && (
                            <LiveAudioVisualizer
                              mediaRecorder={mediaRecorder}
                              width={200}
                              height={75}
                              barWidth={1}
                              gap={0}
                              barColor={"#f76565"}
                            />
                          )} */}
                          {/* {blob && (
                            <AudioVisualizer
                              ref={visualizerRef}
                              blob={blob}
                              width={500}
                              height={75}
                              barWidth={1}
                              gap={0}
                              barColor={"#f76565"}
                            />
                          )} */}
                          {/* <p>
                    <AudioIcon />
                  </p> */}
                          <audio
                            controls
                            ref={audioRef}
                            className=""
                            src={details.audioUrl} // Replace with your audio file path
                            onTimeUpdate={handleTimeUpdate}
                          />
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
              {details?.status === "processing" && user?.role === "comms" && (
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
                    <p>{details?.reasons}</p>
                  </div>
                </Card>
              )}
              {details?.status === "rejected" && (
                <Card>
                  <div className="p-5 relative">
                    <p>{details?.status === "rejected" && <RejectedImg />}</p>
                    <p className="bottom-3 right-3 absolute">
                      {`${user?.firstName} ${user.lastName}`}
                    </p>
                  </div>
                </Card>
              )}
              {details?.status === "approved" && (
                <Card>
                  <div className="p-5 relative">
                    <p>{details?.status === "approved" && <ApprovedImg />}</p>
                    <p className="bottom-3 right-3 absolute">
                      {`${user?.firstName} ${user.lastName}`}
                    </p>
                  </div>
                </Card>
              )}
              {details?.status === "escalated" && (
                <Card>
                  <div className="p-5 relative">
                    <p className="text-[#333] font-bold italic rounded-md border-2 border-black px-5 py-1 w-max  text-xl">
                      escalated
                      {/* {details?.status === "escalated" && <ApprovedImg />} */}
                    </p>
                    <p className="bottom-3 right-3 absolute">
                      {`${user?.firstName} ${user.lastName}`}
                    </p>
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
