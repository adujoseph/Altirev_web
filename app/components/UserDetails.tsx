import ModalCard from "./modal/Modal";
import { PhoneCall } from "../icons/Arrow";
import Loading from "../loading";

export default function UserDetails({ handleModal, modal, data }: any) {
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">User Details</h2>
      <hr className=" my-2 h-0.5" />
      {data?.email ? (
        <aside className="flex justify-between">
          <div className="w-1/2 flex flex-col space-y-2">
            <span>
              <h2 className="text-[#656565] font-semibold">Name</h2>
              <p className="text-[#272727] text-sm capitalize">
                {data?.username ?? "N/A"}
              </p>
            </span>
            <span>
              <h2 className="text-[#656565] font-semibold">Email Address</h2>
              <p className="text-[#272727] text-sm">{data?.email ?? "N/A"}</p>
            </span>
            <span>
              <h2 className="text-[#656565] font-semibold">LGA</h2>
              <p className="text-[#272727] text-sm capitalize">
                {data?.LGA?.toLowerCase() ?? "N/A"}
              </p>
            </span>
            <span>
              <h2 className="text-[#656565] font-semibold">PU</h2>
              <p className="text-[#272727] text-sm capitalize">
                {data?.PU?.toLowerCase() ?? "N/A"}
              </p>
            </span>
          </div>
          <div className="w-1/2 flex flex-col space-y-2">
            <span>
              <h2 className="text-[#656565] font-semibold">Phone Number</h2>
              <span className="flex items-center space-x-2">
                <p className="text-[#272727] text-sm capitalize">
                  {" "}
                  {data?.phoneNumber?.replace("+234", "0") ?? "N/A"}{" "}
                </p>
                <a
                  href={`tel:${data?.phoneNumber?.replace("+234", "0")}`}
                  className="text-[#272727] text-sm capitalize"
                >
                  <PhoneCall />
                </a>
              </span>
            </span>
            <span>
              <h2 className="text-[#656565] font-semibold">State</h2>
              <p className="text-[#272727] text-sm capitalize">
                {data?.state?.toLowerCase() ?? "N/A"}
              </p>
            </span>
            <span>
              <h2 className="text-[#656565] font-semibold">Ward </h2>
              <p className="text-[#272727] text-sm capitalize">
                {data?.ward?.toLowerCase() ?? "N/A"}
              </p>
            </span>
            <span>
              <h2 className="text-[#656565] font-semibold">status </h2>
              <p className="text-[#272727] text-sm capitalize">{data?.status ?? "N/A"}</p>
            </span>
          </div>
        </aside>
      ) : (
        <p className="overflow-hidden h-[50px] flex items-center justify-center">
          <Loading />
        </p>
      )}
    </ModalCard>
  );
}
