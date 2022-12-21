import { Avatar } from "@mui/material";

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetStudentDetailsQuery,
  useUpdateStudentStageMutation,
} from "../../api/students/StudentsApi";

const StudentsProfile = () => {
  // const { id } = useSelector(
  //   (state) => state.loginUser?.loggedInUser?.loggedInUser
  // );
  const { id } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );

  const [data, setData] = useState();

  const [formData, setFormData] = useState(data);
  const [profilePicture, setProfilePicture] = useState();

  return (
    <div className=" flex justify-center items-center flex-col w-[80vw] scrollbar-hide mt-[182px] mx-[17vw] h-[74vh] ">
      <div className="mt-48 mb-8 flex items-center flex-col justify-center">
        <Avatar
          src={profilePicture && URL.createObjectURL(profilePicture)}
          sx={{ width: 180, height: 180, marginTop: 8, marginBottom: 6 }}
        />
        <label
          htmlFor="profilePic"
          type="file"
          // className="border-2 cursor-pointer border-gray-100 rounded-lg py-3 px-8 mt-24 bg-gray-100 text-gray-800"
          className="w-[160px] mb-12 text-center bg-[#3C0E3C]  text-gray-50 h-[44px] rounded-[8px] cursor-pointer py-2 px-5 "
        >
          Upload image
        </label>
        <input
          id="profilePic"
          style={{ display: "none" }}
          size={60}
          type="file"
          // onChange={handleProfilePicture}
        />
      </div>
      {/* Stage data */}
      <div className="border-2 border-gray-50">
        <input type="text" placeholder="Enter your main stage" />
      </div>
    </div>
  );
};

export default StudentsProfile;
