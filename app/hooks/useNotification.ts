"use client";
import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNotification, getSingleNotification } from "../server";

export default function useNotification() {
  const [show, setShow] = useState(true);
  const [id, setId] = useState("");
  const handleModal = () => setShow((prev) => !prev);
  const getId = (id:string) => {
    handleModal();
    setId(id);
  };
  const fetchNotification = async () => {
    try {
      const resp = await getNotification();
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchSingleNotification = async () => {
    try {
      const resp = await getSingleNotification(id);
      
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const singleNotification = useQuery({
    queryKey: ["singleNotification", id],
    queryFn: fetchSingleNotification,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 120000, // 2 minutes
    placeholderData: keepPreviousData,
    refetchIntervalInBackground: true,
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  const notification = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotification,
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
  return {
    show,
    handleModal,
    notification,
    singleNotification,
    getId,
  };
}
