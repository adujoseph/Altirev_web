"use client";
import React, { useEffect, useState } from "react";
import { getApi } from "../services";
import {
  LGAType,
  PollingUnitType,
  StateType,
  User,
  WardType,
} from "../typings";
import useRole from "./useRole";

export default function useStateLGA() {
  const [states, setState] = useState([]);
  const [username, setUser] = useState<User>();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [stateReg, setStateReg] = useState("");
  const [stateLgaId, setStateLgaId] = useState("");
  const [wardId, setWardId] = useState("");
  const [ward, setWard] = useState([]);
  const [pollingUnitId, setPollingUnitId] = useState("");
  const [pollingUnit, setPollingUnit] = useState([]);
  const [stateLga, setStateLga] = useState([]);
  const { user } = useRole();
  const getCountry = async () => {
    const resp = await getApi(`v1/results/public/countries`);
    const states = await getApi(`v1/results/public/${resp[0]?.id}/states`);
    setCountryId(resp[0]?.id);
    const results: any = [];
    states?.length > 0 &&
      states?.forEach((item: StateType) => {
        results.push({
          title: `${item?.stateName}`,
          value: `${item?.id}`,
        });
        setState(results);
      });
  };

  const findUser = async () => {
    const find_state = user?.data?.filter((i: User) => i.email === email);
   
    setUser(find_state[0]);
    const getUser = states.filter(
      (i: any) => i?.title?.toLowerCase() === find_state[0]?.state?.toLowerCase()
    );
    setStateId(getUser[0]?.value);
  };
  const findState = async () => {
    const find_state = states.filter((i: any) => i.value === stateId);
    setStateReg(find_state[0]?.title);
  };
  const getLga = async () => {
    const localgovt = await getApi(`v1/results/public/${stateId}/localgovt`);
    const results: any = [];
    localgovt?.length > 0 &&
      localgovt?.forEach((item: LGAType) => {
        results.push({
          title: `${item?.lgaName}`,
          value: `${item?.id}`,
        });
        setStateLga(results);
      });
  };
  const getWard = async () => {
    const wards = await getApi(`v1/results/public/${stateLgaId}/wards`);
    const results: any = [];
    wards?.length > 0 &&
      wards?.forEach((item: WardType) => {
        results.push({
          title: `${item?.wardName}`,
          value: `${item?.id}`,
        });
        setWard(results);
      });
  };
  const getPollingUnit = async () => {
    const polling_unit = await getApi(`v1/results/public/${wardId}/pu`);
    const results: any = [];
    polling_unit?.length > 0 &&
      polling_unit?.forEach((item: PollingUnitType) => {
        results.push({
          title: `${item?.pollingUnit}`,
          value: `${item?.id}`,
        });
        setPollingUnit(results);
      });
  };


  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    if (stateId) {
      findState();
      getLga();
    }
  }, [stateId]);
  useEffect(() => {
    stateLgaId && getWard();
  }, [stateLgaId]);
  useEffect(() => {
    wardId && getPollingUnit();
  }, [wardId]);
  useEffect(() => {
    email && findUser();
  }, [email,states]);
  return {
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
    stateReg,
    setEmail,
    email,
    role,
    setRole,
    username,
    countryId,
  };
}
