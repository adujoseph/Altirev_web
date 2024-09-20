"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Toast } from "../components/Toast";
import { useAppDispatch } from "../redux/hook";
import { login } from "../redux/userSlice";
import { postApi } from "../services";
import { useFormik } from "formik";
import * as yup from "yup";
import { getContacts, getSingleUser } from "../server";
import { useDeferredValue, useMemo, useState } from "react";
import { useStateContext } from "../context/context";
import { ContactType } from "../typings";

export const useContactQuery = () => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState("");
  const deferedValue = useDeferredValue(inputText);
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal((prev) => !prev);
  const { edit, setEdit } = useStateContext();
  const defaultValue = {
    phone: "",
    name: "",
    email: "",
    message: "",
  };
  const validationSchema = yup.object().shape({
    phone: yup.string().label("phone").required(),
    name: yup.string().label("name").required(),
    email: yup.string().label("email").required(),
    message: yup.string().label("message").required(),
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

  const submitHandler = (e?: React.FormEvent) => {
    e?.preventDefault();
    mutate();
  };

  const payload: any = {
    name: values.name,
    email: values.email?.trim(),
    message: values.message?.trim(),
    id: values.phone,
  };

  const { mutate } = useMutation({
    mutationFn: () => postApi(`contact`, payload),
    onSuccess: (data) => {
      setSubmitting(false);

      if (data?.email) {
        handleReset(payload);
        Toast({ title: "Successful", error: false });
        return;
      }
      Toast({ title: data?.response?.data?.errors?.id, error: true });

      // setSubmitting(false);
    },
    onError: (error) => {
      console.log("there was an error", error);
    },
  });

  const fetchSingleContact = async (id:string) => {
    try {
    
      const resp = await getSingleUser(id);
      console.log('id', id)
      console.log('resp', resp)
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const fetchContact = async () => {
    try {
      const resp = await getContacts();
      return resp;
    } catch (error) {
      console.error("Er", error);
    }
  };
  const contact = useQuery({
    queryKey: ["contact"],
    queryFn: fetchContact,
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
    const contactSearch = useMemo(
      () =>
        deferedValue
          ? contact?.data?.filter(
              (item: ContactType) =>
                item?.name
                  ?.toLowerCase()
                  ?.includes(deferedValue?.toLowerCase()?.trim()) ||
                item?.message
                  ?.toLowerCase()
                  ?.includes(deferedValue?.toLowerCase()?.trim()) ||
                item?.email
                  ?.toLowerCase()
                  ?.includes(deferedValue?.toLowerCase()?.trim())
            )
          : contact?.data,
      [deferedValue, contact?.data]
    );
  return {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
    isSubmitting,
    contact,
    edit,
    setEdit,
    modal,
    setModal,
    handleModal,
    inputText,
    setInputText,
    contactSearch,
    fetchSingleContact,
  };
};
