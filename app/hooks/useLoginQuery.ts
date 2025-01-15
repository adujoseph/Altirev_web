"use client";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../components/Toast";
import { useAppDispatch } from "../redux/hook";
import { login } from "../redux/userSlice";
import { postApi, putApi } from "../services";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
// import { LoginType } from '../typings/login'
// import { LoginSchema } from '../schema/login'
import * as yup from "yup";

export const useLoginQuery = () => {
  const dispatch = useAppDispatch();
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [view, setView] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigate = useRouter();
  const [seconds, setSeconds] = useState(90); // 1:30 minutes in second9
  const [modal, setModal] = useState(false);
  const defaultValue = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().label("email").required(),
    password: yup.string().label("password").required(),
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
    email: values.email?.trim(),
    password: values.password?.trim(),
  };
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/dashboard");
  }, [navigate]);

  const { mutate } = useMutation({
    mutationFn: () => postApi(`v1/auth/login`, payload),
    onSuccess: (data) => {
      if (data?.token) {
        Toast({ title: "Login Successful", error: false });
        dispatch(login(data?.user));
        localStorage.setItem("auth", data?.token);
        setSubmitting(false);
        handleReset(payload);
        navigate.push("/dashboard");
        return;
      }
      if (data?.response?.status === 422) {
        setSubmitting(false);

        Toast({
          title:
            data?.response?.data?.errors?.email ??
            data?.response?.data?.errors?.password,
          error: true,
        });
        return;
      }
      Toast({ title: data?.response?.data?.message, error: true });
      setSubmitting(false);
    },
    onError: (error) => {
      console.error("there was an error", error);
    },
  });
  const getOtp = async () => {
    setSeconds(90);
    setLoading2(true);
    const payload = {
      email: values.email,
      phone: `234${values.phone?.toString()}`,
    };
    const res = await postApi("otp/generate", payload);
    if (res?.response?.data?.message) {
      Toast({ title: res.response.data.message, error: true });
      setLoading2(false);
      setView(0);
      return;
    } else {
      setView(1);
      setLoading2(false);
      Toast({ title: res?.message, error: false });
    }
  };
  const validateOtp = async () => {
    if (otp?.join("")?.length === 6) {
      setLoading(true);
      const res = await postApi("otp/validate", {
        email: values.email,
        otp: otp?.join(""),
      });
      if (res.message === "Otp validation is successful") {
        Toast({ title: res.message, error: false });
        setLoading(false);
        setView(2);
        return;
      }
      Toast({ title: res.response?.data?.message, error: true });
      setLoading(false);
    }
  };
  const resetPassword = async () => {
    const payload = {
      code: otp?.join(""),
      newPassword: values.password,
    };
    const res = await putApi(`users/reset-password`, payload);
  };
  useEffect(() => {
    otp?.join("")?.length === 6 && validateOtp();
  }, [otp?.join("")]);
  return {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
    isSubmitting,
    getOtp,
    otp,
    modal,
    setModal,
    setOtp,
    view,
    setView,
    loading,
    validateOtp,
    resetPassword,
    length,
    loading2,
    setSeconds,
    seconds,
  };
};
