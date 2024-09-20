import { Close } from '@/app/icons/Close'
import React, { ReactNode } from 'react'

interface ModalProps {
  setOpen: () => void
  open: boolean
  children?: ReactNode | React.JSX.Element
}

export default function ModalCard({ setOpen, open, children }: ModalProps) {
  return (
    <>
      {open && (
        <div className="backdrop-blur-sm w-screen fixed min-h-screen z-[3000] bg-[#5E5E5EAD]  left-0 top-0 items-center justify-center flex ">
          <div className="bg-[#fff] rounded-lg p-5 max-h-screen w-[350px] sm:min-w-[450px] relative overflow-y-auto">
            <div
              className="fixed rounded-full p-2 items-center justify-center flex  sm:absolute sm:top-3 right-5 cursor-pointer z-[1000]"
              onClick={setOpen}
            >
              <Close />
            </div>
            <section className="overflow-y-auto h-full">{children}</section>
          </div>
        </div>
      )}
    </>
  )
}
