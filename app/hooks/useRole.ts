"use client";
import React, { useDeferredValue, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import { getUsers } from "../server";
import { useQuery } from "@tanstack/react-query";
import { User } from "../typings";

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
  const handleModal3 = () => setModal3((prev) => !prev);
  const { edit, table, setEdit, editData } = useStateContext();
  const fetchUser = async () => {
    try {
      const resp = await getUsers();
      setCommsList(resp?.filter((res: User) => res?.role === "comms"));
      setAgentList(resp?.filter((res: User) => res?.role === "agent"));
      setActive(resp?.filter((res: User) => res?.status === "active"));
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
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
    
  return {
    inputText,
    setInputText,
    setEdit,
    handleModal,
    handleModal2,
    handleModal3,
    modal,
    modal2,
    modal3,
    edit,
    table,
    setModal2,
    editData,
    user,
    active,
    userSearch,
    agentList,commsList
  };
}
