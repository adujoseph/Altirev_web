import Button from "./Button";
import ModalCard from "./modal/Modal";
import Input from "./Input";

interface ApproveProps {
  modal: boolean;
  handleModal: () => void;
  setTag: () => void;
  addTags: () => void;
  tags: string;
  tagsList:any
}
export const SelecTags = ({
  modal,
  handleModal,
  setTag,
  tags,
  addTags,
  tagsList,
}: ApproveProps): JSX.Element => (
  <>
    <ModalCard setOpen={handleModal} open={modal}>
      <div>
        <h2 className="font-bold text-xl">Select Tags</h2>
        <hr className="my-5" />
        <Input
          label="Tag"
          placeholder=""
          name="tag"
          type="text"
          onChange={(e) => setTag(e.target.value)}
          value={tags}
        />

        <div className="text-sm items-center flex flex-wrap justify-evenly">
          {tagsList?.data?.map((i:any) => (
            <p className="flex items-center space-x-2 text-[#656565] m-2 hover:bg-[#E9EFFF] hover:text-black rounded py-2 px-4 w-max border-[1px] border-[#656565] font-semibold">
              {i?.name}
            </p>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleModal}
            label="Cancel"
            styles="!text-[#898989] border-[1px] border-[#CDCDCD] rounded mx-auto mt-4 w-1/2"
            loading={false}
          />
          <Button
            onClick={addTags}
            label="Save"
            styles="bg-[#2550C0] rounded mx-auto mt-4 w-1/2"
            // loading={loading}
          />
        </div>
      </div>
    </ModalCard>
  </>
);
