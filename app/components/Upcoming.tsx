"use client";
import { useState } from "react";
import { TimeIcon } from "../icons/Close";
import Card from "./Card";
import Countdown from "./timer";
import { ElectionCard } from "./ElectionList";
import ReactPaginate from "react-paginate";

export const Upcoming = ({ data }: any) => {
  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = (item) => {
    setDetails(item);
    setShow(true);
  };

  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = 5;
  // const { open } = useStateContext();
  const pagesVisited = pageNumber * Number(pageCount);

  const displayitems = data?.slice(
    pagesVisited,
    pagesVisited + Number(pageCount)
  );
  const page = Math.ceil(data?.length / pageCount);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };
  return (
    <div className="">
      <Card>
        {show ? (
          <Countdown handleShow={() => setShow(false)} details={details} />
        ) : (
          <>
            <h2 className="mt-5 text-xl font-semibold text-center">
              All Upcoming Election
            </h2>
            <p className="text-center">
              Upcoming Election Schedule: Know the Dates. Stay Engaged.
            </p>
            <aside className="p-4 flex items-center justify-between flex-wrap">
              {displayitems?.length > 0 ? (
                <>
                  <div className="w-full sm:w-1/2">
                    {displayitems?.map((item: any) => (
                      <ElectionCard
                        color="#f4f4f4"
                        handleShow={handleShow}
                        key={item?.id}
                        item={item}
                      />
                    ))}
                  </div>
                  <div className="w-full sm:w-1/2">
                    {displayitems?.map((item: any) => (
                      <ElectionCard
                        color="#f4f4f4"
                        handleShow={handleShow}
                        key={item?.id}
                        item={item}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xl text-gray-500 ">No Result</p>
              )}
            </aside>
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
          </>
        )}
      </Card>
    </div>
  );
};
