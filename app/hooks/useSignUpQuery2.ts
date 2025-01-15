"use client";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../components/Toast";
import { useAppDispatch } from "../redux/hook";
import { login, logout } from "../redux/userSlice";
import { postApi } from "../services";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import useStateLGA from "./useStateLGA";
import * as yup from "yup";
import { useStateContext } from "../context/context";

export const useSignUpQuery2 = (country: string, value: string, item: any) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const { planId, setPlanId, setEmailRef, setPayRef, payRef, emailRef } =
    useStateContext();
  const { states, stateReg, setStateId, stateId } = useStateLGA();
  const inputRefs: any = useRef([]);
  const [sex, setSex] = useState("male");
  const handleModal = () => setModal((prev) => !prev);

  const defaultValue = {
    password: "",
    cpassword: "",
  };
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
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      submitHandler();
    },
  });

  const submitHandler = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!stateId) {
      Toast({ title: "Select State", error: true });
      setSubmitting(false);

      return;
    } else {
      mutate();
    }
  };

  const payload: any = {
    email: item?.email,
    password: values?.password,
    firstName: item?.fname,
    lastName: item?.lname,
    username: item?.username,
    phoneNumber: value,
    gender: sex,
    state: stateReg,
    country: country,
    paymentRef: payRef,
    planId: planId,
  };
  const pay_load: any = {
    email: item.email,
    password: values.password,
    firstName: item.fname,
    lastName: item.lname,
    username: item.username,
    phoneNumber: value,
    gender: sex,
    state: stateReg,
    country: country,
  };
  const signUpPayload = payRef !== "" && planId !== "" ? payload : pay_load;

  const { mutate } = useMutation({
    mutationFn: () => postApi("v1/auth/register", signUpPayload),
    onSuccess: (data) => {
      if (data?.token) {
        setPayRef("");
        setEmailRef("");
        setPlanId("");
        dispatch(login(data?.user));
        setModal(true);
        handleReset(signUpPayload);
        localStorage.setItem("auth", data?.token);
        return;
      }
      if (data?.response.data.status === 422) {
        setSubmitting(false);
        Toast({ title: data?.response.data.errors.email, error: true });
        return;
      }
      Toast({ title: data?.response?.data?.message, error: true });

      // dispatch(login(data?.data));
      // localStorage.setItem("v1/auth", data?.data?.token);

      setSubmitting(false);
    },
    onError: (error) => {
      console.error("there was an error", error);
    },
  });

  const register = async () => {
    const resp = await postApi("v1/auth/register", signUpPayload);
    if (resp?.token) {
      setPayRef("");
      setEmailRef("");
      setPlanId("");
      dispatch(login(resp?.user));
      setModal(true);
      handleReset(signUpPayload);
      localStorage.setItem("auth", resp?.token);

      return;
    }
  };

  return {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
    isSubmitting,
    setModal,
    modal,
    handleModal,
    sex,
    setSex,
    inputRefs,
    states,
    stateId,
    setStateId,
  };
};
