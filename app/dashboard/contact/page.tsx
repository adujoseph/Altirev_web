"use client";
import Card from "@/app/components/Card";
import React from "react";
import SkeletonTable from "../../components/skeleton/Table";
import Paginate from "../../components/table/table";
import { FilterView } from "@/app/icons/Arrow";
import { SearchField } from "@/app/components/Search";
import { FilterVotes } from "@/app/components/FilterVotes";
import ModalCard from "@/app/components/modal/Modal";
import UserDetails from "@/app/components/UserDetails";
import { useContactQuery } from "@/app/hooks/useContact";
import useAuth from "@/app/components/Auth";
import useReport from "@/app/hooks/useReport";

export default function page() {
  const {
    contact,
    edit,
    setEdit,
    modal,
    setModal,
    handleModal,
    inputText,
    setInputText,
    contactSearch,userDetails
  } = useContactQuery();
  // const { user } = useAuth("moderator");
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

  return (
    <div>
      {modal && (
        <ModalCard open={modal} setOpen={handleModal}>
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
      {edit && (
        <UserDetails
          data={userDetails}
          modal={edit}
          handleModal={() => setEdit(false)}
        />
      )}
      <h1 className="text-xl text-[#272727] font-semibold">Contact List</h1>
      <aside className="flex items-center justify-between">
        <div className="flex items-center space-x-2 w-1/2">
          <p className="">
            <SearchField inputText={inputText} setInputText={setInputText} />
          </p>
          <span
            onClick={handleModal}
            className="w-max border-[1px] border-[#CBCBCB] rounded-xl flex items-center justify-center p-2 space-x-2 text-black"
          >
            <b>Filter</b>
            <p>
              <FilterView />
            </p>
          </span>
        </div>
      </aside>
      <Card>
        <aside className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between p-5 shadow">
          <div className="flex items-center sm:space-x-3">
            <span className="flex items-center space-x-2">
              <p className="size-5 bg-[#91EE91] rounded" />
              <h2 className="text-sm sm:text-base"> Checked in.</h2>
            </span>
            <span className="flex items-center space-x-2">
              <p className="size-5 bg-[#FF0000] rounded" />
              <h2 className="text-sm sm:text-base">Missed Checked in.</h2>
            </span>
          </div>
          <div className="flex items-center space-x-2 border-2 border-[#F6F6F6] rounded  overflow-hidden px-3 my-2">
            <label
              htmlFor="status"
              className="capitalize text-sm text-[#656565]"
            >
              status
            </label>
            <select
              name=""
              id=""
              className="p-3 outline-none text-center capitalize cursor-pointer font-semibold"
            >
              <option value="">all</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
        </aside>

        <div className="w-full overflow-auto my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
          {contact?.isLoading ? (
            <SkeletonTable />
          ) : contactSearch?.length > 0 ? (
            <Paginate
              action="view contact"
              color="#2550C0"
              dropdown={[]}
              data={contactSearch}
            />
          ) : (
            <p className="text-[#98989A] text-xl text-center capitalize font-medium">
              no result
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
