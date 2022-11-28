import React from "react";
import { Outlet } from "react-router-dom";

const StudentsPage = () => {
  return (
    <div>
      <h1>Welcome Sam</h1>
      <Outlet />
    </div>
  );
};

export default StudentsPage;
