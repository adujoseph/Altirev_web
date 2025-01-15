"use client";

import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import classNames from "classnames";
import ArrowDown from "../../icons/ArrowDown";
import ArrowUp from "../../icons/ArrowUp";
import { SquareIcon } from "../../icons/ManageUser";
import Dropdown from "./dropdown";
import { ArrowView } from "@/app/icons/Arrow";
import { usePathname } from "next/navigation";
import moment from 'moment'
export function Products({ data, dropdown, action, color }) {
  const [products, setProducts] = useState([]);
  const pathname = usePathname();
 
  const productsData = useMemo(
    () =>
      products?.length > 0
        ? products?.map((product) => {
            if (product?.created_at) {
              let newDate = new Date(product?.created_at).toDateString();
              product.created_at = newDate;
            }
            if (product?.createdAt) {
              const result = extractTime(product?.createdAt);

              let newDate = new Date(product?.createdAt).toDateString();
              product.createdAt = `${newDate} / ${result.time12}`;
            }
            if (product?.endDate) {
              let newDate = new Date(product?.endDate).toDateString();
              product.endDate = newDate;
            }
            if (product?.startDate) {
              let newDate = new Date(product?.startDate).toDateString();
              product.startDate = newDate;
            }
            if (product?.electionDate) {
              let newDate = new Date(product?.electionDate).toDateString();
              product.electionDate = newDate;
            }
            if (product?.phoneNumber) {
              let phoneNumber = product?.phoneNumber?.replace("+234", "0");
              product.phoneNumber = phoneNumber;
            }
            if (product?.dateCreated) {
              let newDate = new Date(product?.dateCreated).toDateString();
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
                key !== "imageUrl" &&
                key !== "modifiedBy" &&
                key !== "altirevId" &&
                key !== "firstName" &&
                key !== "lastName" &&
                key !== "title" &&
                key !== "country" &&
                // key !== "state" &&
                key !== "isActive" &&
                key !== "gender" &&
                // key !== "createdAt" &&
                key !== "dateCreated" &&
                key !== "reasons" &&
                key !== "message" &&
                key !== "requestCall" &&
                key !== "location__entity" &&
                key !== "__entity" &&
                key !== "location" &&
                key !== "previousPassword" &&
                key !== "lastReportTime" &&
                key !== "invalidVotes" &&
                key !== "counts" &&
                key !== "locationId" &&
                key !== "accreditedVoters" &&
                key !== "voteCasted" &&
                key !== "electionId" &&
                key !== "password" &&
                key !== "date" &&
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
                  Cell: ({ value }) =>value,
                };
              }
              if (key === "created_at") {
                return {
                  Header: "date",
                  accessor: key,
                  Cell: ({ value }) =>
                    value.length >= 20
                      ? `${moment(value.slice(0, 20)).format("llll")}...`
                      : moment(value).format("llll"),
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
              if (key === "isCompliant") {
                return {
                  Header: "",
                  accessor: key,
                  Cell: ({ value }) => value && <p className=""></p>,
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
    if (data?.length > 0) {
      setProducts(data);
    } else {
      setProducts([]);
    }
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
              <tr key={index} {...headerGroup?.getHeaderGroupProps()}>
                {pathname === "/dashboard/contact" && (
                  <th className="text-sm  text-secondary"></th>
                )}
                {headerGroup?.headers?.map((column, index) => (
                  <>
                    <th
                      key={index}
                      className="text-sm py-1 px-3 lg:py-2 lg:px-5 capitalize text-[#656565] font-normal"
                      {...column?.getHeaderProps(
                        column?.getSortByToggleProps()
                      )}
                    >
                      <p className="flex items-center space-x-2">
                        {column?.render("Header")}
                        {column?.isSorted ? (
                          column?.isSortedDesc ? (
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
                <th className="font-medium text-sm text-[#656565]">
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
                  {...row?.getRowProps()}
                  className={`  border-y-[1px]  ${
                    isEven(idx) ? "  text-xs" : " text-xs"
                  }`}
                >
                  {pathname === "/dashboard/contact" && (
                    <td className="flex items-center justify-center">
                      <p />
                    </td>
                  )}
                  {row?.cells?.map((cell, idx) => (
                    <>
                      <td
                        key={idx}
                        className={classNames("text-xs px-3 py-1 lg:px-5", {
                          "bg-green-500  text-white rounded flex items-center justify-center mt-2 h-[25px] w-[10px] p-3":
                            cell.value === true,
                          "bg-[#FF170A]  text-white rounded flex items-center justify-center mt-2 h-[25px] w-[10px] p-3":
                            cell.value === false,
                        })}
                        {...cell?.getCellProps()}
                      >
                        {cell?.render("Cell")}
                      </td>
                    </>
                  ))}
                  {dropdown?.length > 0 ? (
                    <td className="cursor-pointer w-0">
                      <Dropdown
                        title={<SquareIcon />}
                        subtitle={dropdown}
                        data={row?.original}
                      />
                    </td>
                  ) : (
                    <td className="cursor-pointer">
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
                        data={row?.original}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

 export function extractTime(isoString) {
    const date = new Date(isoString);

    // Format: HH:MM:SS
    const time24 = date.toTimeString().split(" ")[0];

    // Format: HH:MM:SS.mmm
    const timeWithMs = date.toISOString().split("T")[1].slice(0, -1);

    // Format: hh:MM:SS AM/PM
    const time12 = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return {
      time24,
      timeWithMs,
      time12,
    };
  }