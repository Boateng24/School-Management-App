import { IconButton } from "@mui/material";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SchoolIcon from "@mui/icons-material/School";

const Students = () => {
  return (
    <div className=" w-[99vw] mt-[-65px]">
      <Sidebar />
      <div className="flex justify-center">
        {/* <Sidebar /> */}
        {/* First item */}
        <div className="bg-white w-[30vw] h-fit ml-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="primary" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-blue-100 rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-gray-600 mt-2 text-2xl">Students</h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">900</p>
            <p className="text-gray-400">
              <span className="text-green-600">+12%</span> compared to last
              month
            </p>
          </div>
        </div>
        {/* Second */}
        <div className="bg-white w-[30vw] h-fit ml-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="secondary" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-[#fbe9ff] rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-2xl text-gray-600 mt-2">
              Teaching Staff (Teachers)
            </h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">57</p>
            <p className="text-gray-400">
              <span className="text-green-600">+1%</span> compared to last month
            </p>
          </div>
        </div>
        {/* Third item */}
        <div className="bg-white w-[30vw] h-fit mx-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="warning" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-[#f6dcd2] rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-gray-600 mt-2 text-2xl">
              Non-teaching Staff
            </h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">18</p>
            <p className="text-gray-400">
              <span className="text-red-600">- 2%</span> compared to last month
            </p>
          </div>
        </div>
      </div>
      <div className="bg-green-400 h-[70vh] w-[90vw]">Student space</div>
    </div>
  );
};

export default Students;
