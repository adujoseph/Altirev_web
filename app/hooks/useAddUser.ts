"use client";
import React, { useRef, useState } from "react";
import useStateLGA from "./useStateLGA";
import { useAppSelector } from "../redux/hook";
import { Toast } from "../components/Toast";
import { postApi } from "../services";
import useRole from "./useRole";
import axios from "axios";

export default function useAddUser(handleModal: any) {
  const [file, setFile] = useState("");
  const [upload, setUpload] = useState("single");
  const hiddenFileInput = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const username = useAppSelector((state) => state?.user);
  const {
    states,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    wardId,
    ward,
    pollingUnit,
    pollingUnitId,
    setPollingUnitId,
    setWardId,
    email,
    setEmail,
    role,
    setRole,
  } = useStateLGA();
  const { user } = useRole();
  const assignRole = async (e: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const payload = {
      email,
      state: stateId,
      role: role,
      pollingUnit: pollingUnitId,
      lga: stateLgaId,
      ward: wardId,
      modId: username?.user?.altirevId,
    };
    const resp = await postApi(`elections/role/location`, payload);
    if (resp?.altirevId) {
      Toast({ title: "Success", error: false });
      setLoading(false);
      handleModal();
      user?.refetch();
      return;
    }
    else{
      Toast({ title: "Error Occurred", error: true });
    }
    setLoading(false);
  };
  const assignBulkRole = async (formData: any) => {
    setLoading(true);
    let data;
    if (typeof window !== "undefined") {
      data = localStorage.getItem("auth") ?? "";
    }
    const resp = await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
          `v1/users/bulk/${username?.user?.tenantId}/upload`,
        formData,
        {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "X-Content-Type-Options": "nosniff",
            "Content-Disposition": "attachment; filename=Failed Data.xlsx",
            Authorization: `Bearer ${data}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        return res.data;
      })
      .catch((err) => {
        setLoading(false);
        console.error("error msg: ", err);
        return err;
      });
  };
  const handleUploadName = (item: string) => {
    setUpload(item);
  };
  const handleClick = (event: any) => {
    hiddenFileInput?.current?.click();
  };
  const handleFileChange = (event: any) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     setFileName(reader.result);
    //   };

    //   reader.readAsDataURL(file); // Convert file to Base64
    // }
    if (file) {
      checkImage(file, formData);
    }
  };
  const checkImage = (file, formData) => {
    if (file?.type?.slice(-5) !== "sheet") {
      Toast({ title: "File is not an excel format", error: true });
      return;
    } else {
      assignBulkRole(formData);
    }
  };
  return {
    states,
    handleFileChange,
    handleClick,
    file,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    wardId,
    assignBulkRole,
    ward,
    pollingUnit,
    pollingUnitId,
    setPollingUnitId,
    setWardId,
    email,
    setEmail,
    role,
    setRole,
    assignRole,
    loading,
    upload,
    hiddenFileInput,
    handleUploadName,
  };
}
