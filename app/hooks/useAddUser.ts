"use client";
import React, {useState } from "react";
import useStateLGA from "./useStateLGA";
import { useAppSelector } from "../redux/hook";
import { Toast } from "../components/Toast";
import { postApi } from "../services";

export default function useAddUser(user:any) {
  const [loading, setLoading] = useState(false);
  const username = useAppSelector((state) => state?.user);
  const {
    states,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    wardId,
    ward,
    pollingUnit,
    pollingUnitId,
    setPollingUnitId,
    setWardId,
    email,
    setEmail,
    role,
    setRole,
  } = useStateLGA();

  const assignRole = async (e: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const payload = {
      email,
      state: stateId,
      role: role,
      pollingUnit: pollingUnitId,
      lga: stateLgaId,
      ward: wardId,
      modId: username?.user?.altirevId,
    };
    const resp = await postApi(`elections/role/location`, payload);
    if (resp?.id) {
      Toast({ title: "Success", error: false });
      setLoading(false);
      user?.refetch();
      return;
    }
    Toast({ title: "Error Occurred", error: true });

    setLoading(false);
  };

  return {
    states,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    wardId,
    ward,
    pollingUnit,
    pollingUnitId,
    setPollingUnitId,
    setWardId,
    email,
    setEmail,
    role,
    setRole,
    assignRole,
    loading,
  };
}
