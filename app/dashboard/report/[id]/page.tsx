"use client";
import { FilterVotes } from "@/app/components/FilterVotes";
import ModalCard from "@/app/components/modal/Modal";
import Report from "@/app/components/Report";
import ReportDetails from "@/app/components/ReportDetails";
import useReport from "@/app/hooks/useReport";
import { useParams } from "next/navigation";

export default function page() {
  const { id }: string = useParams();

  const {
    inputText,
    setCategory,
    setEdit,
    modal,
    setModal,
    setInputText,
    edit,
    category,
    user,
    handleModal,
    userDetails,
    reportByID,
  } = useReport(id);
  return (
    <>
      {modal && (
        <ModalCard open={modal} setOpen={handleModal}>
          <FilterVotes setModal={setModal} />
        </ModalCard>
      )}
      <ReportDetails
        details={reportByID?.data}
        userDetails={userDetails}
        setEdit={setEdit}
      />
    </>
  );
}
