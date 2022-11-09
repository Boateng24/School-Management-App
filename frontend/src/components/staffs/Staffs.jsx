import { Button, IconButton } from "@mui/material";
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import SchoolIcon from "@mui/icons-material/School";
// import AddIcon from "@mui/icons-material/Add";

import Staff from "./Staff";

const Staffs = () => {
  return (
    <div className=" w-[99vw] mt-[120px]">
      <div className="flex justify-center">
        <div className="bg-white w-[30vw] h-fit ml-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="primary" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-blue-100 rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-gray-600 mt-2 text-2xl">
              Teaching Staff
            </h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">2</p>
            <p className="text-gray-400">
              <span>4</span> males and 8 females
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
              Non-teaching Staffs
            </h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">27</p>
            <p className="text-gray-400">
              <span>4</span> males and 8 females
            </p>
          </div>
        </div>

        <div className="bg-white w-[30vw] h-fit mx-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="warning" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-[#f6dcd2] rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-gray-600 mt-2 text-2xl">
              Cleaners and other workers
            </h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">158</p>
            <p className="text-gray-400">
              <span>4</span> males and 8 females
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg h-[70vh] w-[92vw] flex flex-col m-auto mt-4 p-4 border-2 border-gray-100">
        <div className="h-[10%] flex justify-between">
          <div>
            <input
              // onChange={onChange}
              // value={email}
              type="text"
              required
              name="search"
              placeholder="Search students"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div>
            <Button variant="contained" style={{ backgroundColor: "#29365F" }}>
              Add Staff
            </Button>
          </div>
        </div>
        <div className="h-[90%] ">
          <Staff />
          <Staff />
          <Staff />
          <Staff />
          <Staff />

          <Staff />
        </div>
      </div>
    </div>
  );
};

export default Staffs;
