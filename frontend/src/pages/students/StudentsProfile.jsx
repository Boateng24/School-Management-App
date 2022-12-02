import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const StudentsProfile = () => {
  const { firstname, email, role, id } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );
  const studentInfo = {
    id,
    firstname,
    email,
    location: "",
    address: "",
    role,
    teacher: "",
    guardian: "",
    guardianNumber: "",
  };

  const [formData, setFormData] = useState(studentInfo);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className=" flex justify-center items-center flex-col w-[80vw] scrollbar-hide mt-[102px] mx-4 h-[74vh] ">
      <div className="mt-24 mb-8">
        {/* <img src="" alt="profile" /> */}
        <Avatar sx={{ width: 180, height: 180 }} />
      </div>
      <form
        sx={{ width: "100%" }}
        className="grid place-items-center grid-cols-2"
      >
        <div className="grid grid-cols-1 gap-4 mb-4">
          <label htmlFor="fullname" className="font-[500] text-[#344054]">
            Fullname
          </label>
          <input
            value={formData.firstname}
            onChange={onChange}
            type="text"
            name="firstname"
            required
            placeholder="Enter your fullname"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 ">
          <label htmlFor="email" className="font-[500] text-[#344054]">
            Email
          </label>
          <input
            onChange={onChange}
            value={formData?.email || "Not available"}
            type="email"
            name="email"
            required
            readOnly
            disabled
            placeholder="Enter your email"
            className="w-[33vw] cursor-not-allowed h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
          <label htmlFor="class" className="font-[500] text-[#344054]">
            Class
          </label>
          <input
            // value={schoolAddress}
            onChange={onChange}
            type="text"
            name="class"
            required
            placeholder="Enter your class / stage"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
          <label htmlFor="gender" className="font-[500] text-[#344054]">
            Gender
          </label>
          <input
            // value={schoolAddress}
            onChange={onChange}
            type="text"
            name="gender"
            required
            placeholder="Enter your gender"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
          <label htmlFor="role" className="font-[500] text-[#344054]">
            Role
          </label>
          <input
            value={formData?.role}
            onChange={onChange}
            type="text"
            name="role"
            required
            placeholder="Enter your role"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
          <label htmlFor="location" className="font-[500] text-[#344054]">
            Location
          </label>
          <input
            // value={schoolLocation}
            onChange={onChange}
            type="text"
            name="location"
            required
            placeholder="Enter your location"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
          <label htmlFor="address" className="font-[500] text-[#344054]">
            Address
          </label>
          <input
            // value={schoolAddress}
            onChange={onChange}
            type="text"
            name="address"
            required
            placeholder="Enter your address"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-8">
          <label htmlFor="registrationId" className="font-[500] text-[#344054]">
            Student ID
          </label>
          <input
            onChange={onChange}
            value={formData?.id || "N/A"}
            type="text"
            name="registrationId"
            readOnly
            className="w-[33vw] cursor-not-allowed h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>

        <div className="flex justify-end ml-[42vw] mt-8 w-[71vw]">
          <button
            // onClick={handleSchoolEdit}
            className="w-[160px] bg-[#29365f] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px]  cursor-pointer "
            // disabled={!canSubmit}
            type="submit"
          >
            {/* {isFetching ? "Saving" : "Save Changes"} */}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentsProfile;
