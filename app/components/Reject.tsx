import React from 'react';
import Button from './Button'
import ModalCard from './modal/Modal'

interface RejectProps {
  modal: boolean;
  handleModal: () => void;
  setComment: () => void;
  handleSubmit: (e: any, t?: any) => void;
  loading: boolean;
  success: boolean;
  comment: string;
}
export const Reject = ({
  modal,
  handleModal,
  handleSubmit,
  loading,
  setComment,
  comment,success
}: RejectProps): JSX.Element => (
  <>
    <ModalCard setOpen={handleModal} open={modal}>
          {success ? (
        <SuccessMessage handleModal={handleModal} />
      ) : (
      <div>
        <h2 className="font-semibold text-xl">Reject Request</h2>
        <p className="text-sm text-center mt-6">
          Are you sure you want to <b className="text-[#FF3B30]">“Reject” </b>{" "}
          Election Report?
        </p>
        <div className="font-semibold capitalize flex flex-col space-y-1 my-4">
          <label htmlFor="purpose" className="text-sm font-medium">
            Reason for Rejection
          </label>
          <textarea
            name="comment"
            placeholder="comment"
            // onBlur={handleBlur}
            onChange={(e) => setComment(e.target.value)}
            className={`p-2 rounded resize-none outline-none ${
              comment
                ? "border-2 border-blue-500"
                : "border-[1px] border-gray-300 text-sm"
            }`}
          ></textarea>
        </div>
        <div className="flex items-center ">
          <Button
            onClick={handleModal}
            label="Cancel"
            styles="!text-[#CDCDCD] border-2 border-[#CDCDCD] rounded-lg mx-auto mt-4"
            loading={false}
          />
          <Button
            onClick={() => handleSubmit(false)}
            label="Reject"
            styles="bg-[#FF3B30] rounded-lg mx-auto mt-4"
            loading={loading}
          />
        </div>
      </div>)}
    </ModalCard>
  </>
);

export const SuccessMessage = ({ handleModal }: { handleModal: () => void }) => (
  <div className="flex items-center flex-col space-y-4 justify-center ">
    <h2 className=" mt-10 w-2/3 capitalize text-xl font-bold text-center text-[#2550C0]">
      Election Report rejected successfully!
    </h2>
    <Button
      onClick={handleModal}
      label="Done"
      styles="bg-[#2550C0] rounded mx-auto mt-4 w-full"
      loading={false}
    />
  </div>
);