"use client";
import { useState, memo, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
// import { useStateContext } from "../../context/context";
import PageSize from "./PageSize";
import { Products } from "./index";

const Paginate = ({ data, dropdown, action, color }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(5);
  const [displayitems, setDisplayItems] = useState([]);
  // const { open } = useStateContext();
  const pagesVisited = pageNumber * Number(pageCount);

  // const displayitems = data?.slice(
  //   pagesVisited,
  //   pagesVisited + Number(pageCount)
  // )

  const page = Math.ceil(data?.length / Number(pageCount));
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  useMemo(() => {
    if (displayitems?.length === 0) {
      setDisplayItems(data);
      return;
    }
  }, [displayitems?.length]);

  useMemo(() => {
    setDisplayItems(
      data?.slice(pagesVisited, pagesVisited + Number(pageCount))
    );
  }, [data, pagesVisited, pageCount]);

  return (
    <div className="">
      {/* <PageSize setPageCount={setPageCount} /> */}
      <div className="w-full">
        <Products
          data={displayitems}
          action={action}
          color={color}
          dropdown={dropdown}
        />
      </div>
      <div className="flex items-center justify-center">
        <ReactPaginate
          previousLabel={
            <p className="bg-[#F6F6F6] p-3 rounded-lg font-semibold capitalize">
              prev
            </p>
          }
          nextLabel={
            <p className="bg-[#F6F6F6] p-3 rounded-lg font-semibold capitalize">
              next
            </p>
          }
          pageCount={page}
          onPageChange={changePage}
          containerClassName={
            "p-2 text-xs lg:text-base flex space-x-3 items-center"
          }
          previousLinkClassName={"rounded-sm p-2"}
          nextLinkClassName={"rounded-sm p-2"}
          disabledClassName={""}
          pageClassName={"text-[#1F2024]"}
          activeClassName={
            "rounded-lg bg-[#F6F6F6] p-2 text-black font-semibold"
          }
        />
      </div>
    </div>
  );
};

export default memo(Paginate);
