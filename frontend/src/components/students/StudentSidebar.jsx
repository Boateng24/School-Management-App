import PersonAdd from "@mui/icons-material/PersonAdd";
import Assessment from "@mui/icons-material/Assessment";
import Event from "@mui/icons-material/Event";
import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  borderLeft: "2px solid #1271FF",
  // backgroundColor: "#1271FF",
  // opacity: 0.1,
  fontWeight: "bold",
  color: "#1271FF",
  textAlign: "center",
};

const StudentSidebar = () => {
  return (
    <div className="h-screen fixed top-0 left-0 w-[15vw] text-white bg-gray-900 flex flex-col">
      <div className="mt-16">
        <NavLink
          to={`home`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="text-white  text-base font-bold p-4 mt-12 "
        >
          <span className="mr-4">
            <PersonAdd />
          </span>
          My Profile
        </NavLink>
      </div>
      <div className=" mt-8">
        <NavLink
          to={`report`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="text-white  text-base font-bold p-4 mt-12 "
        >
          <span className="mr-4">
            <Assessment />
          </span>
          Reports
        </NavLink>
      </div>
      <div className=" mt-8">
        <NavLink
          to={`calendar`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="text-white  text-base font-bold p-4 mt-12 "
        >
          <span className="mr-4">
            <Event />
          </span>
          Academic Calender
        </NavLink>
      </div>
    </div>
  );
};

export default StudentSidebar;
