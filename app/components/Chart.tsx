"use client";
import React from "react";
import { Chart as Charts } from "react-google-charts";
import Chart from "react-apexcharts";

export function ChartData({ data, options, type }: any) {
  return (
    <Charts
      chartType={"BarChart"}
      data={data}
      options={options}
      className="w-[400px]"
      width={"100%"}
      height={"400px"}
    />
  );
}

const PieChart = () => {
  const chartOptions = {
    labels: [" A", " B", " C", " D"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = [44, 55, 13, 33]; // Corresponding data for each label

  return (
    <>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        width="380"
        height={"380"}
      />
    </>
  );
};

export default PieChart;
