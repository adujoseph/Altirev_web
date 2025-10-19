"use client";
import Card from "@/app/components/Card";
import { PollingDetails } from "@/app/components/PollingDetails";
import { SearchField } from "@/app/components/Search";
import useElection from "@/app/hooks/useElection";
import useReport from "@/app/hooks/useReport";
import { ArrowView, FilterView } from "@/app/icons/Arrow";
import Loading from "@/app/loading";
import { getApi } from "@/app/services";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function page() {
  const {
    total_report_search,
    report,
    inputText,
    setInputText,
    details,
    setDetails,
    handleDetails,
    detailReport,
    title,
    user,
  } = useReport("");
  const { sortedOngoingElections } = useElection();
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = 5;
  // const { open } = useStateContext();
  const pagesVisited = pageNumber * Number(pageCount);

  const displayitems = sortedOngoingElections?.slice(
    pagesVisited,
    pagesVisited + Number(pageCount)
  );
  const page = Math.ceil(sortedOngoingElections?.length / pageCount);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };
  const getResult = async(id:string) => {
    const res = await getApi(`elections/${id}`);
  }
  return (
    <div>
      <h2 className="text-2xl font-bold">Polling Unit Reports</h2>
      <div className="flex flex-col-reverse lg:flex-row">
        <section className="w-full lg:w-1/2">
          <Card>
            <div className="flex items-center space-x-4 justify-center p-5 shadow">
              <span className="">
                <SearchField
                  inputText={inputText}
                  setInputText={setInputText}
                />
              </span>
              <p
                // onClick={handleModal}
                className=""
              >
                <FilterView />
              </p>
            </div>
            <div className="flex flex-col  h-screen overflow-y-scroll">
              {report?.isLoading ? (
                <span className="flex items-center justify-center">
                  <Loading />
                </span>
              ) : displayitems?.length > 0 ? (
                displayitems?.map((i: any) => (
                  <aside
                    key={i?.id}
                    onClick={() => getResult(i?.id)}
                    className="flex items-center justify-between py-3 px-6 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      {/* <span>
                        <img
                          className="size-10 rounded-full object-cover"
                          src={i?.imageUrl ?? ""}
                          alt="report"
                        />
                      </span> */}
                      <span className="flex flex-col">
                        <h2 className="font-medium">
                        
                          {i?.description}
                        </h2>
                        <small className="text-[#272727]">
                          {new Date(i?.electionDate)?.toDateString()}
                        </small>
                      </span>
                      {i?.type !== "report" ? (
                        <p className="p-2 bg-[#E4FFE4] w-max rounded text-sm font-medium">
                          Result
                        </p>
                      ) : (
                        <p className="p-2 bg-[#FFEFEE] w-max rounded text-sm font-medium">
                          Report
                        </p>
                      )}
                    </div>
                    <p>
                      <ArrowView color="#BCBCBC" />
                    </p>
                  </aside>
                ))
              ) : (
                <p className=" font-semibold p-5 text-gray-500 capitalize">
                  no result
                </p>
              )}
              <ReactPaginate
                previousLabel={
                  <p className="rounded-lg bg-gray-100 p-3 font-semibold capitalize">
                    prev
                  </p>
                }
                nextLabel={
                  <p className="rounded-lg bg-gray-100 p-3 font-semibold capitalize">
                    next
                  </p>
                }
                pageCount={page}
                onPageChange={(e) => changePage(e)}
                containerClassName={
                  "p-2 text-xs lg:text-base flex space-x-3 items-center"
                }
                previousLinkClassName={"rounded-sm p-2"}
                nextLinkClassName={"rounded-sm p-2"}
                disabledClassName={""}
                pageClassName={"text-[#1F2024]"}
                activeClassName={
                  "rounded shadow-xl bg-gray-700 !text-white px-2 font-semibold"
                }
              />
            </div>
          </Card>
        </section>
        {details && (
          <div className="w-full lg:w-1/3">
            <PollingDetails
              user={user}
              handleDetails={() => setDetails(false)}
              data={detailReport}
              title={title}
              type={detailReport?.accreditedVoters >= 0 ? "result" : "report"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
