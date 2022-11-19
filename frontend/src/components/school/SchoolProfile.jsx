import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SchoolProfile = () => {
  const { isLoggingIn, loggedInSchool, error } = useSelector(
    (state) => state.loginSchool.loggedInSchool
  );

  return (
    <div className="flex">
      <div className="flex flex-col items-center m-5 w-[20vw] text-left">
        <div className="flex h-64 w-64 rounded-full mb-5 border-4 border-white text-9xl text-white bg-slate-800 text-center items-center justify-center">
          {loggedInSchool?.name.slice(0, 2)}
        </div>
        <div className="text-left border-2 border-gray-100 h-auto mt-1 rounded">
          <p className="p-4 text-lg">
            Non Teaching Staffs : <span className="font-medium">25</span>
          </p>
          <Divider />
          <p className="p-4 text-lg">
            Teaching staffs : <span className="font-medium">26</span>
          </p>
          <Divider />
          <p className="p-4 text-lg">
            Total staffs : <span className="font-medium">46</span>
          </p>
        </div>
        <div className="text-left border-2 border-gray-100 h-auto mt-4 rounded">
          <p className="p-4 pr-16 text-left text-lg">
            JHS Students : <span className="font-medium">25</span>
          </p>
          <Divider />
          <p className="p-4 text-lg">
            Primary students : <span className="font-medium">26</span>
          </p>
          <Divider />
          <p className="p-4 text-lg">
            Total students :{" "}
            <span className="font-medium">
              {loggedInSchool?.students?.queries?.data?.countstudents || "NA"}
            </span>
          </p>
        </div>
      </div>
      <div className="  w-[77vw] mt-[183px] h-[74vh] ">
        <h1 className="text-2xl font-medium text-white -mt-20 mb-12">
          Edit Profile
        </h1>
        <form sx={{ width: "100%" }} className="grid grid-cols-2">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="schoolName" className="font-[500] text-[#344054]">
              School name
            </label>
            <input
              //   onChange={onChange}
              value={loggedInSchool?.name || "Enter school name"}
              type="text"
              name="schoolName"
              required
              placeholder="Enter your school name"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="schoolMail" className="font-[500] text-[#344054]">
              School email
            </label>
            <input
              //   onChange={onChange}
              value={loggedInSchool?.email || "Enter school email"}
              type="email"
              name="schoolEmail"
              required
              placeholder="Enter your email"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
            <label
              htmlFor="schoolLocation"
              className="font-[500] text-[#344054]"
            >
              School location
            </label>
            <input
              //   onChange={onChange}
              value={loggedInSchool?.location || "Enter school location"}
              type="text"
              name="schoolLocation"
              required
              placeholder="Enter your school's location"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
            <label
              htmlFor="schoolAddress"
              className="font-[500] text-[#344054]"
            >
              School Address
            </label>
            <input
              //   onChange={onChange}
              value={loggedInSchool?.address || "Enter school address"}
              type="text"
              name="schoolAddress"
              required
              placeholder="Enter your school's address"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
            <label
              htmlFor="schoolRegistrationId"
              className="font-[500] text-[#344054]"
            >
              School ID
            </label>
            <input
              //   onChange={onChange}
              value={loggedInSchool?.id || "N/A"}
              type="text"
              name="schoolId"
              readOnly
              className="w-[33vw] cursor-not-allowed h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
            <label htmlFor="schoolOwner" className="font-[500] text-[#344054]">
              School Owner
            </label>
            <input
              //   onChange={onChange}
              value={loggedInSchool?.owner || "Not known"}
              type="text"
              name="schoolOwner"
              readOnly
              className="w-[33vw] cursor-not-allowed h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="flex items-center justify-end mt-8 w-[71vw]">
            <button
              className="w-[160px] bg-[#29365f] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px]  cursor-pointer "
              // disabled={!canSubmit}
              type="submit"
            >
              {/* {isLoggingIn ? "Logging in" : "Log in"} */}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolProfile;
