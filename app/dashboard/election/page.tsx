'use client'
import useAuth from "@/app/components/Auth";
import ElectionRole from "@/app/components/election";
import { useState } from "react";

export default function page() {
  const [usersModal, setUsersModal] = useState(false);
  const { user } = useAuth(["admin",'moderator']);
  const handleUsersModal = () => setUsersModal((prev) => !prev);

  return (
    <>
      <ElectionRole />
    </>
  );
}
