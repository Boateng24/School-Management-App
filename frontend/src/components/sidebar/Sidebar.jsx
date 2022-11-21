import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import BadgeAvatars from "../avatar/Avatar";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { name, id } = useSelector(
    (state) => state.loginSchool.loggedInSchool.loggedInSchool || ""
  );

  const activeStyle = {
    borderBottom: "2px solid #1271FF",
    marginTop: "-15px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1271FF",
    borderRadius: "999px",
    textAlign: "center",
    display: "grid",
    placeItems: "center",
  };

  return (
    <div className="bg-[#29365F] h-48 w-[99vw] scrollbar-hide">
      <div className="">
        <div className="flex justify-between items-center w-[97vw]">
          <div className="text-white text-xl font-bold pl-16">
            <NavLink to={"home"}>{name}</NavLink>
          </div>
          <div>
            <NavLink
              to={`home`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="text-white mt-8 text-base font-bold p-8 pt-12  "
            >
              Dashboard
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`students`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="text-white mt-8 text-base font-bold p-8 pt-12"
            >
              Students
            </NavLink>
          </div>
          <div>
            <NavLink
              to="staffs"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="text-white mt-8 text-base font-bold p-8 pt-12"
            >
              Staffs
            </NavLink>
          </div>
          <div>
            <BadgeAvatars />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
