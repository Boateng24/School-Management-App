import { Avatar, Button } from "@mui/material";

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetStudentDetailsQuery,
  useUpdateStudentProfilePictureMutation,
  useUpdateStudentStageMutation,
} from "../../api/students/StudentsApi";

// This is staging

const StudentsProfile = () => {
  // const { id } = useSelector(
  //   (state) => state.loginUser?.loggedInUser?.loggedInUser
  // );
  const { id } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );

  console.log('Id', id);

  const [profilePicture, setProfilePicture] = useState();
  const [toggle , setToggle] = useState(true)


  const handleToggle = e => setToggle(!toggle)
  const { data: student } = useGetStudentDetailsQuery(id);

  const personalDetails = {
    fullname: student?.findUser?.fullname,
    email: student?.findUser?.email,
    gender: student?.findUser?.gender,
  };
  const stageDetails = student?.findUser?.stage;
  const addressDetails = student?.findUser?.address;
  const guardianDetails = student?.findUser?.guardian;

  // Student personal details
  const [personalData, setPersonalData] = useState(personalDetails);

  // Student stage details
  const [stageInfo, setStageInfo] = useState(stageDetails);

  // Student address details
  const [address, setAddress] = useState(addressDetails);

  // Student guardian details
  const [guardian, setGuardian] = useState(guardianDetails);
  const [updateStudentProfilePicture] =
    useUpdateStudentProfilePictureMutation();

  const { fullname, email, gender } = personalData;
  const { classType, mainStage, teacher } = stageInfo;
  const { phoneNumber, GPS, location } = address;
  const { mother, father, other } = guardian;

  console.log(profilePicture?.name , 'pic');

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    updateStudentProfilePicture({ profilePic: profilePicture?.name || 'Sgut' , id });
  };

  // const handleProfilePicture = (e) => {
  //   const file = e.target.files[0];
  //   setProfilePicture(file);
  //   updateStudentProfilePicture({ variables: { profilePic: profilePicture } });
  // }

  // Handlers
  
  const personalInformationChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const stageInformationChange = (e) => {
    setStageInfo({ ...stageInfo, [e.target.name]: e.target.value });
  };

  const addressInformationChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const guardianInformationChange = (e) =>
    setGuardian({ ...guardian, [e.target.name]: e.target.value });
  // const handled = (e) =>
  //   updateStudentProfilePicture({ profilePic: profilePicture?.name , id});

  return (
    <div className=" flex justify-center items-center flex-col w-[80vw] scrollbar-hide mt-[182px] mx-[17vw] h-[74vh] ">
      {/* Profile Picture */}
      <div
        className="mt-48 mb-8 flex items-center flex-col justify-center"
        name="profilePicture"
      >
        <Avatar
          name="profilePicture"
          // src={"https://source.unsplash.com/user/c_v_r"}
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
      {/* <button type="submit" onClick={handled}>
        Send
      </button> */}
      <div className="grid grid-cols-2 m-4 p-4">
        {/* Student Personal Info */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Personal Information
          </h3>
          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="fullname" className="font-[500] text-[#344054]">
                  Fullname
                </label>
                <input
                  onChange={personalInformationChange}
                  value={fullname}
                  type="text"
                  name="fullname"
                  required
                  placeholder="Eg. John Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="Email" className="font-[500] text-[#344054]">
                  Email
                </label>
                <input
                  onChange={personalInformationChange}
                  value={email}
                  type="email"
                  name="email"
                  required
                  placeholder="Eg. john.doe@gmail.com"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="age" className="font-[500] text-[#344054]">
                  Age
                </label>
                <input
                  // onChange={onChange}
                  // value={schoolName}
                  type="number"
                  name="age"
                  required
                  placeholder="Eg. 25"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="gender" className="font-[500] text-[#344054]">
                  Gender
                </label>
                <input
                  onChange={personalInformationChange}
                  value={gender}
                  type="text"
                  name="gender"
                  required
                  placeholder="Please type either male or female"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
        {/* Student Stage */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Stage Information
          </h3>
          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="ClassType"
                  className="font-[500] text-[#344054]"
                >
                  Class Type
                </label>
                <input
                  onChange={stageInformationChange}
                  value={classType}
                  type="text"
                  name="classType"
                  required
                  placeholder="Eg. Primary"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="Main Stage"
                  className="font-[500] text-[#344054]"
                >
                  Main Stage
                </label>
                <input
                  onChange={stageInformationChange}
                  value={mainStage}
                  type="text"
                  name="schoolName"
                  required
                  placeholder="Eg. Stage 3"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="classTeacher"
                  className="font-[500] text-[#344054]"
                >
                  Class Teacher
                </label>
                <input
                  onChange={stageInformationChange}
                  value={teacher}
                  type="text"
                  name="classTeacher"
                  required
                  placeholder="Eg. John Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div className="opacity-0">4</div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
        {/* Student Address */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Student Address
          </h3>

          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="GPS" className="font-[500] text-[#344054]">
                  GPS
                </label>
                <input
                  onChange={addressInformationChange}
                  value={GPS}
                  type="text"
                  name="GPS"
                  required
                  placeholder="Eg. Primary"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="Location" className="font-[500] text-[#344054]">
                  Location
                </label>
                <input
                  onChange={addressInformationChange}
                  value={location}
                  type="text"
                  name="location"
                  required
                  placeholder="Eg. Takoradi - Racecourse"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="phoneNumber"
                  className="font-[500] text-[#344054]"
                >
                  Phone number
                </label>
                <input
                  onChange={addressInformationChange}
                  value={phoneNumber}
                  type="number"
                  name="phoneNumber"
                  required
                  placeholder="Eg. +233 XXX XXXX"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div className="opacity-0">4</div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
        {/* Guardian Address */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Guardian Information
          </h3>
          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="father" className="font-[500] text-[#344054]">
                  Father
                </label>
                <input
                  onChange={guardianInformationChange}
                  value={father}
                  type="text"
                  name="father"
                  required
                  placeholder="Eg. Peter Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="mother" className="font-[500] text-[#344054]">
                  Mother
                </label>
                <input
                  onChange={guardianInformationChange}
                  value={mother}
                  type="text"
                  name="mother"
                  required
                  placeholder="Eg. Jane Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="other" className="font-[500] text-[#344054]">
                  Other
                </label>
                <input
                  onChange={guardianInformationChange}
                  value={other}
                  type="text"
                  name="other"
                  placeholder="Eg. 25"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="studentId"
                  className="font-[500] text-[#344054]"
                >
                  Student Id
                </label>
                <input
                  // onChange={onChange}
                  // value={schoolName}
                  type="password"
                  name="studentId"
                  required
                  placeholder="Student Id"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsProfile;
