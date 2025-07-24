"use client";
import useResult from "../hooks/useResult";
import ModalCard from "./modal/Modal";
import ResultDetails from "./ResultDetails";
import Card from "./Card";
import { FilterView } from "../icons/Arrow";
import { SearchField } from "./Search";
import { FilterVotes } from "./FilterVotes";
import SkeletonTable from "./skeleton/Table";
import Paginate from "./table/table";
import useAuth from "./Auth";

function Result() {
  const {} = useAuth(["comms", "moderator"]);

  const {
    inputText,
    setCategory,
    setEdit,
    modal,
    setModal,
    setInputText,
    edit,
    category,
    user,
    handleModal,
    resultSearch,
    userDetails,
    results,
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
    filter,
    editData,
    resultByID,
    loading,
    setEditData,
    resultID,title
  } = useResult("");
  return (
    <>
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

        <>
          <h1 className="text-xl text-[#272727] font-semibold">
            Election Result
          </h1>
          <ResultHeader
            user={user}
            setInputText={setInputText}
            handleModal={handleModal}
            inputText={inputText}
            category={category}
            setCategory={setCategory}
            title={title}
          />
          <ResultTable
            loading={results.isLoading}
            result={modal ? filter?.data : resultSearch}
            category={category}
          />
        </>
    </>
  );
}

export default Result;

interface ResultTableProps {
  category: string;
  loading: boolean;
  result: any;
}
const ResultTable = ({ category, result, loading }: ResultTableProps) => (
  <Card>
    <div className="w-full overflow-auto sm:overflow-hidden my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
      {loading ? (
        <SkeletonTable />
      ) : result?.length > 0 ? (
        <Paginate
          action="view result"
          color={
            category === "rejected"
              ? "#FF0E00"
              : category === "approved"
              ? "#2550C0"
              : "#272727"
          }
          dropdown={[]}
          data={result}
        />
      ) : (
        <p className="text-[#98989A] text-xl text-center capitalize font-medium">
          no result
        </p>
      )}
    </div>
  </Card>
);
interface ResultHeaderProps {
  category: string;
  inputText: string;
  setCategory: (e?: any) => void;
  setInputText: (e?: any) => void;
  user: any;
  handleModal: () => void;
  title:string
}
const ResultHeader = ({
  user,
  category,
  setCategory,
  inputText,
  setInputText,
  handleModal,title
}: ResultHeaderProps) => (
  <aside className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between w-full">
    <div className="flex items-center justify-center sm:justify-start w-full sm:w-1/2">
      {user?.role === "comms" && title !== "Observer"&&  (
        <>
          <div
            onClick={() => setCategory("pending")}
            className={
              category === "pending"
                ? "font-semibold text-[#2550C0] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#2550C0] sm:w-[120px]"
                : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[120px]"
            }
          >
            <p className="text-base">New</p>
          </div>
        </>
      )}
      <div
        onClick={() => setCategory("approved")}
        className={
          category === "approved"
            ? "font-semibold text-[#2550C0] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#2550C0] sm:w-[120px]"
            : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[120px]"
        }
      >
        <p className="text-base">Approved</p>
      </div>
      {title !== "Observer"&& 
      <div
        onClick={() => setCategory("rejected")}
        className={
          category === "rejected"
            ? "font-semibold text-[#2550C0] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#2550C0] sm:w-[120px]"
            : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[120px]"
        }
      >
        <p className="text-base">Rejected</p>
      </div>}
    </div>
    <div className="flex items-center space-x-2 w-full sm:w-1/2">
      <p className="">
        <SearchField inputText={inputText} setInputText={setInputText} />
      </p>
      {/* <span
        onClick={handleModal}
        className="w-max border-[1px] border-[#CBCBCB] rounded-xl flex items-center justify-center p-2 space-x-2 text-black cursor-pointer"
      >
        <b>Filter</b>
        <p>
          <FilterView />
        </p>
      </span> */}
    </div>
  </aside>
);
