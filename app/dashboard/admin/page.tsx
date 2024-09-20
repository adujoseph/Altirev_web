'use client'
import AddUser from "@/app/components/AddUser";
import { AdminSubTable1 } from "@/app/components/AdminTable";
import { useState } from "react";

export default function page() {
  const [usersModal, setUsersModal] = useState(false);

  const handleUsersModal = () => setUsersModal((prev) => !prev);

  return (
    <>
      {usersModal && (
        <AddUser handleModal={handleUsersModal} modal={usersModal} />
      )}
      <h1 className="text-xl text-[#272727] font-bold">Manage User</h1>
      <AdminSubTable1 handleUsersModal={handleUsersModal} />
    </>
  );
}
