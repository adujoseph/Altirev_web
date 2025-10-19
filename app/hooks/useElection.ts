"use client";
import React, { use, useState } from "react";
import { useStateContext } from "../context/context";
import { useAppSelector } from "../redux/hook";
import { deleteApi, postApi } from "../services";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { User } from "../typings";
import { getElections } from "../server";
import { useFormik } from "formik";
import * as yup from "yup";
import { Toast } from "../components/Toast";

export default function useElection() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("previous");
  const { edit, setEdit, setEditData } = useStateContext();
  const [modal, setModal] = useState(false);
  const user: User = useAppSelector((state) => state?.user?.user);
  const [category, setCategory] = useState("new");
  const handleModal = () => setModal((prev) => !prev);
  const defaultValue = {
    name: "",
    description: "",
    startdate: "",
    enddate: "",
    electiondate: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().label("name").required(),
    description: yup.string().label("description").required(),
    // status: yup.string().label("status").required(),
    startdate:yup.date().label("startdate").required(),
    enddate:yup.date().label("enddate").required(),
    electiondate:yup.date().label("electiondate").required()
  });

  const fetchPastElection = async () => {
    try {
      const resp = await getElections();
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  function sortByDateDescending<T>(arr: T[], dateKey: keyof T): T[] {
    return [...arr]?.sort(
      (a, b) =>
        new Date(b[dateKey] as string)?.getTime() -
        new Date(a[dateKey] as string)?.getTime()
    );
  }

  // Usage

  const pastElection = useQuery({
    queryKey: ["election"],
    queryFn: fetchPastElection,
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

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: defaultValue,
    validationSchema,
    onSubmit: (values: any) => {
      submitHandler();
    },
  });
  const payload = {
    name: values.name,
    description: values.description,
    userId: user?.id,
    electionDate:values.electiondate,
    startDate:values.startdate,
    endDate:values.enddate,
  };
  const submitHandler = (e?: React.FormEvent) => {
    e?.preventDefault();
    mutate();
  };
  const { mutate } = useMutation({
    mutationFn: () => postApi(`Elections`, payload),
    onSuccess: (data) => {
      if (data?.status !== 400) {
        Toast({ title: "Successful", error: false });
        setSubmitting(false);
        pastElection.refetch();
        handleReset(payload);
        return;
      }
      Toast({ title: data?.response?.data?.message, error: true });
      setSubmitting(false);
    },
    onError: (error) => {
      console.error("there was an error", error);
    },
  });
  const deleteElection = async (id: { id: string }) => {
    setLoading(true);
    const resp = await deleteApi(`Elections/${id?.id}`);
    Toast({ title: "Deleted Successfully", error: false });
    pastElection.refetch();
    setLoading(false);
    setEdit(false);
    setEditData(null);
  };
  const sortedPreviousElections = sortByDateDescending(
    pastElection?.data?.previous ?? [],
    "electionDate"
  );
  const sortedOngoingElections = sortByDateDescending(
    pastElection?.data?.ongoing ?? [],
    "electionDate"
  );
  const sortedUpcomingElections = sortByDateDescending(
    pastElection?.data?.upcoming ?? [],
    "electionDate"
  );
  // const sortedByElectionDate = sortByDateDescending(elections, 'electionDate');
  const totalElection =
    sortedPreviousElections?.length +
    sortedOngoingElections?.length +
    sortedUpcomingElections?.length;
  return {
    inputText,
    totalElection,
    sortedPreviousElections,
    sortedOngoingElections,
    sortedUpcomingElections,
    setCategory,
    setEdit,
    modal,
    setModal,
    setInputText,
    edit,
    category,
    user,
    handleModal,
    pastElection,
    setStatus,
    deleteElection,
    status,
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    loading,
  };
}
