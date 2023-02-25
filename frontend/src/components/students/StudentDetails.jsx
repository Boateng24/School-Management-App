import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StudentClasses from "./StudentClasses";
import {
  useEditStudentMutation,
  useGetStudentDetailsQuery,
} from "../../api/students/StudentsApi";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const StudentDetails = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState([]);
  const { studentId } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    const studentsDetails = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/findallstudents"
      );
      const data = await response.json();

      setDetails(data?.fetchstudents);
    };
    studentsDetails();
  }, []);

  const currentStudentDetails = details.filter(({ id }) => id === studentId);


  return (
    <div className="flex">
      <div className="flex flex-col items-center m-5 w-[20vw] text-left">
        <div
          className="flex h-64 w-64 rounded-full mb-5 border-4 border-white text-9xl text-white bg-slate-800 text-center items-center justify-center"
         
        >
          {currentStudentDetails[0]?.profilePic ? (
            <img
              className="h-64 w-64 text-xl rounded-full border-[10px] border-white"
              src={currentStudentDetails[0]?.profilePic}
              alt={currentStudentDetails[0]?.fullname}
            />
          ) : (
            currentStudentDetails[0]?.fullname.slice(0, 2)
          )}
        </div>
        <div className="text-left">
          <h1 className="text-4xl text-gray-500 mb-2">
            {currentStudentDetails[0]?.fullname}
          </h1>
          <p className="text-gray-500 mb-4">
            {" "}
            {currentStudentDetails[0]?.email}
          </p>
          <hr />
          <p className="text-gray-500 my-3 outline-none">
            <span className="font-semibold text-gray-500">Gender : </span>
            {currentStudentDetails[0]?.gender || "Unknown"}
          </p>

          <hr />
          <p className="text-gray-500 my-3 outline-none">
            <span className="font-semibold text-gray-500">Class : </span>
            {currentStudentDetails[0]?.stage?.mainStage}
          </p>
          <hr />
          <p className="text-gray-500 my-3 outline-none">
            <span className="font-semibold text-gray-500">Teacher : </span>
            {currentStudentDetails[0]?.stage?.teacher || "Unknown"}
          </p>
          <hr />
          <p className="text-gray-500 my-4 outline-none">
            <span className="font-semibold text-gray-500">Guardian : </span>
            {currentStudentDetails[0]?.guardian?.father ||
              currentStudentDetails[0]?.guardian?.mother}
          </p>
          <hr />

          <p className="text-gray-500 my-4 outline-none">
            <span className="font-semibold text-gray-500">
              Guardian number:
            </span>
            +233243232123
          </p>
          {/* <button
            className="w-[330px] h-[44px] bg-[#29365F] rounded-md mt-6 text-white"
            onClick={handleStudentDetailsUpdate}
          >
            EDIT STUDENT DETAILS
          </button> */}
        </div>

        {/* <img src="" alt="Student Profiles" /> */}
      </div>
      <div className=" w-[77vw] mt-[53px] h-[74vh] ">
        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            style={{ backgroundColor: "#29365F", color: "white", margin: 0 }}
            elevation={0}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Student Grades" {...a11yProps(0)} />
              <Tab label="Items in Possession" {...a11yProps(1)} />
              <Tab label="Health Information" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <StudentClasses />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Items in possession
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Health Information
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
};

export default StudentDetails;
