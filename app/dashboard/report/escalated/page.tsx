"use client";
import ModalCard from "../../../components/modal/Modal";
import ReportDetails from "../../../components/ReportDetails";
import Card from "../../../components/Card";
import { BackArrow, FilterView } from "../../../icons/Arrow";
import { SearchField } from "../../../components/Search";
import { FilterVotes } from "../../../components/FilterVotes";
import SkeletonTable from "../../../components/skeleton/Table";
import Paginate from "../../../components/table/table";
import useReport from "../../../hooks/useReport";
import { User } from "../../../typings";
import useAuth from "../../../components/Auth";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/app/context/context";
import { useEffect } from "react";

function Report() {
  const {} = useAuth(["comms", "moderator"]);
  const { category, user, escalatedReport, report } = useReport("");
  const navigate = useRouter();
  const {setIsEscalated } = useStateContext();

  const back = () => {
    navigate.push("/dashboard");
    setIsEscalated(false)
  };
  useEffect(() => {
    setIsEscalated(true)
  },[])
  
  return (
    <>
      <span
        onClick={back}
        className="flex my-4 cursor-pointer items-center space-x-1"
      >
        <>
          <BackArrow color="#272727" />
        </>
        <p className="font-semibold text-sm text-[#272727]">Back to Dashboard</p>
      </span>
      <h1 className="text-xl text-[#272727] font-semibold">Escalated Report</h1>
      <ReportTable
        loading={report.isLoading}
        report={escalatedReport?.data}
        category={category} 
        user={user}
      />
    </>
  );
}

export default Report;
interface ReportTableProps {
  category: string;
  loading: boolean;
  report: any;
  user: User;
}
const ReportTable = ({ category, report, loading, user }: ReportTableProps) => (
  <Card>
    <div className="w-full overflow-auto sm:overflow-hidden my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-10">
      {loading ? (
        <SkeletonTable />
      ) : report?.length > 0 ? (
        <Paginate
          page_count={20}
          action="view report"
          color={
            category === "rejected"
              ? "#FF0E00"
              : category === "approved"
              ? "#2550C0"
              : "#272727"
          }
          dropdown={user?.role === "comms" ? ["view report"] : []}
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
