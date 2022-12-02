import { Avatar, Button } from "@mui/material";
// import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEditStudentMutation } from "../../api/students/StudentsApi";
import BadgeAvatars from "../../components/avatar/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

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
  const [profilePicture, setProfilePicture] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [editStudent] = useEditStudentMutation();

  const handleStudentDetailsUpdate = () => {
    //  editStudent({ id });
    window.location.reload();
  };

  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  return (
    <div className=" flex justify-center items-center flex-col w-[80vw] scrollbar-hide mt-[102px] mx-[17vw] h-[74vh] ">
      <div className="mt-48 mb-8 flex items-center flex-col justify-center">
        <Avatar
          src={profilePicture && URL.createObjectURL(profilePicture)}
          sx={{ width: 180, height: 180, marginTop: 8, marginBottom: 6 }}
        />
        <label
          for="profileUpload"
          type="file"
          // className="border-2 cursor-pointer border-gray-100 rounded-lg py-3 px-8 mt-24 bg-gray-100 text-gray-800"
          className="w-[160px] mb-12 text-center bg-[#29365f] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] cursor-pointer py-2 px-5 "
        >
          Upload image
        </label>
        <input
          id="profileUpload"
          style={{ display: "none" }}
          size={60}
          type="file"
          onChange={handleProfilePicture}
        />
      </div>
      <form
        sx={{ width: "100%" }}
        className="grid place-items-center grid-cols-2"
        onSubmit={handleStudentDetailsUpdate}
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
            // onChange={onChange}
            type="text"
            name="role"
            readOnly
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
            onClick={handleStudentDetailsUpdate}
            className="w-[160px] mb-12 bg-[#29365f] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px]  cursor-pointer "
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
