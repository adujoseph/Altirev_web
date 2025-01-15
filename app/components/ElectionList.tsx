import React from "react";
import { TimeIcon } from "../icons/Close";

export const ElectionCard = ({ handleShow, color, item }: any) => (
  <div
    onClick={() =>handleShow(item)}
    style={{
      background: color,
    }}
    className="flex items-center justify-between rounded p-4 m-3 cursor-pointer hover:shadow"
  >
    <span className="flex items-center space-x-2">
      <p>
        <TimeIcon />
      </p>
      <p>{item?.name}</p>
    </span>

    <small className="text-gray-500">
      {new Date(item?.electionDate)?.toDateString()}
    </small>
  </div>
);
