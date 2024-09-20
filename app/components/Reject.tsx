import Button from './Button'
import ModalCard from './modal/Modal'

interface RejectProps {
  modal: boolean;
  handleModal: () => void;
  setComment: () => void;
  editData: any;
  handleSubmit: (e: any, t?: any) => void;
  loading: boolean;
}
export const Reject = ({
  modal,
  handleModal,
  handleSubmit,
  editData,
  loading,
  setComment,
}: RejectProps): JSX.Element => (
  <>
    <ModalCard setOpen={handleModal} open={modal}>
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
            // dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            // onBlur={handleBlur}
            onChange={(e) => setComment(e.target.value)}
            className={`p-2 rounded resize-none outline-none ${
              editData?.comment
                ? "border-2 border-green-500"
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
            onClick={() => handleSubmit(editData, "reject")}
            label="Reject"
            styles="bg-[#FF3B30] rounded-lg mx-auto mt-4"
            loading={loading}
          />
        </div>
      </div>
    </ModalCard>
  </>
);
