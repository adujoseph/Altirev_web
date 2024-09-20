import Button from "./Button";
import ModalCard from "./modal/Modal";

interface SuspendProps {
  modal: boolean;
  handleModal: () => void;
  editData?: any;
  handleSubmit?: (e: any, t?: any) => void;
  loading?: boolean;
}
export const DeleteTenant = ({
  modal,
  handleModal,
  handleSubmit,
  editData,
  loading,
}: SuspendProps): JSX.Element => (
  <>
    <ModalCard setOpen={handleModal} open={modal}>
      <div>
        <h2 className="font-bold text-xl">Delete Tenant</h2>
        <hr className="my-5" />

        <p className="text-sm text-center mt-6">
          Are you sure you want to <b>“delete” </b> this tenant
        </p>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleModal}
            label="Cancel"
            styles="!text-[#898989] text-sm border-[1px] border-[#CDCDCD] rounded mx-auto mt-4 w-1/2"
            loading={false}
          />
          <Button
            // onClick={() => handleSubmit(editData, "suspendd")}
            label="Delete Tenant"
            styles="bg-[#FF0E00] text-sm rounded mx-auto mt-4 w-1/2"
            loading={loading}
          />
        </div>
      </div>
    </ModalCard>
  </>
);
