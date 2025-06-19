"use client";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import { useAppSelector } from "../redux/hook";
import { patchApi } from "../services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ReportType, User } from "../typings";
import { getSingleReports, getSingleUser, getTenantReports } from "../server";
import useStateLGA from "./useStateLGA";
import { Toast } from "../components/Toast";
import useResult from "./useResult";

export default function useReport(id: string) {
  const [inputText, setInputText] = useState("");
  const deferedValue = useDeferredValue(inputText);
  const { edit, setEdit, table, editData } = useStateContext();
  const [modal, setModal] = useState(false);
  const [userDetails, setUserDetails] = useState<User>();
  const user: User = useAppSelector((state) => state?.user?.user);
  const [category, setCategory] = useState(
    user?.role === "moderator" ? "approved" : "new"
  );
  const handleModal = () => {
    setSuccess(false);
    setModal((prev) => !prev);
  };
  const [detailReport, setDetailReport] = useState();
  const [details, setDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [comment, setComment] = useState("");
  const [reportStatus, setReportStatus] = useState("");
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
  } = useStateLGA();
  const { results } = useResult("");
  const handleDetails = async (item: any) => {
    setDetails(true);
    const resp = await fetchReportById(item?.id);
    setDetailReport(resp)
    window.scrollTo(0, 0);
  };
  const fetchPendingReport = async () => {
    try {
      const resp = await getTenantReports(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.state}`,
            LGA: `${item?.lga}`,
            ward: `${item?.ward}`,
            PU: `${item?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt: `${item?.createdAt}`,
          });
        });
      const total = results
        ?.filter((i: any) => i?.status === "pending")
        ?.concat(results?.filter((i: any) => i?.status === "processing"));
      return total;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchApprovedReport = async () => {
    try {
      const resp = await getTenantReports(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.state}`,
            LGA: `${item?.lga}`,
            ward: `${item?.ward}`,
            PU: `${item?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt: `${item?.createdAt}`,
          });
        });
      return results?.filter((i: any) => i?.status === "approved");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchRejectedReport = async () => {
    try {
      const resp = await getTenantReports(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.state}`,
            LGA: `${item?.lga}`,
            ward: `${item?.ward}`,
            PU: `${item?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt: `${item?.createdAt}`,
          });
        });
      return results?.filter((i: any) => i?.status === "rejected");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchEscalatedReport = async () => {
    try {
      const resp = await getTenantReports(user.tenantId);
      const results: any = [];
      resp?.length > 0 &&
        resp?.forEach((item: any) => {
          results.push({
            state: `${item?.state}`,
            LGA: `${item?.lga}`,
            ward: `${item?.ward}`,
            PU: `${item?.pollingUnit}`,
            status: `${item?.status}`,
            id: `${item?.id}`,
            createdAt: `${item?.createdAt}`,
          });
        });
      return results?.filter((i: any) => i?.status === "escalated");
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchReportById = async (id: string) => {
    try {
      const resp = await getSingleReports(id ?? resultID);
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const reportByID = useQuery({
    queryKey: ["reportbyid", resultID],
    queryFn: fetchReportById,
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
  const escalatedReport = useQuery({
    queryKey: ["escalatedReport"],
    queryFn: fetchEscalatedReport,
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
  const pendingReport = useQuery({
    queryKey: ["pendingReport"],
    queryFn: fetchPendingReport,
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
  const approvedReport = useQuery({
    queryKey: ["approvedReport"],
    queryFn: fetchApprovedReport,
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
  const rejectedReport = useQuery({
    queryKey: ["rejectedReport"],
    queryFn: fetchRejectedReport,
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
  const report =
    category === "rejected"
      ? rejectedReport
      : category === "new"
      ? pendingReport
      : category === "approved"
      ? approvedReport
      : escalatedReport;

  const total_report = report?.data?.concat(results);

  const total_report_search = useMemo(
    () =>
      deferedValue
        ? total_report?.filter(
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
        : total_report,
    [deferedValue, total_report]
  );

  const reportSearch = useMemo(
    () =>
      deferedValue
        ? report?.data?.filter(
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
        : report?.data,
    [deferedValue, report?.data]
  );

  const sendReport = async (status?: string) => {
    setLoading(true);
    const payload = {
      reasons: comment,
      status: reportStatus ? reportStatus : status,
      modifiedBy: user?.altirevId,
    };
    const resp = await patchApi(`reports/change-status/${resultID}`, payload);
    if (resp) {
      Toast({ title: "Success", error: false });
      setSuccess(true);
      setLoading(false);
      report?.refetch();
      return;
    } else {
      setLoading(false);
      Toast({ title: "Error Occurred", error: true });
      return;
    }
  };

  useEffect(() => {
    report?.refetch();
  }, [category]);
  return {
    inputText,
    success,
    setCategory,
    setEdit,
    modal,
    report,
    setModal,
    setInputText,
    sendReport,
    edit,
    category,
    user,
    setSuccess,
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
    setWardId,
    table,
    editData,
    loading,
    comment,
    setReportStatus,
    reportStatus,
    setComment,
    total_report_search,
    setUserDetails,
  };
}
