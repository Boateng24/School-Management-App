import React, { useState } from "react";
import BarChart from "./BarChart";
import { students_population } from "../dashboardData/DashboardData";
import LineChart from "./LineGraph";
import PieChart from "./PieChart";

const Chart1 = () => {
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
        backgroundColor: ["#3C84F3", "#29365F"],
        borderRadius: 2,
      },
    ],
  });

  return (
    <div>
      <LineChart data={studentsPopulation} />
    </div>
  );
};

export default Chart1;
