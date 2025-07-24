"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useStateContext } from "../context/context";
import ModalCard from "./modal/Modal";
import { FilterVotes } from "./FilterVotes";
import { Notification } from "../icons/Sidebar";
import { NotificationModal } from "./NotificationModal";
import Patriot from "./Patriot";
import Comms from "./Comms";
import ModeratorDashboard from "./ModeratorDashboard";
import { VoteBreakDown } from "./VoteBreakDown";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import Admin from "./Admin";
import { User } from "../typings";
import Button from "./Button";
import { ArrowRight } from "../icons/Arrow";
import Analysis from "./Analysis";
import useResult from "../hooks/useResult";
import useReport from "../hooks/useReport";

export default function Dashboard() {
  const [view, setView] = useState(1);
  const user: User = useAppSelector((state) => state?.user?.user);
  const dispatch = useAppDispatch();
  const [notificationModal, setNotificationModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const handleModal = () => setAddUserModal((prev) => !prev);
  const handleNotificationModal = () => setNotificationModal((prev) => !prev);
  const [category, setCategory] = useState("past");
  const { showOverview, title, setTitle, setOpenMenu, setShowOverview } =
    useStateContext();
  const { result } = useResult("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setShowOverview(false)
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const enableFullScreen = () => {
    setView(3);
    setOpenMenu(false);
    toggleFullscreen();
  };
  const {
    states,
    stateLga,
    setStateId,
    stateId,
    setStateLgaId,
    stateLgaId,
    setWardId,
    pollingUnit,
    setPollingUnitId,
    wardId,
    pollingUnitId,
    ward,
  } = useReport("");

  const changeProfile = (item: string) => {
    setTitle(item);
  };
  
  return (
  <>
      {addUserModal && (
        <ModalCard open={addUserModal} setOpen={handleModal}>
          <FilterVotes
            states={states}
            stateLga={stateLga}
            setStateId={setStateId}
            stateId={stateId}
            setStateLgaId={setStateLgaId}
            stateLgaId={stateLgaId}
            setWardId={setWardId}
            pollingUnit={pollingUnit}
            setPollingUnitId={setPollingUnitId}
            pollingUnitId={pollingUnitId}
            wardId={wardId}
            ward={ward}
          />
        </ModalCard>
      )}
      {notificationModal && (
        <ModalCard open={notificationModal} setOpen={handleNotificationModal}>
          <div className="sm:w-[400px]">
            <NotificationModal />
          </div>
        </ModalCard>
      )}
      {view === 3 && (
        <Analysis
          toggleFullscreen={toggleFullscreen}
          setOpenMenu={setOpenMenu}
          setView={setView}
        />
      )}
      {view === 1 && (
        <>
          <Header
            handleNotificationModal={handleNotificationModal}
            title={title}
            user={user?.firstName}
            role={user?.role}
            category={category}
            changeProfile={changeProfile}
            link={enableFullScreen}
            showOverview={showOverview}
          />
          {title === "comms" && <Comms />}
          {title === "agent" && (
            <Patriot
              category={category}
              handleModal={handleModal}
              setCategory={setCategory}
              setView={setView}
            />
          )}
          {title === "Observer" && (
            <Patriot
              category={category}
              handleModal={handleModal}
              setCategory={setCategory}
              setView={setView}
            />
          )}
          {title === "moderator" && (
            <ModeratorDashboard
              setView={setView}
              category={category}
              setCategory={setCategory}
            />
          )}

          {title === "admin" && <Admin />}
          {title === "superadmin" && <Admin />}
        </>
      )}
    </>
  );
}
interface DashboardProps {
  changeProfile: (e: string) => void;
  title: string;
  user: string;
  role: string;
  category: string;
  handleNotificationModal: () => void;
  link: () => void;
  showOverview: boolean;
}
export const Header = ({
  title,
  changeProfile,
  user,
  handleNotificationModal,
  role,
  category,
  link,
  showOverview,
}: DashboardProps) => (
  <section className="flex flex-col space-y-2 justify-start sm:space-y-0 sm:items-center sm:justify-between sm:flex-row">
    <div className="flex items-center space-x-4">
      <h2 className="sm:text-2xl capitalize">
        Welcome, <b>{user}</b>{" "}
      </h2>
      <p className="capitalize font-semibold">{title}</p>
    </div>
    <div className="flex items-center space-x-2">
      {category === "overview" && showOverview ? (
        <Button
          onClick={link}
          label="Full Screen"
          styles="bg-[#2550C0] text-sm rounded"
          loading={false}
          icon={<ArrowRight />}
        />
      ) : (
        <>
          {role === "comms" && (
            <div className="flex items-center">
              <p
                onClick={() => changeProfile("Observer")}
                className={
                  title === "Observer"
                    ? "font-semibold text-[#2550C0] text-center text-sm border-b-2 border-[#2550C0] w-[100px]"
                    : "text-[#CBCBCB] cursor-pointer text-center text-sm border-b-2 border-[#CBCBCB] w-[100px]"
                }
              >
                Observer
              </p>
              <p
                onClick={() => changeProfile("comms")}
                className={
                  title === "comms"
                    ? "font-semibold  text-[#2550C0] text-center text-sm border-b-2 border-[#2550C0] w-[100px]"
                    : "text-center text-[#CBCBCB] cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[100px]"
                }
              >
                Comms
              </p>
            </div>
          )}
          {role === "moderator" && (
            <div className="flex items-center">
              <p
                onClick={() => changeProfile("Observer")}
                className={
                  title === "Observer"
                    ? "font-semibold text-[#2550C0] text-center text-sm border-b-2 border-[#2550C0] w-[100px]"
                    : "text-[#CBCBCB] cursor-pointer text-center text-sm border-b-2 border-[#CBCBCB] w-[100px]"
                }
              >
                Observer{" "}
              </p>
              <p
                onClick={() => changeProfile("moderator")}
                className={
                  title === "moderator"
                    ? "font-semibold  text-[#2550C0] text-center text-sm border-b-2 border-[#2550C0] w-[100px]"
                    : "text-center text-[#CBCBCB] cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[100px]"
                }
              >
                Moderator
              </p>
            </div>
          )}
          <p onClick={handleNotificationModal} className="cursor-pointer">
            <Notification color="#CBCBCB" />
          </p>
        </>
      )}
    </div>
  </section>
);
