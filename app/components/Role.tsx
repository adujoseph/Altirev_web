"use client";
import { CirclePlus, DashboardAgent, DashboardHat } from "../icons/Dashboard";
import { EditIcon } from "../icons/Edit";
import SkeletonTable from "./skeleton/Table";
import Paginate from "./table/table";
import { SearchField } from "@/app/components/Search";
import Card from "@/app/components/Card";
import { FilterVotes } from "@/app/components/FilterVotes";
import { SOPModal } from "@/app/components/SOP";
import UserDetails from "@/app/components/UserDetails";
import { Suspend } from "@/app/components/Suspend";
import { FilterView } from "../icons/Arrow";
import ModalCard from "./modal/Modal";
import AssignRoles from "./AssignRoles";
import useRole from "../hooks/useRole";
import useReport from "../hooks/useReport";

function Role() {
  const {
    inputText,
    setInputText,
    setEdit,
    handleModal,
    handleModal2,
    handleModal3,
    modal,
    modal2,
    modal3,
    edit,
    table,
    setModal2,
    editData,
    user,
    userSearch,
    agentList,
    commsList,
    loading,
    suspendUser,
  } = useRole();
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
      {modal && <AssignRoles modal={modal} handleModal={handleModal} />}

      {modal2 && (
        <ModalCard open={modal2} setOpen={handleModal2}>
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
      {modal3 && (
        <ModalCard open={modal3} setOpen={handleModal3}>
          <SOPModal />
        </ModalCard>
      )}
      {edit && table === "suspend" && (
        <Suspend
          loading={loading}
          suspendUser={suspendUser}
          handleModal={() => setEdit(false)}
          modal={edit}
        />
      )}
      {edit && table === "reassign" && (
        <AssignRoles
          data={editData}
          handleModal={() => setEdit(false)}
          modal={edit}
        />
      )}
      {edit && table === "profile" && (
        <UserDetails
          data={editData}
          handleModal={() => setEdit(false)}
          modal={edit}
        />
      )}
      <RoleCard
        agentList={agentList?.length}
        commsList={commsList?.length}
        handleModal3={handleModal3}
      />
      <RoleTable
        inputText={inputText}
        setInputText={setInputText}
        handleModal2={handleModal2}
        handleModal={handleModal}
        user={user}
        userSearch={userSearch}
      />
    </div>
  );
}

export default Role;

export const RoleCard = ({ handleModal3, commsList, agentList }: any) => (
  <aside className="flex flex-col justify-center items-center sm:items-start sm:justify-start sm:grid sm:grid-cols-3 sm:gap-1 lg:gap-4">
    <div className="bg-[#698AE2] rounded-xl p-5 w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5">
      <span className="flex items-center justify-between">
        <p>
          <DashboardAgent />
        </p>
        <h2 className="font-bold text-white">AGENTS</h2>
      </span>
      <div className="flex items-center justify-between font-bold">
        <span className="flex flex-col text-white">
          <p>Total</p>
          <h1 className="text-xl">{agentList ?? 0}</h1>
        </span>
        <span className="flex flex-col text-white">
          <p>Active</p>
          <h1 className="text-xl">{agentList ?? 0}</h1>
        </span>
      </div>
    </div>
    <div className="bg-[#7478BE] rounded-xl p-5 w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5">
      <span className="flex items-center justify-between">
        <p>
          <DashboardHat />
        </p>
        <h2 className="font-bold text-white">COMMS</h2>
      </span>
      <div className="flex items-center justify-between font-bold">
        <span className="flex flex-col text-white">
          <p>Total</p>
          <h1 className="text-xl">{commsList ?? 0}</h1>
        </span>
        <span className="flex flex-col text-white">
          <p>Active</p>
          <h1 className="text-xl">{commsList ?? 0}</h1>
        </span>
      </div>
    </div>
    <div className="bg-[#225E72] rounded-xl p-5  w-[300px] sm:w-[250px] lg:w-[300px] h-[160px] m-4  flex flex-col space-y-5 relative ">
      <div className="flex items-center justify-between">
        <span>
          <h1 className="text-xl font-semibold text-white">
            Standard Operating Procedures (SOP)
          </h1>
        </span>
      </div>

      <span
        onClick={handleModal3}
        className="cursor-pointer p-2 ml-auto bottom-3 right-3 border-white border-[1px] rounded-md text-white font-semibold absolute flex items-center space-x-2"
      >
        <p>
          <EditIcon color="#fff" />
        </p>
        <p className="text-sm"> Edit</p>
      </span>
    </div>
  </aside>
);

export const RoleTable = ({
  handleModal,
  inputText,
  setInputText,
  handleModal2,
  user,
  userSearch,
}: any) => (
  <section>
    <Card>
      <aside className="flex items-center justify-between p-5">
        <div>
          <span
            onClick={handleModal}
            className="text-white rounded p-2 w-max bg-[#2550C0] flex items-center space-x-2 cursor-pointer "
          >
            <p>
              <CirclePlus />
            </p>
            <p>Add User Role</p>
          </span>
        </div>
        <div className="flex items-center space-x-2 w-1/2">
          <p className="">
            <SearchField inputText={inputText} setInputText={setInputText} />
          </p>
          <span
            onClick={handleModal2}
            className="w-max border-[1px] border-[#CBCBCB] rounded-xl flex items-center justify-center p-2 space-x-2 text-black cursor-pointer"
          >
            <b>Filter</b>
            <p>
              <FilterView />
            </p>
          </span>
        </div>
      </aside>
      <div className="w-full overflow-auto my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
        {user?.isLoading ? (
          <SkeletonTable />
        ) : userSearch?.length > 0 ? (
          <Paginate
            action="view report"
            color={"#272727"}
            dropdown={["Suspend", "Reassign Role", "View Contact"]}
            data={userSearch}
          />
        ) : (
          <p className="text-[#98989A] text-xl text-center capitalize font-medium">
            no result
          </p>
        )}
      </div>
    </Card>
  </section>
);
