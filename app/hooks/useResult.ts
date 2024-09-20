"use client";
import React, { use, useDeferredValue, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import { useAppSelector } from "../redux/hook";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services";
import { User } from "../typings";
import { getSingleUser } from "../server";
import useStateLGA from "./useStateLGA";

export default function useResult(id: string) {
  const [inputText, setInputText] = useState("");
  const deferedValue = useDeferredValue(inputText);
  const { edit, setEdit } = useStateContext();
  const [modal, setModal] = useState(false);
  const user: User = useAppSelector((state) => state?.user?.user);
  const [category, setCategory] = useState("new");
  const handleModal = () => setModal((prev) => !prev);
  const [userDetails, setUserDetails] = useState<User>();
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
    setWardId,countryId
  } = useStateLGA();
  const fetchResult = async () => {
    try {
      const resp = await getApi("v1/results");
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchFilteredStateResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${countryId}/states`);
      console.log("country", resp);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchFilteredLocalResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${stateId}/localgovt`);
      console.log("stateLgaId", resp);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };

  const fetchFilteredWardResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${stateLgaId}/wards`);
      console.log("wardId", resp);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchFilteredPollingResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${wardId}/pu`);
      console.log("pollingUnitId", resp);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchResultById = async (id: string) => {
    try {
      const resp = await getApi(`v1/results/${id}`);
      const res = await getSingleUser(resp?.userId);
      setUserDetails(res);
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const resultByID = useQuery({
    queryKey: ["resultbyid", id],
    queryFn: () => fetchResultById(id),
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    onSuccess(data: any) {
      console.log("data", data);
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const result = useQuery({
    queryKey: ["result"],
    queryFn: fetchResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const stateFilter = useQuery({
    queryKey: ["resultFilter", countryId],
    queryFn: fetchFilteredStateResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const resultFilter = useQuery({
    queryKey: ["resultFilter", stateLgaId],
    queryFn: fetchFilteredWardResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const localFilter = useQuery({
    queryKey: ["resultFilter", stateId],
    queryFn: fetchFilteredLocalResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const pollingFilter = useQuery({
    queryKey: ["resultFilter", wardId],
    queryFn: fetchFilteredPollingResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });

  const resultSearch = useMemo(
    () =>
      deferedValue
        ? result?.data?.filter(
            (item: any) =>
              item?.title
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.ward
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.message
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim())
          )
        : result?.data,
    [deferedValue, result?.data]
  );

  const filter = wardId
    ? pollingFilter
    : stateId
    ? localFilter
    : stateLgaId
    ? resultFilter
    : stateFilter;

  return {
    inputText,
    setCategory,
    setEdit,
    modal,
    setModal,
    setInputText,
    edit,
    category,
    user,
    handleModal,
    resultSearch,
    userDetails,
    resultByID,
    result,
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
    setWardId,filter
  };
}
