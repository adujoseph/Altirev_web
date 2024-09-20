"use client";
import React, { useDeferredValue, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import { useAppSelector } from "../redux/hook";
import { getApi } from "../services";
import { useQuery } from "@tanstack/react-query";
import { ReportType, User } from "../typings";
import { getReports, getSingleReports, getSingleUser } from "../server";
import useStateLGA from "./useStateLGA";

export default function useReport(id: string) {
  const [inputText, setInputText] = useState("");
  const deferedValue = useDeferredValue(inputText);
  const { edit, setEdit } = useStateContext();
  const [modal, setModal] = useState(false);
  const [userDetails, setUserDetails] = useState<User>();
  const user: User = useAppSelector((state) => state?.user?.user);
  const [category, setCategory] = useState("new");
  const handleModal = () => setModal((prev) => !prev);
  const [detailReport, setDetailReport] = useState({});
  const [details, setDetails] = useState(false);

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
  } = useStateLGA();

  const handleDetails = (item: ReportType) => {
    setDetails(true);
    setDetailReport(item);
  };
  const fetchPendingReport = async () => {
    try {
      const resp = await getReports();
      return resp?.filter((i: any) => i?.status === "pending");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchApprovedReport = async () => {
    try {
      const resp = await getReports();
      return resp?.filter((i: any) => i?.status === "approved");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchRejectedReport = async () => {
    try {
      const resp = await getReports();
      return resp?.filter((i: any) => i?.status === "rejected");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchReportById = async (id: string) => {
    try {
      const resp = await getSingleReports(id ?? detailReport?.id);
      const res = await getSingleUser(resp?.userId);
      setUserDetails(res);
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const reportByID = useQuery({
    queryKey: ["reportbyid", id, detailReport?.id],
    queryFn: () => fetchReportById(id),
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
  const pendingReport = useQuery({
    queryKey: ["pendingReport"],
    queryFn: fetchPendingReport,
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
  const approvedReport = useQuery({
    queryKey: ["approvedReport"],
    queryFn: fetchApprovedReport,
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
  const rejectedReport = useQuery({
    queryKey: ["rejectedReport"],
    queryFn: fetchRejectedReport,
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
  const report =
    category === "rejected"
      ? rejectedReport
      : category === "new"
      ? pendingReport
      : approvedReport;
  const reportSearch = useMemo(
    () =>
      deferedValue
        ? report?.data?.filter(
            (item: ReportType) =>
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
        : report?.data,
    [deferedValue, report?.data]
  );
  const sendReport =() => {

  }
  return {
    inputText,
    setCategory,
    setEdit,
    modal,
    report,
    setModal,
    setInputText,
    edit,
    category,
    user,
    handleModal,
    userDetails,
    reportByID,
    reportSearch,
    setDetailReport,
    detailReport,
    details,
    setDetails,
    handleDetails,
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
    setWardId
  };
}
