"use client";
import Card from "@/app/components/Card";
import { PollingDetails } from "@/app/components/PollingDetails";
import { SearchField } from "@/app/components/Search";
import useReport from "@/app/hooks/useReport";
import { ArrowView, FilterView } from "@/app/icons/Arrow";
import Loading from "@/app/loading";

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
  } = useReport("");
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
              ) : total_report_search?.length > 0 ? (
                total_report_search?.map((i: any) => (
                  <aside
                    key={i?.id}
                    onClick={() => handleDetails(i)}
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
                        <h2 className="font-medium">{i?.ward}{', '}{i?.LGA} Polling Unit</h2>
                        <small className="text-[#272727]">
                          {new Date(i?.createdAt)?.toDateString()}
                        </small>
                      </span>
                      {i?.type !== 'report' ? (
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
            </div>
          </Card>
        </section>
        {details && (
          <div className="w-full lg:w-1/3">
            <PollingDetails
              handleDetails={() => setDetails(false)}
              data={detailReport}
              type={detailReport?.accreditedVoters >= 0 ? "result" : "report"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
