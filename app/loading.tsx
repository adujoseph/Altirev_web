import React from "react";

export default function Loading() {
  return (
    <div className="h-screen items-center justify-center flex">
      <svg
        className="animate-spin size-10 p-2.5 mr-3 border-l-transparent border-2 rounded-full border-[#3399FF]"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
}