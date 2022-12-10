import { Avatar } from "@mui/material";

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetStudentDetailsQuery,
  useUpdateStudentStageMutation,
} from "../../api/students/StudentsApi";

const StudentsProfile = () => {
  const { id } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );

  const [data, setData] = useState("");

  // const { data } = useGetStudentDetailsQuery(id);
  console.log("Charely Student data", data);

  useEffect(() => {
    const studentsDetails = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/user/clbdc1w1d0000udkkh025yhgi"
      );
      const data = await response.json();

      setData(data?.findUser);
    };
    studentsDetails();
  }, []);

  // const studentInfo = {
  //   id,
  //   fullname: data?.findUser?.fullname,
  //   email: data?.findUser?.email,
  //   gender: data?.findUser?.gender,
  //   location: data?.findUser?.address[0]?.location,
  //   profilePic: data?.findUser?.profilePic,
  //   role: data?.findUser?.role,
  //   class: data?.findUser?.stage.classType,
  //   mainStage: data?.findUser?.stage.mainStage,
  //   guardian:
  //     data?.findUser?.guardian[0]?.mother ||
  //     data?.findUser?.guardian[0]?.father,
  //   teacher: data?.findUser?.stage[0]?.teacher,
  // };

  const studentInfo = {
    email: data?.findUser?.email,
    stage: {
      classType: data?.stage?.classType,
      mainStage: data?.stage?.mainStage,
      studentId: id,
      teacher: data?.stage?.teacher,
    },
    address: {
      phoneNumber: "1-896-972-3757 x58557",
      GPS: "40371",
      location: data?.findUser?.address[0]?.location,
      userId: id,
    },
    gender: data?.findUser?.gender,
    profilePic: data?.findUser?.profilePic,
    guardian: {
      father: data?.findUser?.guardian[0]?.father,
      mother: data?.findUser?.guardian[0]?.mother,
      other: "",
      studentId: id,
    },

    role: data?.findUser?.role,
  };
  console.log("Teacher", data?.stage?.teacher);

  const [stageData, setStageData] = useState(studentInfo.stage);
  const [addressData, setAddressData] = useState(studentInfo.address);
  const [formData, setFormData] = useState(studentInfo);
  const [profilePicture, setProfilePicture] = useState();

  // Mutations
  const [updateStudentStage] = useUpdateStudentStageMutation();

  const onChangeStage = (e) =>
    setStageData({ ...formData, [e.target.name]: e.target.value });

  const onChange = (e) =>
    setStageData({ ...formData, [e.target.name]: e.target.value });

  const updateStudentStageHandler = (e) => {
    e.preventDefault();
    const stage = {
      ...formData,
      stage: {
        studentId: id,
        classType: "Primary",
        mainStage: "21",
        teacher: "Dan",
      },
    };

    updateStudentStage(stage);
  };

  // console.log("form data", formData);
  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };

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
          onChange={handleProfilePicture}
        />
      </div>
      <form
        sx={{ width: "100%" }}
        className="grid place-items-center grid-cols-2"
        onSubmit={updateStudentStageHandler}
      >
        <div className="grid grid-cols-1 gap-4 mb-4">
          <label htmlFor="fullname" className="font-[500] text-[#344054]">
            Fullname
          </label>
          <input
            value={formData?.fullname}
            onChange={onChange}
            type="text"
            name="fullname"
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
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="classType" className="font-[500] text-[#344054]">
            Class
          </label>
          <input
            value={stageData?.classType}
            onChange={onChangeStage}
            type="text"
            name="classType"
            required
            placeholder="Eg. Primary , JHS"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="mainStage" className="font-[500] text-[#344054]">
            Main stage
          </label>
          <input
            value={stageData?.mainStage === null ? "" : stageData?.mainStage}
            onChange={onChangeStage}
            type="text"
            name="mainStage"
            required
            placeholder="Eg. Class 1"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        {/* <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="gender" className="font-[500] text-[#344054]">
            Gender
          </label>
          <input
            value={formData?.gender}
            onChange={onChange}
            type="text"
            name="gender"
            required
            placeholder="Enter your gender"
            className=" w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div> */}
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
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

        {/* Student Address */}
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="GPS" className="font-[500] text-[#344054]">
            GPS
          </label>
          <input
            value={formData?.address?.GPS}
            onChange={onChange}
            type="text"
            name="GPS"
            required
            placeholder="Enter your GPS"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="location" className="font-[500] text-[#344054]">
            Location
          </label>
          <input
            value={formData?.address?.location}
            onChange={onChange}
            type="text"
            name="location"
            required
            placeholder="Enter your location"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="phoneNumber" className="font-[500] text-[#344054]">
            Phone number
          </label>
          <input
            value={formData?.address?.phoneNumber}
            onChange={onChange}
            type="text"
            name="phoneNumber"
            required
            placeholder="Enter your phone number"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>

        {/* Student Guardian */}

        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="mother" className="font-[500] text-[#344054]">
            Mother
          </label>
          <input
            value={formData?.guardian?.mother}
            onChange={onChange}
            type="text"
            name="mother"
            required
            placeholder="Enter your mother's name"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="father" className="font-[500] text-[#344054]">
            Father
          </label>
          <input
            value={formData?.guardian?.father}
            onChange={onChange}
            type="text"
            name="father"
            required
            placeholder="Enter your father's name"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="other" className="font-[500] text-[#344054]">
            Other Guardian
          </label>
          <input
            value={formData?.guardian?.other}
            onChange={onChange}
            type="text"
            name="other"
            required
            placeholder="Enter any guardian's name"
            className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>

        {/* Teacher */}
        <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
          <label htmlFor="teacher" className="font-[500] text-[#344054]">
            Teacher
          </label>
          <input
            onChange={onChangeStage}
            value={stageData?.teacher}
            type="text"
            name="teacher"
            // readOnly
            className="w-[33vw]  h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>

        <div className="flex justify-end ml-[42vw] mt-4 w-[71vw]">
          <button
            onClick={updateStudentStageHandler}
            className="w-[160px] mb-12 bg-[#3C0E3C] text-gray-50 h-[44px] rounded-[8px]  cursor-pointer "
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
