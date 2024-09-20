"use client";

import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import classNames from "classnames";
import ArrowDown from "../../icons/ArrowDown";
import ArrowUp from "../../icons/ArrowUp";
import { SquareIcon } from "../../icons/ManageUser";
import Dropdown from "./dropdown";
import { useAppSelector } from "@/app/redux/hook";
import { ArrowView } from "@/app/icons/Arrow";
import { usePathname } from "next/navigation";

export function Products({ data, dropdown, action, color }) {
  const [products, setProducts] = useState(data);
  const pathname = usePathname();
  const user = useAppSelector((state) => state?.user?.user);
  const productsData = useMemo(
    () =>
      products?.length > 0
        ? products?.map((product) => {
            if (product.created_at) {
              let newDate = new Date(product.created_at).toDateString();
              product.created_at = newDate;
            }
            if (product.createdAt) {
              let newDate = new Date(product.createdAt).toDateString();
              product.createdAt = newDate;
            }
            if (product.electionDate) {
              let newDate = new Date(product.electionDate).toDateString();
              product.electionDate = newDate;
            }
            if (product.dateCreated) {
              let newDate = new Date(product.dateCreated).toDateString();
              product.dateCreated = newDate;
            }
            return product;
          })
        : [],
    [products]
  );

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => {
              return (
                key !== "isReplied" &&
                key !== "videoUrl" &&
                key !== "audioUrl" &&
                key !== "isDisabled" &&
                key !== "staffId" &&
                key !== "updated_at" &&
                key !== "updatedAt" &&
                key !== "fileUrl" &&
                key !== "dateModified" &&
                key !== "deletedAt" &&
                key !== "socialId" &&
                key !== "tenantId" &&
                key !== "userAltirevId" &&
                key !== "altirevId" &&
                key !== "provider" &&
                key !== "id" &&
                key !== "userId" &&
                key !== "user_id"
              );
            })
            .map((key) => {
              if (key === "requestPurpose") {
                return {
                  Header: "Purpose",
                  accessor: key,
                };
              }
              if (key === "createdAt") {
                return {
                  Header: "date",
                  accessor: key,
                  Cell: ({ value }) =>
                    value.length >= 20 ? `${value.slice(0, 20)}...` : value,
                };
              }
              if (key === "created_at") {
                return {
                  Header: "date",
                  accessor: key,
                  Cell: ({ value }) =>
                    value.length >= 20 ? `${value.slice(0, 20)}...` : value,
                };
              }
              if (key === "comment") {
                return {
                  Header: "comment",
                  accessor: key,
                  Cell: ({ value }) =>
                    value.length >= 20 ? `${value.slice(0, 20)}...` : value,
                };
              }
              if (key === "requestPurpose") {
                return {
                  Header: "Purpose",
                  accessor: key,
                };
              }
              if (key === "fileUrl") {
                return {
                  Header: "attached file",
                  accessor: key,
                  Cell: ({ value }) =>
                    value && (
                      <a href={value} download>
                        <img
                          src={value}
                          alt={value}
                          style={{ width: 50, height: 50 }}
                          className="rounded object-contain"
                        />
                      </a>
                    ),
                };
              }
              if (key === "imageUrl") {
                return {
                  Header: "image",
                  accessor: key,
                  Cell: ({ value }) =>
                    value && (
                      <a href={value} download>
                        <img
                          src={value}
                          alt={value}
                          style={{ width: 50, height: 50 }}
                          className="!rounded-full"
                        />
                      </a>
                    ),
                };
              }
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [...columns]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const isEven = (idx) => idx % 2 === 0;
  return (
    <>
      <div className="w-full">
        <table
          className="w-full overflow-auto scrollbar-hide"
          {...getTableProps()}
        >
          <thead className="capitalize border-spacing-3 border-secondary">
            {headerGroups?.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {pathname === "/dashboard/contact" && (
                  <th className="text-sm  text-secondary"></th>
                )}
                {headerGroup.headers.map((column, index) => (
                  <>
                    <th
                      key={index}
                      className="text-sm py-1 px-3 lg:py-2 lg:px-5 capitalize text-[#656565] font-normal"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <p className="flex items-center space-x-2">
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDown />
                          ) : (
                            <ArrowUp />
                          )
                        ) : (
                          ""
                        )}
                      </p>
                    </th>
                  </>
                ))}
                <th className="text-sm  text-secondary">
                  {dropdown?.length > 0 ? "Action" : ""}
                </th>
              </tr>
            ))}
          </thead>
          <tbody className=" text-xs" {...getTableBodyProps()}>
            {rows?.map((row, idx) => {
              prepareRow(row);

              return (
                <tr
                  key={idx}
                  {...row.getRowProps()}
                  className={`  border-y-[1px]  ${
                    isEven(idx) ? "  text-xs" : " text-xs"
                  }`}
                >
                  {pathname === "/dashboard/contact" && (
                    <td className="flex items-center justify-center">
                      <p className="cursor-pointer size-5 bg-[#91EE91] rounded mt-5" />
                    </td>
                  )}
                  {row?.cells?.map((cell, idx) => (
                    <>
                      <td
                        key={idx}
                        className={classNames("text-xs px-3 py-1 lg:px-5", {
                          "bg-[#FF8F00]  text-white rounded-full flex items-center justify-center mt-2 w-[80px] lg:w-[100px] p-1":
                            cell.value === "Pending",
                          "bg-green-500  text-white rounded-full flex items-center justify-center mt-2 w-[80px] lg:w-[100px] p-1":
                            cell.value === "Approved",
                          "bg-[#FF170A]  text-white rounded-full flex items-center justify-center mt-2 w-[80px] lg:w-[100px] p-1":
                            cell.value === "Rejected",
                          "bg-[#376BDB] text-white rounded-full flex items-center justify-center mt-2 w-[80px] lg:w-[100px] p-1":
                            cell.value === "Rework",
                        })}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    </>
                  ))}
                  <td className="cursor-pointer">
                    {dropdown?.length > 0 ? (
                      <Dropdown
                        title={<SquareIcon />}
                        subtitle={dropdown}
                        data={row.original}
                      />
                    ) : (
                      <Dropdown
                        title={
                          <span
                            style={{
                              background: color,
                            }}
                            className="capitalize flex items-center rounded p-2 text-white space-x-2"
                          >
                            <p className="font-semibold">{action}</p>
                            <p>
                              <ArrowView color="#fff" />
                            </p>
                          </span>
                        }
                        action={action}
                        // subtitle={['']}
                        data={row.original}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
