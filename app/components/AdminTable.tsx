"use client";
import React, { useState } from "react";
import Card from "./Card";
import { CirclePlus } from "../icons/Dashboard";
import { testApi } from "../constant";
import SkeletonTable from "./skeleton/Table";
import Paginate from "./table/table";
import AddElection from "./AddElection";
import AddUser from "./AddUser";
import AddTenants from "./AddTenants";
import { useStateContext } from "../context/context";
import { DeleteElection } from "./DeleteElection";
import { DeleteTenant } from "./DeleteTenant";
import { Suspend } from "./Suspend";
import AssignRoles from "./AssignRoles";
import UserDetails from "./UserDetails";
import useRole from "../hooks/useRole";
import useElection from "../hooks/useElection";

export default function AdminTable({ category }: string) {
  const [electionModal, setElectionModal] = useState(false);
  const [usersModal, setUsersModal] = useState(false);
  const [tenantModal, setTenantModal] = useState(false);
  const handleElectionModal = () => setElectionModal((prev) => !prev);
  const handleUsersModal = () => setUsersModal((prev) => !prev);
  const handleTenantModal = () => setTenantModal((prev) => !prev);
  const { setEdit, edit, editData, table } = useStateContext();
  const { user } = useRole();
  const {
    setStatus,
    election,
    status,
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteElection,
    loading,
  } = useElection();
  return (
    <section>
      {electionModal && (
        <AddElection
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          handleModal={handleElectionModal}
          modal={electionModal}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      )}
      {usersModal && (
        <AddUser handleModal={handleUsersModal} modal={usersModal} />
      )}
      {tenantModal && (
        <AddTenants handleModal={handleTenantModal} modal={tenantModal} />
      )}
      {category === "election" && edit && table === "delete" && (
        <DeleteElection
          handleModal={() => setEdit(false)}
          editData={editData}
          modal={edit}
          handleSubmit={deleteElection}
          loading={loading}
        />
      )}
      {category === "tenants" && edit && (
        <DeleteTenant
          handleModal={() => setEdit(false)}
          editData={editData}
          modal={edit}
        />
      )}
      {edit && table === "suspend" && (
        <Suspend
          editData={editData}
          handleModal={() => setEdit(false)}
          modal={edit}
          user={user}
        />
      )}
      {edit && table === "reassign" && (
        <AssignRoles
          data={editData}
          handleModal={() => setEdit(false)}
          modal={edit}
          user={user}
        />
      )}
      {edit && table === "profile" && (
        <UserDetails data={editData} handleModal={() => setEdit(false)} modal={edit} />
      )}
      {category === "election" && (
        <AdminSubTable
          setStatus={setStatus}
          status={status}
          election={election}
          handleElectionModal={handleElectionModal}
        />
      )}
      {category === "users" && (
        <AdminSubTable1 user={user} handleUsersModal={handleUsersModal} />
      )}
      {category === "tenants" && (
        <AdminSubTable2 handleTenantModal={handleTenantModal} />
      )}
    </section>
  );
}

export const AdminSubTable = ({
  handleElectionModal,
  election,
  status,
  setStatus,
}: any) => (
  <Card>
    <aside className="flex items-center justify-between p-5">
      <div>
        <span
          onClick={handleElectionModal}
          className="text-white rounded p-2 w-max bg-[#2550C0] flex items-center space-x-2 cursor-pointer "
        >
          <p>
            <CirclePlus />
          </p>
          <p>Add Election</p>
        </span>
      </div>
      <div className="">
        <p className="">
          {/* <SearchField inputText={inputText} setInputText={setInputText} /> */}
        </p>
        {/* <span
            //   onClick={handleModal2}
              className="w-max border-[1px] border-[#CBCBCB] rounded-xl flex items-center justify-center p-2 space-x-2 text-black cursor-pointer"
            >
              <b>Filter</b>
              <p>
                <FilterView />
              </p>
            </span> */}
        <div className="flex flex-col  ">
          <label className="font-semibold " htmlFor="div">
            Choose election type
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`outline-none cursor-pointer p-2 ml-auto flex rounded    ${
              status
                ? "border-b-2 border-[#3399FF]"
                : "border-[1px] border-gray-300 text-sm"
            }`}
          >
            <option value="">choose election type</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="previous">Previous</option>
          </select>
        </div>
      </div>
    </aside>
    <div className="w-full overflow-auto my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
      {election.isLoading ? (
        <SkeletonTable />
      ) : election?.data?.length > 0 ? (
        <Paginate
          action="view user"
          color={"#272727"}
          dropdown={["Delete"]}
          data={election?.data}
        />
      ) : (
        <p className="text-[#98989A] text-xl text-center capitalize font-medium">
          no result
        </p>
      )}
    </div>
  </Card>
);

export const AdminSubTable1 = ({ handleUsersModal, user }: any) => (
  <Card>
    <aside className="flex items-center justify-between p-5">
      <div>
        <span
          onClick={handleUsersModal}
          className="text-white rounded p-2 w-max bg-[#2550C0] flex items-center space-x-2 cursor-pointer "
        >
          <p>
            <CirclePlus />
          </p>
          <p>Add User</p>
        </span>
      </div>
      <div className="flex items-center space-x-2 w-1/2">
        <p className="">
          {/* <SearchField inputText={inputText} setInputText={setInputText} /> */}
        </p>
        {/* <span
            //   onClick={handleModal2}
              className="w-max border-[1px] border-[#CBCBCB] rounded-xl flex items-center justify-center p-2 space-x-2 text-black cursor-pointer"
            >
              <b>Filter</b>
              <p>
                <FilterView />
              </p>
            </span> */}
      </div>
    </aside>
    <div className="w-full overflow-auto my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
      {user?.isLoading ? (
        <SkeletonTable />
      ) : 3 > 0 ? (
        <Paginate
          action="view user"
          color={"#272727"}
          dropdown={["Suspend", "Reassign Role", "View Contact"]}
          data={user?.data}
        />
      ) : (
        <p className="text-[#98989A] text-xl text-center capitalize font-medium">
          no result
        </p>
      )}
    </div>
  </Card>
);

export const AdminSubTable2 = ({ handleTenantModal }: any) => (
  <Card>
    <aside className="flex items-center justify-between p-5">
      <div>
        <span
          onClick={handleTenantModal}
          className="text-white rounded p-2 w-max bg-[#2550C0] flex items-center space-x-2 cursor-pointer "
        >
          <p>
            <CirclePlus />
          </p>
          <p>Add Tenants</p>
        </span>
      </div>
      <div className="flex items-center space-x-2 w-1/2">
        <p className="">
          {/* <SearchField inputText={inputText} setInputText={setInputText} /> */}
        </p>
        {/* <span
            //   onClick={handleModal2}
              className="w-max border-[1px] border-[#CBCBCB] rounded-xl flex items-center justify-center p-2 space-x-2 text-black cursor-pointer"
            >
              <b>Filter</b>
              <p>
                <FilterView />
              </p>
            </span> */}
      </div>
    </aside>
    <div className="w-full overflow-auto my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
      {false ? (
        <SkeletonTable />
      ) : 3 > 0 ? (
        <Paginate
          action="view user"
          color={"#272727"}
          dropdown={["Delete"]}
          data={testApi}
        />
      ) : (
        <p className="text-[#98989A] text-xl text-center capitalize font-medium">
          no result
        </p>
      )}
    </div>
  </Card>
);
