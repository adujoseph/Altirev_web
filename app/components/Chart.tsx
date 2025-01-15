"use client";
import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({electiondetails}:any) => {
  const partyName = electiondetails?.resultArray?.map((item:any) => item?.partyName);
  const partyVote = electiondetails?.resultArray?.map((item:any) => item?.partyVote);
  const chartOptions = {
    labels:partyName,
    responsive: [
      {
        breakpoint: 80,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
// Corresponding data for each label
  const chartSeries = partyVote;

  return (
    <>
      {chartSeries?.length > 0 ?
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        width="480"
        height={"480"}
      /> :
            <p className="text-gray-500 p-10">
              No data available
            </p>}
    </>
  );
};

export default PieChart;
