"use client";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../components/Toast";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/userSlice";
import { postApi } from "../services";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import useStateLGA from "./useStateLGA";
import * as yup from "yup";
import { useStateContext } from "../context/context";

export const useSignUpQuery = () => {
  const dispatch = useAppDispatch();
  const [view, setView] = useState(0);
  const [loading2, setLoading2] = useState(false);
  const length = 6;
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState(Array(length).fill(""));
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(90); // 1:30 minutes in second9
  const { planId, setPlanId, setEmailRef, setPayRef, payRef, emailRef } =
    useStateContext();
  const { states, stateReg, setStateId, stateId } = useStateLGA();
  const [value, setValue] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const inputRefs: any = useRef([]);
  const handleInputChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    // Move to the next input field
    if (value !== "" && index < length - 1) {
      inputRefs?.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to the previous input field on Backspace
    if (
      event.nativeEvent.key === "Backspace" &&
      index > 0 &&
      otp[index] === ""
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    view === 2 && inputRefs?.current[0]?.focus();
  }, [view]);

  const handleOtp = (e?: any) => {
    e?.preventDefault();
    if (seconds !== 0) {
      Toast({ title: "OTP is on its way", error: false });
      return;
    } else {
      getOtp();
    }
    Toast({ title: "OTP Requested", error: false });
  };

  useEffect(() => {
    if (view === 2) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds, view]);
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const defaultValue = {
    email: emailRef,
    username: "",
    lname: "",
    fname: "",
  };
  const validationSchema = yup.object().shape({
    lname: yup.string().label("lname").required("lastname is required"),
    fname: yup.string().label("fname").required("firstname is required"),
    username: yup.string().label("username").required("username is required"),
    email: yup
      .string()
      .label("email")
      .email("Invalid email")
      .required("Email is required"),
  });
  const validationSchema2 = yup.object().shape({
    lname: yup.string().label("lname").required("lastname is required"),
    fname: yup.string().label("fname").required("firstname is required"),
    username: yup.string().label("username").required("username is required"),
    email: yup
      .string()
      .label("email")
      .email("Invalid email")
      .required("Email is required"),
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
    if (!value) {
      Toast({ title: "Input Phone Number", error: true });
      setSubmitting(false);
      return;
    }
    // if (!stateId) {
    //   Toast({ title: "Select State", error: true });
    //   setSubmitting(false);

    //   return;
    // }
    else {
      mutate();
    }
  };

  const payload: any = {
    email: values.email,
    password: values.password,
    firstName: values.fname,
    lastName: values.lname,
    username: values.username,
    phoneNumber: value,
    state: stateReg,
    country: country,
    paymentRef: payRef,
    planId: planId,
  };

  const payload2: any = {
    email: values.email,
    phone: value,
  };

  const { mutate } = useMutation({
    mutationFn: () => postApi(`v1/auth/initiate`, payload2),
    onSuccess: (data) => {
      if (data?.status === "success") {
        console.log("data", data);
        Toast({ title: data?.message, error: false });
        setSubmitting(false);
        getOtp();
        setView(2);
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

  const getOtp = async () => {
    setLoading2(true);
    setSeconds(90);
    const payload = {
      email: values.email,
      phone: value,
    };
    const res = await postApi("v1/auth/resend-otp", payload);
    if (res?.response?.data?.message) {
      Toast({ title: res.response.data.message, error: true });
      setLoading2(false);
      setView(0);
      return;
    } else {
      setLoading2(false);
      Toast({ title: res?.message, error: false });
    }
  };

  const validateOtp = async () => {
    const payload = {
      email: values.email,
      token: otp?.join(""),
    };
    if (otp?.join("")?.length === 6) {
      setLoading(true);
      const res = await postApi("v1/auth/verifyOtp", payload);
      if (res.status === "success") {
        Toast({ title: res.message, error: false });
        // register();
        setView(1);

        return;
      }
      Toast({ title: res.response?.data?.message, error: true });
      setLoading(false);
      setOtp(Array(length).fill(""));
    }
  };

  // const register = async () => {
  //   if (values.password === '') {
  //     Toast({ title: "Input Password", error: true });
  //     setSubmitting(false);
  //     return;
  //   }
  //   if (values.cpassword === '') {
  //     Toast({ title: "Input Confirm Password", error: true });
  //     setSubmitting(false);
  //     return;
  //   }
  //   if (values.cpassword === '') {
  //     Toast({ title: "Input Confirm Password", error: true });
  //     setSubmitting(false);
  //     return;
  //   }
  //   if (!stateId) {
  //     Toast({ title: "Select State", error: true });
  //     setSubmitting(false);

  //     return;
  //   }else{
  //   setLoading(true);
  //   const resp = await postApi("v1/auth/register", signUpPayload);
  //   if (resp?.token) {
  //     setPayRef("");
  //     setEmailRef("");
  //     setPlanId("");
  //     dispatch(login(resp?.user));
  //     setLoading(false);
  //     setModal(true);
  //     handleReset(signUpPayload);
  //     localStorage.setItem("auth", resp?.token);

  //     return;
  //   }
  // }
  //   setLoading(false);
  //   Toast({ title: "Error Occurred", error: true });
  //   setOtp(Array(length).fill(""));
  // };

  const handleLogout = () => {
    navigate.push("/login");
    dispatch(logout());
  };

  useEffect(() => {
    otp?.join("")?.length === 6 && validateOtp();
  }, [otp?.join("")]);
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/dashboard");
    navigate.prefetch("/login");
  }, [navigate]);
  return {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    validateOtp,
    errors,
    isSubmitting,
    getOtp,
    loading,
    setOtp,
    view,
    setView,
    otp,
    length,
    handleLogout,
    loading2,
    setSeconds,
    seconds,
    code,
    setCode,
    handleOtp,
    formatTime,
    handleKeyPress,
    handleInputChange,
    inputRefs,
    states,
    stateId,
    setStateId,
    value,
    setValue,
    setCountry,
    country,
  };
};
