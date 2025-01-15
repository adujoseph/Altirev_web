"use client";
import React, { useState } from "react";
import { useStateContext } from "../context/context";
import { getPlans, getUsers } from "../server";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plan } from "../typings";
import { handleClickScroll } from "../components/Header";

export default function usePlan() {
  const { setPlanId } = useStateContext();
  const handlePlanId = (item: Plan) => {
    if (item?.title?.toLowerCase()?.includes("enterprise")) {
      handleClickScroll("contact");
      return;
    } else {
      setPlanId(item.id);
    }
  };

  const fetchPlan = async () => {
    try {
      const resp = await getPlans();
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const plan = useQuery({
    queryKey: ["plan"],
    queryFn: fetchPlan,
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
    plan,
    handlePlanId,
  };
}
