"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux/hook";
import { User } from "../typings";
import { Toast } from "./Toast";
// Custom hook for role-based protection
const useAuth = (allowedRoles: any) => {
  const user: User = useAppSelector((state) => state?.user?.user);
  // Get user info from your auth hook
  const router = useRouter();
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!user?.role) {
      router.push("/login");
      return;
    }

    // If user is logged in but does not have the correct role, redirect to 403
    if (!allowedRoles?.includes(user?.role)) {
      router.push("/dashboard");
      Toast({ title: "Access Denied", error: true });
    }
  }, [user?.role, allowedRoles, router]);

  // Return user for other purposes
  return { user };
};

export default useAuth;
