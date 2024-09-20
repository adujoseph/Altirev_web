'use client'
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({percentage}:any) => {
  return (
    <div style={{ width: 250, height: 250 }}>
      <CircularProgressbar
        value={percentage ?? 0}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#2550C0",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
