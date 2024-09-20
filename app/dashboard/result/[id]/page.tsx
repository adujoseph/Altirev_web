"use client";
import { FilterVotes } from "@/app/components/FilterVotes";
import ModalCard from "@/app/components/modal/Modal";
import ResultDetails from "@/app/components/ResultDetails";
import useResult from "@/app/hooks/useResult";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();

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
    resultByID,
  } = useResult(id);
  return (
    <>
      {modal && (
        <ModalCard open={modal} setOpen={handleModal}>
          <FilterVotes setModal={setModal} />
        </ModalCard>
      )}
      <ResultDetails
        data={resultByID?.data}
        userDetails={userDetails}
        setEdit={setEdit}
      />
    </>
  );
}
