"use server";
import { getApi } from "../services";

export const getPlans = async () => {
  const res = await getApi("plans");
  return res;
};
export const getElections = async (status: string) => {
  const res = await getApi(`Elections?status=${status}`);

  return res;
};
export const getContacts = async () => {
  const res = await getApi("contact");
  return res;
};
export const getUsers = async () => {
  const res = await getApi("v1/users");
  return res.data;
};
export const getReports = async () => {
  const res = await getApi("reports");
  return res;
};

export const getNotification = async () => {
  const res = await getApi("notification");
  return res;
};

// API CALL BY ID's
export const getSingleNotification = async (id: string) => {
  const res = await getApi(`notification/${id}`);
  return res;
};

export const getSingleElection = async (id: string) => {
  const res = await getApi(`Elections/${id}`);
  return res;
};

export const getSingleUser = async (id: string) => {
  const res = await getApi(`v1/users/${id}`);
  return res.data;
};

export const getSingleReports = async (id: string) => {
  const res = await getApi(`reports/${id}`);
  return res;
};
