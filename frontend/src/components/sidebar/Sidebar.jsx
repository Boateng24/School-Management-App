import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import BadgeAvatars from "../avatar/Avatar";
import { useSelector } from "react-redux";

const Sidebar = () => {
  // const { name, id } = useSelector((state) => state.schoolLogin.loggedInSchool);
  return (
    <div className="bg-[#29365F] h-48 w-screen ">
      <div className="">
        {/* <div className="text-white mt-8 text-xl font-bold p-8 pt-12 pl-16"> */}
        {/* {name} */}
        {/* </div> */}
        <div className="flex justify-between items-center w-[97vw]">
          <div>
            <NavLink
              to={`/`}
              className="text-white mt-8 text-base font-bold p-8 pt-12 pl-16"
            >
              Dashboard
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`students`}
              className="text-white mt-8 text-base font-bold p-8 pt-12 pl-16"
            >
              Students
            </NavLink>
          </div>
          <div>
            <NavLink
              to="staffs"
              className="text-white mt-8 text-base font-bold p-8 pt-12 pl-16"
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
