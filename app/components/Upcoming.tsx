'use client'
import { useState } from "react";
import { TimeIcon } from "../icons/Close";
import Card from "./Card";
import Countdown from "./timer";
import { ElectionCard } from "./ElectionList";

export const Upcoming = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow((prev) => !prev);
  return (
    <div className="">
      <Card>
        {show ? (
          <Countdown
            handleShow={handleShow}
            targetDate={"June 1, 2025 10:00:00"}
          />
        ) : (
          <>
            <h2 className="mt-5 text-xl font-semibold text-center">
              All Upcoming Event
            </h2>
            <p className="text-center">
              Upcoming Election Schedule: Know the Dates. Stay Engaged.
            </p>
            <aside className="p-4 flex items-center justify-between flex-wrap">
              <div className="w-full sm:w-1/2">
                {Array(4)
                  .fill("")
                  .map((i) => (
                    <ElectionCard color="#f4f4f4"  handleShow={handleShow} key={i} />
                  ))}
              </div>
              <div className="w-full sm:w-1/2">
                {Array(4)
                  .fill("")
                  .map((i) => (
                    <ElectionCard color="#f4f4f4"  handleShow={handleShow} key={i} />
                  ))}
              </div>
            </aside>
          </>
        )}
      </Card>
    </div>
  );
};
