"use client";
import { useState } from "react";
import { TimeIcon } from "../icons/Close";
import Card from "./Card";
import Countdown from "./timer";
import { ElectionCard } from "./ElectionList";

export const Upcoming = ({ data }: any) => {
  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = (item) => {
    setDetails(item);
    setShow(true);
  };
  return (
    <div className="">
      <Card>
        {show ? (
          <Countdown
            handleShow={() => setShow(false)}
            details={details}
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
              {data?.length > 0 ? (
                <>
                  <div className="w-full sm:w-1/2">
                    {data?.map((item: any) => (
                      <ElectionCard
                        color="#f4f4f4"
                        handleShow={handleShow}
                        key={item?.id}
                        item={item}
                      />
                    ))}
                  </div>
                  <div className="w-full sm:w-1/2">
                    {data?.map((item: any) => (
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
          </>
        )}
      </Card>
    </div>
  );
};
