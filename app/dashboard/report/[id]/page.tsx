"use client";
import useAuth from "@/app/components/Auth";
import { FilterVotes } from "@/app/components/FilterVotes";
import ModalCard from "@/app/components/modal/Modal";
import ReportDetails from "@/app/components/ReportDetails";
import useReport from "@/app/hooks/useReport";
import { getSingleUser } from "@/app/server";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const { id }: string = useParams();
  const {} = useAuth(["comms", "moderator"]);

  const {
    states,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    setWardId,
    pollingUnit,
    setPollingUnitId,
    wardId,
    pollingUnitId,
    ward,
    setEdit,
    modal,
    handleModal,
    reportByID,
    sendReport,
    loading,
    setComment,
    comment,
    userDetails,
    success,
    setSuccess,
    setUserDetails,
  } = useReport(id);
  const [commsUser, setCommUser] = useState('')
  useEffect(() => {
    const getUser = async () => {
      const res = await getSingleUser(reportByID?.data?.userId);
      setCommUser(`${res.firstName} ${res.lastName}`)
      setUserDetails({
        email: res?.email,
        username: `${res.firstName} ${res.lastName}`,
        phoneNumber: res?.phoneNumber,
        status: res?.status,
        state: res?.location?.state?.stateName,
        LGA: res?.location?.lga?.lgaName,
        ward: res?.location?.ward?.wardName,
        PU: res?.location?.pollingUnit?.pollingUnit,
      });
    };
    if (reportByID?.data?.userId) getUser();
  }, [reportByID?.data]);
  return (
    <>
      {modal && (
        <ModalCard open={modal} setOpen={handleModal}>
          <FilterVotes
            states={states}
            stateLga={stateLga}
            setStateId={setStateId}
            stateId={stateId}
            setStateLgaId={setStateLgaId}
            stateLgaId={stateLgaId}
            setWardId={setWardId}
            pollingUnit={pollingUnit}
            setPollingUnitId={setPollingUnitId}
            pollingUnitId={pollingUnitId}
            wardId={wardId}
            ward={ward}
          />
        </ModalCard>
      )}
      <ReportDetails
        details={reportByID?.data}
        setEdit={setEdit}
        comment={comment}
        userDetails={userDetails}
        setComment={setComment}
        loading={loading}
        sendReport={sendReport}
        success={success}
        setSuccess={setSuccess}
        commsUser={commsUser}
      />
    </>
  );
}
