import React, { useState } from "react";
import BarChart from "./BarChart";
import {
  students_dropout,
  students_population,
} from "../dashboardData/DashboardData";
import LineChart from "./LineGraph";

const Chart = () => {
  const [studentsPopulation, setStudentsPopulation] = useState({
    labels: students_population.map(
      (studentPopulation) => studentPopulation.month
    ),
    datasets: [
      {
        label: "Students Population",
        data: students_population.map(
          (studentPopulation) => studentPopulation.population
        ),
        // xAxisID: "Months",
        // yAxisID: "Number",
        // backgroundColor: ["#FFE0E6", "#D7ECFB"],
        backgroundColor: ["#3C84F3"],
        borderRadius: 4,
        borderWidth: 1,
        barThickness: 30,
        // borderColor: ["#FF6384"],
      },
      {
        label: " Population",
        data: students_dropout.map(
          (studentPopulation) => studentPopulation.population
        ),
        // xAxisID: "Months",
        // yAxisID: "Number",
        // backgroundColor: ["#207AEF"],
        backgroundColor: ["#374160"],
        borderRadius: 2,
        // borderColor: ["#36A2EB"],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  });

  return (
    <div className="border-2 border-gray-100 rounded-lg p-1 mt-2">
      <BarChart data={studentsPopulation} />
    </div>
  );
};

export default Chart;
