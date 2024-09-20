
import ModalCard from "./modal/Modal";
import { PhoneCall } from "../icons/Arrow";

export default function UserDetails({ handleModal, modal, data }: any) {
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">User Details</h2>
      <hr className=" my-2 h-0.5" />

      <aside className="flex justify-between">
        <div className="w-1/2 flex flex-col space-y-2">
          <span>
            <h2 className="text-[#656565] font-semibold">Name</h2>
            <p className="text-[#272727] text-sm">
              {data?.firstName ?? "N/A"} {data?.lastName ?? "N/A"}
            </p>
          </span>
          <span>
            <h2 className="text-[#656565] font-semibold">Email Address</h2>
            <p className="text-[#272727] text-sm">{data?.email ?? "N/A"}</p>
          </span>
          <span>
            <h2 className="text-[#656565] font-semibold">LGA</h2>
            <p className="text-[#272727] text-sm">{"N/A"}</p>
          </span>
          <span>
            <h2 className="text-[#656565] font-semibold">PU</h2>
            <p className="text-[#272727] text-sm">{"N/A"}</p>
          </span>
        </div>
        <div className="w-1/2 flex flex-col space-y-2">
          <span>
            <h2 className="text-[#656565] font-semibold">Phone Number</h2>
            <span className="flex items-center space-x-2">
              <p className="text-[#272727] text-sm">
                {" "}
                {data?.phoneNumber ?? "N/A"}{" "}
              </p>
              <a
                href={`tel:${data?.phoneNumber}`}
                className="text-[#272727] text-sm"
              >
                <PhoneCall />
              </a>
            </span>
          </span>
          <span>
            <h2 className="text-[#656565] font-semibold">State</h2>
            <p className="text-[#272727] text-sm">{data?.state ?? "N/A"}</p>
          </span>
          <span>
            <h2 className="text-[#656565] font-semibold">Ward </h2>
            <p className="text-[#272727] text-sm">{"N/A"}</p>
          </span>
          <span>
            <h2 className="text-[#656565] font-semibold">status </h2>
            <p className="text-[#272727] text-sm">{data?.status ?? "N/A"}</p>
          </span>
        </div>
      </aside>
    </ModalCard>
  );
}
