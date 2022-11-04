import React from "react";
import { NavLink } from "react-router-dom";
import BadgeAvatars from "../avatar/Avatar";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { name, id } = useSelector((state) => state.schoolLogin.loggedInSchool);
  return (
    <div className="bg-[#29365F] h-48 w-screen flex ">
      <div className="flex justify-around items-start w-[97vw]">
        <div className="text-white mt-8 text-xl font-bold p-8 pt-12 pl-16">
          {name}
        </div>
        <div className="flex justify-between items-start mr-auto">
          <NavLink
            to={`/`}
            className="text-white mt-8 text-base font-bold p-8 pt-12 pl-16"
          >
            Dashboard
          </NavLink>
          <NavLink
            to={`students`}
            className="text-white mt-8 text-base font-bold p-8 pt-12 pl-16"
          >
            Students
          </NavLink>
          <NavLink
            to="/dashboard"
            className="text-white mt-8 text-base font-bold p-8 pt-12 pl-16"
          >
            Teaching Staff (Teachers)
          </NavLink>
          <NavLink
            to="/dashboard"
            className="text-white mt-8 text-base font-bold p-8 pt-12 pl-16"
          >
            Non-teaching Staff
          </NavLink>
        </div>
        <div className="text-white mt-6 text-xl p-8 pt-12 pl-16">
          <BadgeAvatars />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
