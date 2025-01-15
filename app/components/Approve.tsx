import React from "react";
import Button from "./Button";
import ModalCard from "./modal/Modal";

interface ApproveProps {
  modal: boolean;
  handleModal: () => void;
  handleSubmit: (e?: any) => void;
  loading: boolean;
  success: boolean;
}
export const Approve = ({
  modal,
  handleModal,
  handleSubmit,
  loading,
  success,
}: ApproveProps): JSX.Element => (
  <>
    <ModalCard setOpen={handleModal} open={modal}>
      {success ? (
        <SuccessMessage handleModal={handleModal} />
      ) : (
        <div>
          <h2 className="font-bold text-xl">Approve Request</h2>
          <hr className="my-5" />

          <p className="text-sm text-center mt-6">
            Are you sure you want to <b>“Approve” </b> Election Report?
          </p>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleModal}
              label="Cancel"
              styles="!text-[#898989] border-[1px] border-[#CDCDCD] rounded mx-auto mt-4 w-1/2"
              loading={false}
            />
            <Button
              onClick={handleSubmit}
              label="Approve"
              styles="bg-[#2550C0] rounded mx-auto mt-4 w-1/2"
              loading={loading}
            />
          </div>
        </div>
      )}
    </ModalCard>
  </>
);

export const SuccessMessage = ({ handleModal }: { handleModal: () => void }) => (
  <div className="flex items-center flex-col space-y-4 justify-center ">
    <h2 className="mt-10 w-2/3 capitalize text-xl font-bold text-center text-[#2550C0]">
      Election Report approved successfully!
    </h2>
    <Button
      onClick={handleModal}
      label="Done"
      styles="bg-[#2550C0] rounded mx-auto mt-4 w-full"
      loading={false}
    />
  </div>
);
