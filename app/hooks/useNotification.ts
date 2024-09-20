"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotification, getSingleNotification } from "../server";

export default function useNotification() {
  const [show, setShow] = useState(true);
  const [id, setId] = useState("");
  const handleModal = () => setShow((prev) => !prev);
  const getId = (id:string) => {
    handleModal();
    setId(id);
    console.log('id', id)
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
      console.log("resp", resp);
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
    onSuccess(data: any) {
      //   Toast({ title: "page refreshed", error: false });
    },
    onError: (error: any) => console.error(error),
  });
  console.log('singleNotification', singleNotification)
  return {
    show,
    handleModal,
    notification,
    singleNotification,
    getId,
  };
}
