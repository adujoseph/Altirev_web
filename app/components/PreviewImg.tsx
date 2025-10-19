import React from "react";
import ModalCard from "./modal/Modal";

interface PreviewImgProps {
  modal: boolean;
  handleModal: () => void;
  img: string;
}
export const PreviewImg = ({
  modal,
  handleModal,
  img,
}: PreviewImgProps): JSX.Element => (
  <>
    <ModalCard setOpen={handleModal} open={modal}>
      <div className="">
        <img className="w-full h-[400px] sm:h-[500px] object-cover rounded" src={img} alt="doc" />
      </div>
    </ModalCard>
  </>
);
