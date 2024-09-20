import React from "react";
import { TimeIcon } from "../icons/Close";

export default function ElectionList() {
  return (
    <div className="flex flex-col space-y-2">
      {Array(10)
        .fill("")
        .map((i) => (
          <ElectionCard key={i} />
        ))}
    </div>
  );
}

export const ElectionCard = ({ handleShow ,color}:any) => (
  <div
    onClick={handleShow}
    style={{
        background:color
    }}
    className="flex items-center justify-between rounded p-4 m-3 cursor-pointer hover:shadow"
  >
    <span className="flex items-center space-x-2">
      <p>
        <TimeIcon />
      </p>
      <p>Ogun Governorship Election</p>
    </span>

    <small className="text-gray-500">2/28/24</small>
  </div>
);
