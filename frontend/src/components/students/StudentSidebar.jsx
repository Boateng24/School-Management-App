import PersonAdd from "@mui/icons-material/PersonAdd";
import Assessment from "@mui/icons-material/Assessment";
import Event from "@mui/icons-material/Event";
import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

const activeStyle = {
  borderLeft: "2px solid #9e879e",
  // backgroundColor: "#9e879e",
  // opacity: 0.1,
  fontWeight: "bold",
  color: "#fff",
  textAlign: "center",
};

const StudentSidebar = () => {
  return (
    <div className="h-screen fixed w-[15vw] text-[#9e879e] bg-[#3C0E3C] flex flex-col">
      <div className="mt-16">
        <NavLink
          to={`dashboard`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="text-[#9e879e]  text-base font-bold p-4 mt-12 "
        >
          <span className="mr-4">
            <DashboardIcon />
          </span>
          My Dashboard
        </NavLink>
      </div>
      <div className="mt-8">
        <NavLink
          to={`home`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="text-[#9e879e]  text-base font-bold p-4 mt-12 "
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
          className="text-[#9e879e]  text-base font-bold p-4 mt-12 "
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
          className="text-[#9e879e]  text-base font-bold p-4 mt-12 "
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
