import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import StudentReport from "../../pages/students/StudentReport";

const StudentBody = () => {
  return (
    <div className="w-[100vw] h-screen">
      {/* <div className="h-[8vh] ml-[18vw] bg-grey-100  border-b-2 border-gray-100 flex items-center">
        <h3 className="font-bold text-gray-500">School name here</h3>
      </div> */}
      <div className="h-screen bg-grey-50">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentBody;
