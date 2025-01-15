"use client";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import { useAppSelector } from "../redux/hook";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getApi, postApi } from "../services";
import { User } from "../typings";
import { getSingleResult, getSingleUser, getTenantResult } from "../server";
import useStateLGA from "./useStateLGA";

export default function useResult(id: string) {
  const [inputText, setInputText] = useState("");
  const deferedValue = useDeferredValue(inputText);
  const { edit, setEdit, editData, setEditData } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState("");
  const [modal, setModal] = useState(false);
  const user: User = useAppSelector((state) => state?.user?.user);
  const [category, setCategory] = useState(user?.role === 'comms' ? "pending":'approved');
  const handleModal = () => setModal((prev) => !prev);
  const [userDetails, setUserDetails] = useState<User>();
  const resultID = editData?.id ?? id;
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
    countryId,
  } = useStateLGA();

  const fetchTags = async () => {
    try {
      const resp = await getApi("tags");
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchPendingResult = async () => {
    try {
      const resp = await getTenantResult(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.electionLocation?.state?.stateName}`,
            LGA: `${item?.electionLocation?.lga?.lgaName}`,
            ward: `${item?.electionLocation?.ward?.wardName}`,
            PU: `${item?.electionLocation?.pollingUnit?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt:`${item?.createdAt}`
          });
        });
      return results?.filter((i: any) => i?.status === "pending");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchProcessingResult = async () => {
    try {
      const resp = await getTenantResult(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.electionLocation?.state?.stateName}`,
            LGA: `${item?.electionLocation?.lga?.lgaName}`,
            ward: `${item?.electionLocation?.ward?.wardName}`,
            PU: `${item?.electionLocation?.pollingUnit?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt:`${item?.createdAt}`
          });
        });
      return results?.filter((i: any) => i?.status === "processing");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchApprovedResult = async () => {
    try {
      const resp = await getTenantResult(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.electionLocation?.state?.stateName}`,
            LGA: `${item?.electionLocation?.lga?.lgaName}`,
            ward: `${item?.electionLocation?.ward?.wardName}`,
            PU: `${item?.electionLocation?.pollingUnit?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt:`${item?.createdAt}`
          });
          // setAllResults(results);
        });
      return results?.filter((i: any) => i?.status === "approved");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchRejectedResult = async () => {
    try {
      const resp = await getTenantResult(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.electionLocation?.state?.stateName}`,
            LGA: `${item?.electionLocation?.lga?.lgaName}`,
            ward: `${item?.electionLocation?.ward?.wardName}`,
            PU: `${item?.electionLocation?.pollingUnit?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt:`${item?.createdAt}`
          });
          // setAllResults(results);
        });
      return results?.filter((i: any) => i?.status === "rejected");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const pendingResult = useQuery({
    queryKey: ["pendingResult"],
    queryFn: fetchPendingResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 2000,
    refetchOnMount: true,
    refetchInterval: 12000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const processingResult = useQuery({
    queryKey: ["processingResult"],
    queryFn: fetchProcessingResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),  });
  const approvedResult = useQuery({
    queryKey: ["approvedResult"],
    queryFn: fetchApprovedResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),  });
  const rejectedResult = useQuery({
    queryKey: ["rejectedResult"],
    queryFn: fetchRejectedResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),  });
  const fetchFilteredStateResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${countryId}/states`);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchFilteredLocalResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${stateId}/localgovt`);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };

  const fetchFilteredWardResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${stateLgaId}/wards`);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchFilteredPollingResult = async () => {
    try {
      const resp = await getApi(`v1/results/public/${wardId}/pu`);
      return resp.data;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchResultById = async () => {
    try {
      const resp = await getSingleResult(resultID);
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const stateFilter = useQuery({
    queryKey: ["resultFilters", countryId],
    queryFn: fetchFilteredStateResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,

    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),  });
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
    placeholderData: keepPreviousData,

    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),  });
  const localFilter = useQuery({
    queryKey: ["resultFilterl", stateId],
    queryFn: fetchFilteredLocalResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,

    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),  });
  const pollingFilter = useQuery({
    queryKey: ["resultFilterp", wardId],
    queryFn: fetchFilteredPollingResult,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 2000,
    refetchOnMount: true,
    refetchInterval: 12000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const resultByID = useQuery({
    queryKey: ["resultbyid", resultID],
    queryFn: fetchResultById,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 2000,
    refetchOnMount: true,
    refetchInterval: 12000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess: (data) => {
      console.log("data", data);
    },

    onError: (error: any) => console.error(error),
  });
  const results =
    category === "rejected"
      ? rejectedResult
      : category === "pending"
      ? pendingResult
      : category === "processing"
      ? processingResult
      : approvedResult;

  const resultSearch = useMemo(
    () =>
      deferedValue
        ? results?.data?.filter(
            (item: any) =>
              item?.state
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.ward
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.pu
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.lga
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim())
          )
        : results?.data,
    [deferedValue, results?.data]
  );
  const filter = wardId
    ? pollingFilter
    : stateId
    ? localFilter
    : stateLgaId
    ? resultFilter
    : stateFilter;

  const tagsList = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 2000,
    refetchOnMount: true,
    refetchInterval: 12000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess: (data) => {
      console.log("data", data);
    },

    onError: (error: any) => console.error(error),
  });

  const addTags = async () => {
    const res = await postApi("tags", {
      name: tags,
    });
  };

  return {
    inputText,setUserDetails,
    tags,
    setTags,
    resultByID,
    tagsList,
    setCategory,
    setEdit,
    addTags,
    modal,
    setModal,
    setInputText,
    edit,
    category,
    user,
    handleModal,
    resultSearch,
    userDetails,
    loading,
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
    filter,
    editData,
    results,
    resultID,
    setEditData,
  };
}
