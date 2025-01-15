'use client'
import useAuth from "@/app/components/Auth";
import Role from "@/app/components/Role";

export default function ModeratorDashboard() {
  const { user } = useAuth("moderator");

  return (
    <>
      <h1 className="text-xl text-[#272727] font-bold">Manage Role</h1>
      <Role/>
    </>
  );
}
