import Button from './Button'
import ModalCard from './modal/Modal'

interface ApproveProps {
  modal: boolean;
  handleModal: () => void;
  editData: any;
  handleSubmit: (e: any, t?: any) => void;
  loading: boolean;
}
export const Escalate = ({
  modal,
  handleModal,
  handleSubmit,
  editData,
  loading,
}: ApproveProps): JSX.Element => (
  <>
    <ModalCard setOpen={handleModal} open={modal}>
      <div>
        <h2 className="font-bold text-xl">Escalate Report</h2>
        <hr className="my-5" />

        <p className="text-sm text-center mt-6">
          Are you sure you want to <b>“Escalate” </b> Election Report?
        </p>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleModal}
            label="Cancel"
            styles="!text-[#898989] border-[1px] border-[#CDCDCD] rounded mx-auto mt-4 w-1/2"
            loading={false}
          />
          <Button
            onClick={() => handleSubmit(editData)}
            label="Escalate"
            styles="bg-[#272727] rounded mx-auto mt-4 w-1/2"
            loading={loading}
          />
        </div>
      </div>
    </ModalCard>
  </>
);
