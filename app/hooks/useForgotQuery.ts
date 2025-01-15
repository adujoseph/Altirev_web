"use client";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../components/Toast";
import { getApi, postApi, putApi } from "../services";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
// import { ForgotType } from '../typings/login'
// import { forgotSchema } from '../schema/login'
import * as yup from "yup";

export const useForgotQuery = (hash: string) => {
  const navigate = useRouter();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [view2, setView2] = useState(1);
  const [resetToken, setResetToken] = useState(false);
  const handleModal = () => setModal((prev) => !prev);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .label("password")
      .required()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase, one lowercase, a number and a special character"
      ),
    cpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    email: yup.string().label("email").email().required(),
  });
  const defaultValue = {
    email: "",
    password: "",
    cpassword: "",
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: defaultValue,
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      submitHandler();
    },
  });

  const submitHandler = (e?: React.FormEvent) => {
    e?.preventDefault();
    mutate();
  };

  const payload: any = {
    email: values.email?.toLowerCase()?.trim(),
    token: resetToken,
    password: values.password,
  };

  const { mutate } = useMutation({
    mutationFn: () => postApi(`Users/ResetPassword`, payload),
    onSuccess: (data) => {
      if (data.status === "success") {
        Toast({ title: data.message, error: false });
        handleReset(payload);
        return;
      }
      Toast({ title: data.message, error: true });
    },
    onError: (error) => {
      console.error("there was an error", error);
    },
  });

  const handleResetToken = async (e: any) => {
    e?.preventDefault();
    if (values.email) {
      setLoading(true);
      const res = await postApi(`v1/auth/forgot-password`, {
        email: values.email,
      });
      if (res.status === "success") {
        setLoading(false);
        // setView2(2);
        setResetToken(res?.data?.token);
        Toast({ title: "Success! Please check your email", error: false });
        return;
      }
      Toast({ title: res?.response?.data?.errors?.email, error: true });
      setLoading(false);
    }
  };
  const handleResetPassword = async (e: any) => {
    e?.preventDefault();
    const payload = {
      password: values.password,
      hash,
    };
    setLoading(true);
    const res = await postApi(`v1/auth/reset-password`, payload);
    if (res.status === "success") {
      // setResetToken(res?.data?.token);
      setModal(true);
      // navigate.prefetch("/login");
    }
    setLoading(false);
  };
  return {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    handleResetToken,
    errors,
    isSubmitting,
    loading,
    handleResetPassword,
    setView2,
    view2,
    modal,
    setModal,
    handleModal,
  };
};
