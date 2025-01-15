"use client";
import useAuth from "@/app/components/Auth";
import { FilterVotes } from "@/app/components/FilterVotes";
import ModalCard from "@/app/components/modal/Modal";
import ResultDetails from "@/app/components/ResultDetails";
import useReport from "@/app/hooks/useReport";
import useResult from "@/app/hooks/useResult";
import { getSingleUser } from "@/app/server";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { id } = useParams();
  const {} = useAuth(["comms", "moderator"]);
  const {
    setEdit,
    modal,
    handleModal,
    userDetails,
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
    editData,
    setEditData,
    resultByID,
    tags,setUserDetails,
    setTags,addTags,tagsList
  } = useResult(id);
   useEffect(() => {
      const getUser = async () => {
        const res = await getSingleUser(resultByID?.data?.userAltirevId);
        setUserDetails({
          email: res?.email,
          username: res?.username,
          phoneNumber: res?.phoneNumber,
          status: res?.status,
          state: res?.location?.state?.stateName,
          LGA: res?.location?.lga?.lgaName,
          ward: res?.location?.ward?.wardName,
          PU: res?.location?.pollingUnit?.pollingUnit,
        });
      };
      if (resultByID?.data?.userAltirevId) getUser();
    }, [resultByID?.data]);
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
      <ResultDetails
        details={resultByID?.data}
        userDetails={userDetails}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        loading={resultByID?.isLoading}
        addTags={addTags}
        tags={tags}
        setTags={setTags}
        tagsList={tagsList}
      />
    </>
  );
}
