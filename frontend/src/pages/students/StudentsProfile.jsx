import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetStudentDetailsQuery,
  useUpdateStudentProfilePictureMutation,
  useUpdateStudentStageMutation,
} from "../../api/students/StudentsApi";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// Get user details


const StudentsProfile = () => {
  const [expanded, setExpanded] = useState("panel1");
  const [studentDetails, setStudentDetails] = useState([])

   const { id } = useSelector(
     (state) => state.loginUser?.loggedInUser?.loggedInUser
   );

   console.log('Id' , id);


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

 



  const { data: student } = useGetStudentDetailsQuery(id);
  console.log('Student Data' , student);
  const perStudent = student?.findUser
  const [studentData, setStudentData] = useState({
    fullName: perStudent?.fullname,
    role: perStudent?.role,
    profilePic: perStudent?.profilePic,
    email: perStudent?.email,
    address: {
      GPS: perStudent?.address?.GPS,
      location: perStudent?.address?.location,
      phoneNumber: perStudent?.address?.location,
      userId: perStudent?.address?.userId,
    },
    stage: {
      mainStage: perStudent?.stage?.mainStage,
      classType: perStudent?.stage?.classType,
      studentId: perStudent?.stage?.studentId,
      teacher: perStudent?.stage?.teacher
    },
    guardian: {
      mother: perStudent?.guardian?.mother,
      father: perStudent?.guardian?.father,
      other: perStudent?.guardian?.other,
    },
  });

  console.log('Profile Pic' , studentData);

  const onChange = (event) => {
    setStudentData({
      [event.target.name] : event.target.value
    })
  }

  const [profilePicture, setProfilePicture] = useState(studentData?.profilePic?.path);
 

  const [updateStudentProfilePicture] =
    useUpdateStudentProfilePictureMutation();

  const handleProfilePicture = (e) => {
    const file = e.target.files?.[0];
    console.log('Sending file' , file);

    const formData = new FormData()
    formData.append("profilePic" , file)
    formData.append("id" , id)
    // console.log('File' , file)
    // updateStudentProfilePicture({profilePic: formData , id});
    setProfilePicture(file);
    updateStudentProfilePicture({ profilePic: profilePicture, id });
  };

  return (
    <div className=" flex justify-center items-center flex-col w-[80vw] scrollbar-hide mx-[17vw] ">
      {/* Profile Picture */}
      <div
        className=" mb-8 flex items-center flex-col justify-center"
        name="profilePicture"
      >
        <Avatar
          name="profilePicture"
          src={
            // studentData?.profilePic
           profilePicture && URL.createObjectURL(profilePicture)
            // "https://res.cloudinary.com/dlzvhjzxe/image/upload/v1678636609/avyfigjtbaa1qrqbynl8.png"
            // ? URL.createObjectURL(profilePicture)
            // :
            // "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
            //  URL.createObjectURL(studentDetails?.profilePic)
          }
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
        <Accordion
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
                    onChange={onChange}
                    value={studentData?.fullName}
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
                    onChange={onChange}
                    value={studentData?.email}
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
                    onChange={onChange}
                    // value={gender}
                    type="text"
                    required
                    name="gender"
                    placeholder="Either male or female"
                    className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label htmlFor="role" className="font-[500] text-[#344054]">
                    Role
                  </label>
                  <input
                    onChange={onChange}
                    value={studentData?.role}
                    type="text"
                    required
                    name="role"
                    placeholder="Enter your role"
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
                    value={studentData?.stage?.classType}
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
                    value={studentData?.stage?.mainStage}
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
                    value={studentData?.stage?.teacher}
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
                    onChange={onChange}
                    value={studentData?.guardian?.mother}
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
                    onChange={onChange}
                    value={studentData?.guardian?.father}
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
                    onChange={onChange}
                    value={studentData?.guardian?.other}
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
                    onChange={onChange}
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
                    onChange={onChange}
                    value={studentData?.address?.location}
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
                    onChange={onChange}
                    value={studentData?.address?.GPS}
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
                    onChange={onChange}
                    value={studentData?.address?.phoneNumber}
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
