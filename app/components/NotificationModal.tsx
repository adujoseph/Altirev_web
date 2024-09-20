"use client";
import { useState } from "react";
import { VoteNotification, VoteNotification2 } from "../icons/Search";
import { BackArrow } from "../icons/Arrow";
import classNames from "classnames";
import useNotification from "../hooks/useNotification";
import Spinner from "./Spinner";

export const NotificationModal = () => {
  const { notification, show, handleModal, getId, singleNotification } =
    useNotification();
  return (
    <div className="">
      {show ? (
        <>
          <h2 className="font-bold text-xl">Notifications</h2>
          <div className="flex items-center justify-between my-3">
            <p className="text-[#656565]">
              <b className="text-[#FF0000]">{notification?.data?.length}</b>{" "}
              unread notifications
            </p>
            <p className="cursor-pointer rounded py-2 px-4 w-max border-[1px] border-[#2550C0] flex items-center justify-center text-[#2550C0] font-semibold">
              Mark all as read
            </p>
          </div>
          <div className="flex space-y-3">
            {notification?.isLoading ? (
              <p className="flex items-center justify-center mx-auto w-full">
                <Spinner />
              </p>
            ) : notification?.data?.length > 0 ? (
              notification?.data?.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => getId(item?.id)}
                  className="flex items-center justify-between cursor-pointer w-full"
                >
                  <span className="flex items-center space-x-3">
                    <p className="size-10 bg-[#F3F3F3] rounded-full p-2 flex items-center justify-center">
                      {false ? <VoteNotification /> : <VoteNotification2 />}
                    </p>
                    <h2>{item?.title}</h2>
                  </span>
                  <p
                    className={classNames("", {
                      "text-gray-500": true,
                    })}
                  >
                    {new Date(item?.createdAt)?.toDateString().substring(4)}
                  </p>
                </div>
              ))
            ) : (
              <p>No Notification</p>
            )}
          </div>

          <hr className=" my-2 h-0.5" />
        </>
      ) : (
        <>
          <p
            onClick={handleModal}
            className="cursor-pointer absolute left-4 top-5 rounded border-[1px] bg-gray-50 py-1 px-3.5 flex items-center justify-center "
          >
            <BackArrow />
          </p>
          {singleNotification?.isLoading ? (
            <p className="flex items-center justify-center mx-auto w-full">
              <Spinner />
            </p>
          ) : (
            <>
              <h2 className="font-bold text-xl text-center capitalize">
                {singleNotification?.data?.title}
              </h2>

              <div className="space-y-1 flex flex-col">
                <p className="flex items-center">
                  <p className="size-2 rounded-full bg-[#101720] mr-3" />
                  {singleNotification?.data?.description}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
