import { useEffect } from "react";
import useAddUser from "../hooks/useAddUser";
import Button from "./Button";
import ModalCard from "./modal/Modal";
import { dataTagSymbol } from "@tanstack/react-query";

interface SuspendProps {
  modal: boolean;
  loading: boolean;
  handleModal: () => void;
  editData?: any;
  suspendUser?: any;
}
export const Suspend = ({
  modal,
  handleModal,
  editData,
  suspendUser,
  loading
}: SuspendProps): JSX.Element => {
  return (
    <>
      <ModalCard setOpen={handleModal} open={modal}>
        <div>
          <h2 className="font-bold text-xl">Suspend User</h2>
          <hr className="my-5" />

          <p className="text-sm text-center mt-6">
            Are you sure you want to <b>“Suspend” </b> {editData?.firstName}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleModal}
              label="Cancel"
              styles="!text-[#898989] text-sm border-[1px] border-[#CDCDCD] rounded mx-auto mt-4 w-1/2"
              loading={false}
            />
            <Button
              onClick={suspendUser}
              label="Suspend"
              styles="bg-[#FFA500] text-sm rounded mx-auto mt-4 w-1/2"
              loading={loading}
            />
          </div>
        </div>
      </ModalCard>
    </>
  );
};
