import React, { useState } from "react";
import BarChart from "./BarChart";
import { Doughnut } from "react-chartjs-2";
import {
  students_dropout,
  students_population,
} from "../dashboardData/DashboardData";
import LineChart from "./LineGraph";
import { Pie } from "react-chartjs-2";

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

        backgroundColor: ["#3C84F3"],
        borderRadius: 4,
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: " Population",
        data: students_dropout.map(
          (studentPopulation) => studentPopulation.population
        ),
        backgroundColor: ["#374160"],
        borderRadius: 2,
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  });

  return (
    <div className="border-2 border-gray-100 rounded-lg p-1 mt-2">
      <LineChart data={studentsPopulation} />
    </div>
  );
};

export default Chart;
