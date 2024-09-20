"use client";
import React from "react";
import { DashboardAgent, DashboardHat } from "../icons/Dashboard";
import useRole from "../hooks/useRole";

export default function AdminCard({ setCategory, category }: any) {
  const { user,active } = useRole();
  return (
    <aside className="flex flex-col justify-center items-center sm:items-start sm:justify-start sm:grid sm:grid-cols-3 sm:gap-1 lg:gap-4">
      <div
        onClick={() => setCategory("election")}
        style={{
          background: category === "election" ? "#698AE2" : "white",
        }}
        className="rounded-xl p-5 w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5 cursor-pointer"
      >
        <span className="flex items-center justify-between">
          <p>
            <DashboardAgent />
          </p>
          <h1
            style={{
              color: category === "election" ? "white" : "#698AE2",
            }}
            className="font-bold text-white text-xl"
          >
            Election
          </h1>
        </span>
      </div>
      <div
        onClick={() => setCategory("users")}
        style={{
          background: category === "users" ? "#7478BE" : "white",
        }}
        className=" rounded-xl p-5 w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5 cursor-pointer"
      >
        <span className="flex items-center justify-between">
          <p>
            <DashboardHat />
          </p>
          <h1
            style={{
              color: category === "users" ? "white" : "#7478BE",
            }}
            className="font-bold text-white text-xl"
          >
            Users
          </h1>
        </span>
        <div className="flex items-center justify-between font-bold">
          <span
            style={{
              color: category === "users" ? "white" : "#7478BE",
            }}
            className="flex flex-col text-white"
          >
            <p>Total</p>
            <h1 className="text-xl">{user?.data?.length ?? 0}</h1>
          </span>
          <span
            style={{
              color: category === "users" ? "white" : "#7478BE",
            }}
            className="flex flex-col text-white"
          >
            <p>Active</p>
            <h1 className="text-xl">{active?.length ?? 0}</h1>
          </span>
        </div>
      </div>
      <div
        onClick={() => setCategory("tenants")}
        style={{
          background: category === "tenants" ? "#225E72" : "white",
        }}
        className="rounded-xl p-5 w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5 cursor-pointer relative"
      >
        <div className="flex items-center justify-between">
          <span>
            <h1
              style={{
                color: category === "tenants" ? "white" : "#225E72",
              }}
              className="text-xl font-bold text-white"
            >
              Tenants
            </h1>
          </span>
        </div>
      </div>
    </aside>
  );
}
