"use client";
import Image from "next/image";
import profile from "../../imgs/profile.png";
import { EditIcon, PenIcon } from "@/app/icons/Edit";
import ModalCard from "@/app/components/modal/Modal";
import { useSettingQuery } from "@/app/hooks/useSettingQuery";
import UpdatePassword from "@/app/components/Password";
import { useStateContext } from "@/app/context/context";

const Profile = () => {
  const { openMenu, handleToggle, setOpenMenu } = useStateContext();
  const {
    handleModal1,
    addUserModal1,
    addUserModal,
    user,
    setAddUserModal,
    handleModal,
  } = useSettingQuery();
  return (
    <>
      <h2 className=" font-semibold my-3 text-xl p-5">Profile</h2>
      <section className="flex items-center justify-center space-y-3 flex-col">
        <div className="ring-2 ring-[#2550C0] rounded-full bg-[#ECF1FE] flex items-center justify-center relative size-16">
          <Image src={profile} className="" alt="profile" />
          <span className="border-[1.5px] border-primary p-2 rounded-full flex items-center justify-center absolute top-1/2 -right-4 z-50 bg-[#fff] w-1/2 h-1/2">
            <PenIcon />
          </span>
        </div>
        <p className="border-b-2 border-[#3a4f85] flex items-center justify-center w-max">
          Change Profile Image
        </p>
      </section>
      <section
        className={`m-5 flex items-center flex-col space-y-3 sm:space-y-0 sm:flex-row justify-center sm:items-start sm:justify-around ${
          openMenu ? "flex-col space-y-3" : ""
        }`}
      >
        <aside className="w-1/2 p-5">
          <div className="flex flex-col pointer-events-none">
            {" "}
            <p className="text-[#7E7E7E] text-sm">Name: </p>
            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">Email Address: </p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">Country: </p>
            <p className="font-medium">{user?.country}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">LGA: </p>
            <p className="font-medium">{user?.emailAddress}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">PU: </p>
            <p className="font-medium">{user?.emailAddress}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
        </aside>
        <aside className="w-1/2 p-5">
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">Phone Number: </p>
            <p className="font-medium">{user?.phoneNumber}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">User role: </p>
            <p className="font-medium">{user?.role}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">State: </p>
            <p className="font-medium">{user?.state}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">Ward: </p>
            <p className="font-medium">{user?.emailAddress}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex items-center space-x-10 my-8">
            <p className="text-sm">Password: </p>
            <p className="text-sm !ml-[8.5rem]">**********</p>
            <span
              onClick={handleModal}
              className="justify-end flex items-center space-x-4 flex-1 cursor-pointer text-primary"
            >
              <EditIcon />
              <p className="text-sm text-[#2550C0]">Edit</p>
            </span>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
        </aside>

        {addUserModal && (
          <ModalCard open={addUserModal} setOpen={handleModal}>
            <h2 className="font-semibold text-center text-[#4C4D50]">
              Change Password
            </h2>
            <UpdatePassword setAddUserModal={setAddUserModal} />
          </ModalCard>
        )}
      </section>
    </>
  );
};

export default Profile;
