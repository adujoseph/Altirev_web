"use client";
import React, { useDeferredValue, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import { getAllUsers } from "../server";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { User } from "../typings";
import { useAppSelector } from "../redux/hook";
import { getApi, patchApi } from "../services";
import { Toast } from "../components/Toast";

export default function useRole() {
  const [active, setActive] = useState([]);
  const [commsList, setCommsList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [inputText, setInputText] = useState("");
  const deferedValue = useDeferredValue(inputText);
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal((prev) => !prev);
  const [modal2, setModal2] = useState(false);
  const handleModal2 = () => setModal2((prev) => !prev);
  const [modal3, setModal3] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const User: User = useAppSelector((state) => state?.user?.user);

  const handleModal3 = () => setModal3((prev) => !prev);
  const { edit, table, setEdit, editData } = useStateContext();
  const fetchUser = async () => {
    try {
      const resp = await getApi(`v1/users/tenant/${User.tenantId}`);
          const arr: any = [];
          resp?.length > 0 &&
            resp?.forEach((employee: any) => {
              arr.push({
                username: employee?.username,
                email: employee?.email,
                phoneNumber: employee?.phoneNumber,
                state: employee?.location?.state?.stateName,
                LGA: employee?.location?.lga?.lgaName,
                PU: employee?.location?.pollingUnit?.pollingUnit,
                ward: employee?.location?.ward?.wardName,
                role: employee?.role,
                status: employee?.status,
                altirevId: employee?.altirevId,
              });
            });
      setCommsList(arr?.filter((res: User) => res?.role === "comms"));
      setAgentList(arr?.filter((res: User) => res?.role === "agent"));
      setActive(arr?.filter((res: User) => res?.status === "active"));
      const result = arr?.filter((res: User) => res?.role !== "moderator");
      return result ?? [];
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchAllUser = async () => {
    try {
      const resp = await getAllUsers();
      return resp ?? [];
    } catch (error) {
      console.error("Er", error);
    }
  };
  const allUser = useQuery({
    queryKey: ["alluser"],
    queryFn: fetchAllUser,
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
    onError: (error: any) => console.error(error),
  });
  const user = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
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
    onError: (error: any) => console.error(error),
  });

  const userSearch = useMemo(
    () =>
      deferedValue
        ? user?.data?.filter(
            (item: User) =>
              item?.lastName
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.firstName
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.username
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.email
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim())
          )
        : user?.data,
    [deferedValue, user?.data]
  );
  const allUserSearch = useMemo(
    () =>
      deferedValue
        ? allUser?.data?.filter(
            (item: User) =>
              item?.lastName
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.firstName
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.username
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.email
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim())
          )
        : allUser?.data,
    [deferedValue, allUser?.data]
  );
  const suspendUser = async (e: React.FormEvent) => {
    e?.preventDefault();
    setLoadingUser(true);
    const payload = {
      userEmail: editData?.email,
    };
    const resp = await patchApi(`reports/suspend-user`, payload);
    if (resp?.status) {
      Toast({ title: resp?.message, error: false });
      setLoadingUser(false);
      user?.refetch();
      return;
    }
    Toast({ title: "Error Occurred", error: true });
    setLoadingUser(false);
  };
  const agentLists = user?.data?.filter((res: User) => res?.role === "agent");
  const activeAgentLists = agentLists?.filter(
    (res: User) => res?.status === "active"
  );
  return {
    inputText,activeAgentLists,
    setInputText,
    setEdit,
    handleModal,
    handleModal2,
    handleModal3,
    modal,
    modal2,
    modal3,
    edit,
    agentLists,
    table,
    setModal2,
    editData,
    user,
    active,
    userSearch,
    agentList,
    commsList,
    suspendUser,
    loadingUser,
    allUserSearch,
    allUser,
  };
}
