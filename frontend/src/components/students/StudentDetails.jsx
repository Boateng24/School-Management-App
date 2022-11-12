import { Divider } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  console.log(studentId);
  return (
    <div className="flex">
      <div className="flex flex-col items-center m-5 w-[20vw] text-left">
        <div className="flex h-64 w-64 rounded-full mb-5 border-4 border-white text-9xl text-white bg-slate-800 text-center items-center justify-center">
          RS
        </div>
        <div className="text-left">
          <h1 className="text-4xl text-gray-500 mb-2">Robert Sam</h1>
          <p className="text-gray-500 mb-4">robert.sam@gmail.com</p>
          <hr />
          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">Gender : </span>
            Male
          </p>

          <hr />
          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">Class : </span>
            JHS 1
          </p>
          <hr />
          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">Guardian : </span>
            Mrs. Kumah Abigail
          </p>
          <hr />

          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">
              Guardian number:
            </span>
            +233243232123
          </p>
        </div>
        {/* <img src="" alt="Student Profiles" /> */}
      </div>
      <div className=" w-[80vw] mt-24 p-4 h-[74vh]">2</div>
    </div>
  );
};

export default StudentDetails;
