import { Button, Divider } from "@mui/material";
import React from "react";
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
  const { studentId } = useParams();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center m-5 w-[20vw] text-left">
        <div className="flex h-64 w-64 rounded-full mb-5 border-4 border-white text-9xl text-white bg-slate-800 text-center items-center justify-center">
          RS
        </div>
        <div className="text-left">
          <h1 className="text-4xl text-gray-500 mb-2">Robert Sam</h1>
          <p className="text-gray-500 mb-4">robert.sam@gmail.com</p>
          <hr />
          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">Gender : </span>
            Male
          </p>

          <hr />
          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">Class : </span>
            JHS 1
          </p>
          <hr />
          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">Guardian : </span>
            Mrs. Kumah Abigail
          </p>
          <hr />

          <p className="text-gray-500 my-4">
            <span className="font-semibold text-gray-500">
              Guardian number:
            </span>
            +233243232123
          </p>
          <button className="w-[330px] h-[44px] bg-[#29365F] rounded-md mt-6 text-white">
            EDIT STUDENT DETAILS
          </button>
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
