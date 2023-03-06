import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useFindAnnouncementQuery, useRemoveSchoolMutation } from "../../api/school/SchoolApi";
import Announcement from "../announcement/Announcement";

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

const SchoolSettings = () => {
  const { isLoggingIn, loggedInSchool, error } = useSelector(
    (state) => state.loginSchool.loggedInSchool
  );
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState([]);
  const { studentId } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('Logged in school', loggedInSchool);
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const {data: announcements} = useFindAnnouncementQuery()
  const [removeSchool] = useRemoveSchoolMutation()
  const navigate = useNavigate()
  

  const handleSchoolDelete = () => {
    removeSchool({id: loggedInSchool?.id})
    navigate('')
  
  }


  return (
    <div className="flex h-[100vh] ">
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
            <Button color="error" variant="outlined" sx={{ mt: 4 }} onClick={handleSchoolDelete}>
              Delete Account
            </Button>
          </FormGroup>
        </div>
      </div>

      <div className=" w-[77vw] mt-[95px] h-[74vh] overflow-y-scroll">
        <Box sx={{ width: "100%" , overflowY: "scroll" }}>
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
              className="text-white"
            >
              <Tab label="School Settings" {...a11yProps(0)} />
              <Tab label="Manage Announcements" {...a11yProps(1)} />
              <Tab label="Docs and Archives" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className="  w-[77vw] mt-[18px] h-[74vh] ">
                <h1 className="text-2xl font-medium text-white -mt-20 mb-12">
                  Settings
                </h1>
                <form sx={{ width: "100%" }} className="grid grid-cols-2">
                  <div className="grid grid-cols-1 gap-4 mb-4 mt-2">
                    <label
                      htmlFor="schoolName"
                      className="font-[500] text-[#344054]"
                    >
                      School Name
                    </label>
                    <input
                      value={"Enter school name"}
                      type="text"
                      name="schoolName"
                      required
                      placeholder="Enter your school's address"
                      className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <label
                      htmlFor="oldPassword"
                      className="font-[500] text-[#344054]"
                    >
                      Old Password
                    </label>
                    <input
                      value=""
                      type="password"
                      name="oldPassword"
                      required
                      placeholder="Enter your old password"
                      className="w-[33vw] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <label
                      htmlFor="newPassword"
                      className="font-[500] text-[#344054]"
                    >
                      New Password
                    </label>
                    <input
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
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
            
            >
              {announcements?.getAnnouncement?.map(({ message, id }) => (
                <Announcement id={id} message={message} />
              ))}
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

export default SchoolSettings;
