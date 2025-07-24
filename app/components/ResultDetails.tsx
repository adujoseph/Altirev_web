"use client";
import React, { useEffect, useState } from "react";
import { ApprovedImg, ArrowView, BackArrow, RejectedImg } from "../icons/Arrow";
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
import { SelecTags } from "./SelectTags";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { ResultType, User } from "../typings";
import { useAppSelector } from "../redux/hook";
import { addThousandSeparator } from "../utils";
import { patchApi } from "../services";
import { Toast } from "./Toast";
import { extractTime } from "./table";

interface Props {
  setEdit: (e: boolean) => boolean;
  userDetails: any;
  editData: any;
  loading: boolean;
  details: ResultType;
  setEditData: () => void;
  setTags: () => void;
  addTags: () => void;
  tagsList: any;
  tags: string;
}
export default function Details({
  setEdit,
  userDetails,
  editData,
  loading,
  details,
  setEditData,
  addTags,
  tags,
  setTags,
  tagsList,
}: Props) {
  const user: User = useAppSelector((state) => state?.user?.user);
  const [counts, setCounts] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleModal2 = () => setModal2((prev) => !prev);
  const handleModal = () => setModal((prev) => !prev);
  const handleModal3 = () => setModal3((prev) => !prev);
  const navigate = useRouter();
  const handleModal4 = () => setModal4((prev) => !prev);
  const result = details?.createdAt && extractTime(details?.createdAt);
  const back = () => {
    navigate.push("/dashboard/result");
    setEdit(false);
    setEditData(null);
  };
  const approveRejectElection = async (status: boolean) => {
    setLoading2(true);
    const resp = await patchApi(`polls/status/${details?.id}`, {
      confirm: status,
    });
    if (resp?.response?.data?.message) {
      Toast({ title: resp?.response?.data?.message, error: true });
      setLoading2(false);
      return;
    } else {
      Toast({ title: resp?.response?.message, error: false });
      setLoading2(false);
    }
  };
  const countArr = () => {
    const array = Object.entries(details?.counts).map(([party, votes]) => ({
      party,
      votes: parseInt(votes, 10), // Convert votes to numbers
    }));
    setCounts(array);
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
  const changeResultstatus = async () => {
    if (details?.status === "pending") {
      const resp = await patchApi(`polls/change-status/${details?.id}`, {
        reasons: "",
        status: "processing",
        modifiedBy: user?.altirevId,
      });
    }
    return;
  };

  useEffect(() => {
    user?.role === "comms" ? changeResultstatus() : () => {};
  }, [details?.status, user?.role]);

  useEffect(() => {
    details?.counts && countArr();
  }, [details?.counts]);

  async function watermarkImageFromURL(
    imageUrl: string,
    watermarkText: string
  ) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/proxy-image?url=` + encodeURIComponent(imageUrl);
    const img = new Image();
    img.crossOrigin = "anonymous"; // Important if the image is from another domain
    img.src = imageUrl;

    img.onload = () => {
      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx: any = canvas.getContext("2d");

      // Draw image on canvas
      ctx.drawImage(img, 0, 0);

      // Add watermark
      ctx.font = "48px Arial";
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.rotate(-Math.PI / 6);
      ctx.fillText(watermarkText, img.width / 4, img.height / 2);

      // Convert canvas to Blob and download
      canvas.toBlob((blob: any) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${details?.location?.pollingUnit?.pollingUnit}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    img.onerror = () => {
      console.error("Image failed to load");
    };
  }

  return (
    <>
      {modal && (
        <UserDetails
          data={userDetails}
          modal={modal}
          handleModal={handleModal}
        />
      )}
      {modal4 && (
        <SelecTags
          addTags={addTags}
          tagsList={tagsList}
          tags={tags}
          setTag={setTags}
          modal={modal4}
          handleModal={handleModal4}
        />
      )}
      {modal2 && (
        <Approve
          editData={editData}
          loading={loading2}
          modal={modal2}
          handleModal={handleModal2}
          handleSubmit={() => approveRejectElection(true)}
        />
      )}

      {modal3 && (
        <Reject
          editData={editData}
          loading={loading2}
          modal={modal3}
          handleModal={handleModal3}
          handleSubmit={() => approveRejectElection(false)}
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
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : details?.id ? (
        <>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="">
              <h2 className="text-xl font-bold capitalize">
                {details?.location?.pollingUnit?.pollingUnit?.toLowerCase()}{" "}
                Polling Unit
              </h2>
              <p className="text-[#272727]">
                {" "}
                {details?.createdAt &&
                  new Date(details?.createdAt)?.toDateString()}{" "}
                / {result?.time12}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {user?.role === "comms" && (
                <span
                  onClick={handleModal4}
                  className="flex items-center space-x-2 text-[#656565] rounded py-2 px-4 w-max border-[1px] border-[#656565] font-semibold cursor-pointer"
                >
                  <p>Add</p>
                  <p>
                    <PlusIcon />
                  </p>
                </span>
              )}
              {/* <h2 className="bg-[#272727] text-white rounded w-max py-2 px-7">
                Presidential Result
              </h2> */}
            </div>
          </div>

          <hr className="my-5 bg-[#CBCBCB]" />
          <section>
            <Card>
              <aside className="flex flex-col space-y-2 sm:space-y-0 sm:items-center sm:justify-between p-3 sm:flex-row">
                <Votes
                  title="Number of Accredited Votes"
                  icon={<Accredited />}
                  num={addThousandSeparator(details?.accreditedVoters ?? 0)}
                />
                <p className="sm:h-[80px] m-4 w-0.5 bg-[#CBCBCB]" />
                <Votes
                  title="Number of Votes Casted"
                  icon={<CastedVotes />}
                  num={addThousandSeparator(details?.voteCasted ?? 0)}
                />
                <p className="sm:h-[80px] m-4 w-0.5 bg-[#CBCBCB]" />
                <Votes
                  title="Number of Invalid Votes"
                  icon={<InvalidVotes />}
                  num={addThousandSeparator(details?.invalidVotes ?? 0)}
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
                      <div
                      
                        className="bg-[#CBCBCB] flex items-center justify-center p-2 flex-col relative"
                      >
                        <img
                          className="size-[100px] "
                          src={details?.fileUrl ?? ""}
                          alt="doc"
                        />
                        <p 
                          onClick={() =>
                            watermarkImageFromURL(
                              details?.fileUrl as string,
                              "Alitrev"
                            )
                          } className="ml-auto  absolute bottom-3 cursor-pointer right-10">
                          <DownloadVotes />
                        </p>
                      </div>
                    </div>
                  </section>
                  <span className="my-2">
                    <h2 className="font-semibold mt-4">
                      Video File of Vote Count
                    </h2>

                    {isValidURL(details?.videoUrl) ? (
                      <>
                        <p className="text-sm">
                          This video shows the process of counting the votes.
                        </p>
                        <hr className="bg-black my-2 h-0.5" />

                        <div>
                          {/* videos */}
                          <Player>
                            <source src={details?.videoUrl ?? ""} />
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
                          <p>
                            <AudioIcon />
                          </p>
                          {/* <AudioWaveform /> */}
                          <audio
                            className="w-1/2 bg-slate-500 p-4 h-1/2"
                            src={details?.audioUrl ?? ""}
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
              {details?.status === "processing" && user?.role === "comms" && (
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
            </div>
          </section>
        </>
      ) : (
        <p className="text-center">No results</p>
      )}
    </>
  );
}
