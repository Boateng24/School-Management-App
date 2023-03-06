import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Typography } from "@mui/material";

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



  
  const [toggle , setToggle] = useState(true)
  const [response , setResponse] = useState([])
  
    useEffect(() => {
      const getDetails = async () => {
        const res = await fetch(`http://localhost:5000/api/v1/user/${id}`);
        const data = await res.json();
        setResponse(data?.findUser);
      };
      getDetails();
     
    }, [id]);



    const path = response?.profilePic?.filename
    console.log("Path", response?.profilePic);
    console.log("Path", path);
    
    
    const handleToggle = e => setToggle(!toggle)
    const [profilePicture, setProfilePicture] = useState(
      path
      // URL.createObjectURL(path)
    );
    console.log('Profile pic default', profilePicture);
  const { data: student } = useGetStudentDetailsQuery(id);


  const personalDetails = {
    fullname: student?.findUser?.fullname,
    email: student?.findUser?.email,
    gender: student?.findUser?.gender,
    userPicture: student?.findUser?.profilePic
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



  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file && file.type) {
      setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      updateStudentProfilePicture({ profilePic: profilePicture, id });
    }
  };
 

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
    <div className=" flex justify-center items-center flex-col w-[80vw] scrollbar-hide mx-[17vw] ">
      {/* Profile Picture */}
      <div
        className=" mb-8 flex items-center flex-col justify-center"
        name="profilePicture"
      >
        <Avatar
          name="profilePicture"
          src={profilePicture && URL.createObjectURL(profilePicture)}
          sx={{ width: 180, height: 180, margin: 4 }}
        />
        <label
          htmlFor="profilePicture"
          type="file"
          // className="border-2 cursor-pointer border-gray-100 rounded-lg py-3 px-8 mt-24 bg-gray-100 text-gray-800"
          className="w-[160px] mb-4 text-center bg-[#3C0E3C]  text-gray-50 h-[44px] rounded-[8px] cursor-pointer py-2 px-5 "
        >
          Upload image
        </label>
        <input
          id="profilePicture"
          name="profilePicture"
          style={{ display: "none" }}
          size={60}
          type="file"
          onChange={handleProfilePicture}
        />
      </div>
      {/* <button type="submit" onClick={handled}>
        Send
      </button> */}
      <div className="w-2/3">
        {/* Personal Info */}
        <Accordion>
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Student Personal Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form action="">
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="fullname"
                    className="font-[500] text-[#344054]"
                  >
                    Fullname
                  </label>
                  <input
                    // onChange={onChange}
                    // value={fullname}
                    type="text"
                    required
                    name="fullname"
                    placeholder="Eg. John Doe"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label htmlFor="email" className="font-[500] text-[#344054]">
                    Email
                  </label>
                  <input
                    // onChange={onChange}
                    // value={email}
                    type="email"
                    required
                    name="email"
                    placeholder="Eg. johndoe@gmail.com"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label htmlFor="gender" className="font-[500] text-[#344054]">
                    Gender
                  </label>
                  <input
                    // onChange={onChange}
                    // value={gender}
                    type="text"
                    required
                    name="gender"
                    placeholder="Either male or female"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label htmlFor="age" className="font-[500] text-[#344054]">
                    Age
                  </label>
                  <input
                    // onChange={onChange}
                    // value={age}
                    type="number"
                    required
                    name="age"
                    placeholder="Enter your age"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
              </div>
            </form>
            <p className="font-light italic text-right mx-8">Saving...</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Student Stage Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form action="">
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="classtype"
                    className="font-[500] text-[#344054]"
                  >
                    Class type
                  </label>
                  <input
                    // onChange={onChange}
                    // value={classType}
                    type="text"
                    required
                    name="classType"
                    placeholder="Eg. primary"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="mainStage"
                    className="font-[500] text-[#344054]"
                  >
                    Main Stage
                  </label>
                  <input
                    // onChange={onChange}
                    // value={mainStage}
                    type="text"
                    required
                    name="mainStage"
                    placeholder="Eg. stage 3"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="teacher"
                    className="font-[500] text-[#344054]"
                  >
                    Class Teacher
                  </label>
                  <input
                    // onChange={onChange}
                    // value={teacher}
                    type="text"
                    required
                    name="teacher"
                    placeholder="Specify class teacher"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
              </div>
            </form>
            <p className="font-light italic text-right mx-8">Saving...</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography>Student Guardian Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form action="">
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label htmlFor="mother" className="font-[500] text-[#344054]">
                    Mother
                  </label>
                  <input
                    // onChange={onChange}
                    // value={mother}
                    type="text"
                    required
                    name="mother"
                    placeholder="Eg. Jane Doe"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label htmlFor="father" className="font-[500] text-[#344054]">
                    Father
                  </label>
                  <input
                    // onChange={onChange}
                    // value={father}
                    type="text"
                    required
                    name="father"
                    placeholder="Enter your father's name"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="guardian"
                    className="font-[500] text-[#344054]"
                  >
                    Guardian
                  </label>
                  <input
                    // onChange={onChange}
                    // value={guardian}
                    type="text"
                    required
                    name="guardian"
                    placeholder="Enter your guardian's name if any"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="telephone"
                    className="font-[500] text-[#344054]"
                  >
                    Parent/Guardian number
                  </label>
                  <input
                    // onChange={onChange}
                    // value={age}
                    type="tel"
                    required
                    name="telephone"
                    placeholder="Enter mobile number"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
              </div>
            </form>
            <p className="font-light italic text-right mx-8">Saving...</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Student Address Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form action="">
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="location"
                    className="font-[500] text-[#344054]"
                  >
                    Location
                  </label>
                  <input
                    // onChange={onChange}
                    // value={location}
                    type="text"
                    required
                    name="location"
                    placeholder="Eg. racecourse - takoradi"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label htmlFor="gps" className="font-[500] text-[#344054]">
                    GPS
                  </label>
                  <input
                    // onChange={onChange}
                    // value={GPS}
                    type="text"
                    required
                    name="GPS"
                    placeholder="Enter your GPS"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="font-[500] text-[#344054]"
                  >
                    Phone Number
                  </label>
                  <input
                    // onChange={onChange}
                    // value={phoneNumber}
                    type="text"
                    required
                    name="phoneNumber"
                    placeholder="Enter your phone Number"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
              </div>
            </form>
            <p className="font-light italic text-right mx-8">Saving...</p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default StudentsProfile;
