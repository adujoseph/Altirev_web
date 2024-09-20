"use client";
import ModalCard from "./modal/Modal";
import ReportDetails from "./ReportDetails";
import Card from "./Card";
import { FilterView } from "../icons/Arrow";
import { SearchField } from "./Search";
import { FilterVotes } from "./FilterVotes";
import SkeletonTable from "./skeleton/Table";
import Paginate from "./table/table";
import useReport from "../hooks/useReport";

function Report() {
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
    reportSearch,
    report,
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
    pollingUnitId,ward
  } = useReport("");
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
      <h1 className="text-xl text-[#272727] font-semibold">Election Report</h1>
      <ReportHeader
        user={user}
        setInputText={setInputText}
        handleModal={handleModal}
        inputText={inputText}
        category={category}
        setCategory={setCategory}
      />
      <ReportTable
        loading={report.isLoading}
        report={reportSearch}
        category={category}
      />
    </>
  );
}

export default Report;
interface ReportTableProps {
  category: string;
  loading: boolean;
  report: any;
}
const ReportTable = ({ category, report ,loading}: ReportTableProps) => (
  <Card>
    <div className="w-full overflow-auto sm:overflow-hidden my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
      {loading ? (
        <SkeletonTable />
      ) : report?.length > 0 ? (
        <Paginate
          action="view report"
          color={
            category === "rejected"
              ? "#FF0E00"
              : category === "approved"
              ? "#2550C0"
              : "#272727"
          }
          dropdown={[]}
          data={report}
        />
      ) : (
        <p className="text-[#98989A] text-xl text-center capitalize font-medium">
          no report
        </p>
      )}
    </div>
  </Card>
);

interface ReportHeaderProps {
  category: string;
  inputText: string;
  setCategory: (e?: any) => void;
  setInputText: (e?: any) => void;
  user: any;
  handleModal: () => void;
}

const ReportHeader = ({
  user,
  category,
  setCategory,
  inputText,
  setInputText,
  handleModal,
}: ReportHeaderProps) => (
  <aside className="flex items-center justify-between">
    <div className="flex items-center justify-center sm:justify-start w-1/2">
      {user?.name !== "moderator" && (
        <div
          onClick={() => setCategory("new")}
          className={
            category === "new"
              ? "font-semibold text-[#2550C0] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#2550C0] sm:w-[120px]"
              : "text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-center text-sm border-b-2 border-[#CBCBCB] w-[120px]"
          }
        >
          <p className="text-sm sm:text-base">New </p>
        </div>
      )}
      <div
        onClick={() => setCategory("approved")}
        className={
          category === "approved"
            ? "font-semibold text-[#2550C0] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#2550C0] sm:w-[120px]"
            : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[120px]"
        }
      >
        <p className="text-sm sm:text-base">Approved</p>
      </div>
      <div
        onClick={() => setCategory("rejected")}
        className={
          category === "rejected"
            ? "font-semibold text-[#2550C0] flex items-center space-x-3 justify-center text-center text-sm border-b-2 border-[#2550C0] sm:w-[120px]"
            : "text-center text-[#CBCBCB] flex items-center space-x-3 justify-center cursor-pointer text-sm border-b-2 border-[#CBCBCB] w-[120px]"
        }
      >
        <p className="text-sm sm:text-base">Rejected</p>
      </div>
    </div>
    <div className="flex items-center space-x-2 w-1/2">
      <p className="">
        <SearchField inputText={inputText} setInputText={setInputText} />
      </p>
      <span
        onClick={handleModal}
        className="w-max border-[1px] border-[#CBCBCB] rounded-xl flex items-center justify-center p-2 space-x-2 text-black cursor-pointer"
      >
        <b>Filter</b>
        <p>
          <FilterView />
        </p>
      </span>
    </div>
  </aside>
);
