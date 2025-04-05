"use server";
import { getApi } from "../services";

export const getPlans = async () => {
  const res = await getApi("plans");
  return res;
};
export const getElections = async () => {
  const res = await getApi(`elections`);
  return res;
};

export const getContacts = async (id?: string) => {
  const res = await getApi(`reports/agents/${id}`);
  return res;
};

export const getUsers = async (id: string) => {
  const res = await getApi(`v1/users/tenant/${id}`);
  return res?.data;
};

export const getAllUsers = async () => {
  const res = await getApi(`v1/users`);
  return res?.data;
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
  const res = await getApi(`elections/${id}`);
  return res;
};

export const getSingleUser = async (id: string) => {
  const res = await getApi(`v1/users/${id}`);
  return res?.data ?? res;
};

export const getSingleReports = async (id: string) => {
  const res = await getApi(`reports/${id}`);
  return res;
};
export const getSingleResult = async (id: string) => {
  const res = await getApi(`polls/${id}`);
  return res;
};
export const getTenantReports = async (id: string) => {
  const res = await getApi(`reports/tenant/${id}`);
  return res;
};
export const getTenantResult = async (id: string) => {
  const res = await getApi(`polls/tenant/${id}`);
  return res;
}
