"use client";
import { useState } from "react";
import { VoteNotification, VoteNotification2 } from "../icons/Search";
import { BackArrow } from "../icons/Arrow";
import classNames from "classnames";
import Input from "./Input";
import { EditIcon } from "../icons/Edit";
import Button from "./Button";
// import DOMPurify from "dompurify";

export const SOPModal = () => {
  const [show, setShow] = useState(true);
  const handleModal = () => setShow((prev) => !prev);
  const [comment, setComment] = useState("");
  // const sanitizedHTML = DOMPurify.sanitize(value);

  return (
    <div className="">
      {show ? (
        <>
          <h2 className="font-bold text-xl">Standard Operating Procedures</h2>
          <p
            onClick={handleModal}
            className="cursor-pointer flex items-center justify-center border-[1px] border-[#101720] text-[#101720] rounded ml-auto p-2 w-max my-3 text-sm font-bold"
          >
            Create New SOP
          </p>
          <div
            onClick={handleModal}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center space-x-3">
              <p className="size-10 bg-[#F3F3F3] rounded-full p-2 flex items-center justify-center">
                {false ? <VoteNotification /> : <VoteNotification2 />}
              </p>
              <h2>Things to do as an agent!</h2>
            </span>
            <p
              className={classNames("", {
                "text-gray-500": true,
              })}
            >
              Apr 5, {new Date().getFullYear()}
            </p>
          </div>
          <hr className=" my-2 h-0.5" />
        </>
      ) : (
        <>
          <p
            onClick={handleModal}
            className="cursor-pointer absolute left-4 top-5 rounded border-[1px] bg-gray-50 py-1 px-3.5 flex items-center justify-center "
          >
            <BackArrow />
          </p>
          <section className="overflow-hidden">
            <h2 className="font-bold text-xl text-center my-5">
              Standard Operating Procedures
            </h2>

            <Input
              label="Subject"
              placeholder="john doe"
              name="fname"
              type="text"
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   value={values.name}
              icon={true ? <EditIcon /> : <></>}
              iconFunc={() => {}}
            />
            <div className="flex flex-col space-y-2">
              <div className="font-semibold capitalize flex flex-col space-y-1 my-4">
                <label htmlFor="comment" className="text-sm font-medium">
                  Comment
                </label>
                <textarea
                  name="comment"
                  placeholder="comment"
                  value={comment}
                  // onBlur={handleBlur}
                  // dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                  onChange={(e) => setComment(e.target.value)}
                  className={`p-2 rounded resize-none outline-none ${
                    comment
                      ? "border-2 border-green-500"
                      : "border-[1px] border-gray-300 text-sm"
                  }`}
                ></textarea>
              </div>
            </div>
            <Button
              onClick={() => {}}
              label={true ? "Delete" : "Save"}
              styles={
                true
                  ? "bg-[#FF3B30] w-full rounded mx-auto mt-4"
                  : `bg-[#2550C0] w-full rounded mx-auto mt-4`
              }
              //   loading={loading}
            />
          </section>
        </>
      )}
    </div>
  );
};
