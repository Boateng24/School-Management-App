import {
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const SchoolSettings = () => {
  const { isLoggingIn, loggedInSchool, error } = useSelector(
    (state) => state.loginSchool.loggedInSchool
  );

  return (
    <div className="flex">
      <div className="flex flex-col items-center m-5 w-[20vw] text-left">
        <div className="flex h-64 w-64 rounded-full mb-5 border-4 border-white text-9xl text-white bg-slate-800 text-center items-center justify-center">
          {loggedInSchool?.name.slice(0, 2)}
        </div>

        <div className="text-left  h-auto mt-4 rounded">
          <FormGroup>
            <div className=" w-60 mb-4">
              <label className="mr-[85px] text-lg text-gray-600">
                Dark Mode
              </label>
              <FormControlLabel
                control={<Switch defaultChecked />}
                // label="Dark Mode"
              />
            </div>
            <div className=" w-60 mb-4">
              <label className="mr-[35px] text-lg text-gray-600">
                Block all students
              </label>
              <FormControlLabel
                control={<Switch />}
                // label="Dark Mode"
              />
            </div>
            <div className=" w-60 mb-6">
              <label className="mr-[35px] text-lg text-gray-600">
                Block all teachers
              </label>
              <FormControlLabel
                control={<Switch />}
                // label="Dark Mode"
              />
            </div>
            <Divider />
            <Button color="error" variant="outlined" sx={{ mt: 4 }}>
              Delete Account
            </Button>
          </FormGroup>
        </div>
      </div>
      <div className="  w-[77vw] mt-[183px] h-[74vh] ">
        <h1 className="text-2xl font-medium text-white -mt-20 mb-12">
          Settings
        </h1>
        <form sx={{ width: "100%" }} className="grid grid-cols-2">
          <div className="grid grid-cols-1 gap-4 mb-4 mt-2">
            <label htmlFor="schoolName" className="font-[500] text-[#344054]">
              School Name
            </label>
            <input
              //   onChange={onChange}
              value={"Enter school name"}
              type="text"
              name="schoolName"
              required
              placeholder="Enter your school's address"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="oldPassword" className="font-[500] text-[#344054]">
              Old Password
            </label>
            <input
              //   onChange={onChange}
              value=""
              type="password"
              name="oldPassword"
              required
              placeholder="Enter your old password"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="newPassword" className="font-[500] text-[#344054]">
              New Password
            </label>
            <input
              //   onChange={onChange}
              value={"Enter new password"}
              type="password"
              name="newPassword"
              required
              placeholder="Enter your new password"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="font-[500] text-[#344054]"
            >
              Confirm New Password
            </label>
            <input
              //   onChange={onChange}
              value={"Confirm new password"}
              type="password"
              name="confirmNewPassword"
              required
              placeholder="Confirm your new password"
              className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
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

export default SchoolSettings;
