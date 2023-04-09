import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import PropTypes from "prop-types";

const SchoolDetails = () => {
  const [allSchools, setAllSchools] = React.useState([]);

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/allSchools");
        const data = await response.json();
        setAllSchools(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const { schoolId } = useParams();
  console.log("All", allSchools?.allSchools);
  const currentSchool = allSchools?.allSchools?.filter(
    (school) => school.id === schoolId
  );

  /* email , name , id , address { GPS, POBox,createdAt,location,schoolId,updatedAt,website}


*/
  console.log("Current School", currentSchool && currentSchool[0]);


  return (
    <>
      {" "}
      {
        <div className="flex">
          <div className="flex flex-col items-center  h-screen p-3 w-[23vw] text-left border-r-2 border-gray-100">
            <div className="flex h-48 w-48 rounded-full mb-5 border-4 border-white text-9xl text-gray-50 bg-gray-700 text-center items-center justify-center">
              {currentSchool && currentSchool[0]?.profilePic ? (
                <img
                  className="h-48 w-48 text-xl rounded-full border-[10px] border-white"
                  src={currentSchool[0]?.profilePic}
                  alt={"school logo"}
                />
              ) : (
                <p className="text-7xl text-gray-200 font-extrabold">
                  {currentSchool && currentSchool[0]?.schoolName.slice(0, 2)}
                </p>
              )}
            </div>
            <div className="text-left flex flex-col justify-between h-[70vh]">
              <h1 className="text-xl text-gray-500 mb-2 font-bold">
                {currentSchool && currentSchool[0]?.schoolName}
              </h1>
              <p className="text-gray-500 mb-4">
                {" "}
                {currentSchool ? currentSchool[0]?.email : "Unknown"}
              </p>
              <hr />
              <p className="text-gray-500 my-3 outline-none">
                <span className="font-semibold text-gray-500">Owner : </span>
                {currentSchool ? currentSchool[0]?.schoolName : "Unknown"}
              </p>

              <hr />
              <p className="text-gray-500 my-3 outline-none">
                <span className="font-semibold text-gray-500">Address : </span>
                {currentSchool && currentSchool[0]?.schoolName}
              </p>
              <hr />
              <p className="text-gray-500 my-3 outline-none">
                <span className="font-semibold text-gray-500">Website : </span>
                {currentSchool ? currentSchool[0]?.schoolName : "Unknown"}
              </p>
              <hr />
              <p className="text-gray-500 my-3 outline-none">
                <span className="font-semibold text-gray-500">
                  Date Joined :{" "}
                </span>
                {currentSchool ? currentSchool[0]?.schoolName : "Unknown"}
              </p>
              <hr />
              <p className="text-gray-500 my-4 outline-none">
                <span className="font-semibold text-gray-500">
                  Total Students :{" "}
                </span>
                4,543
              </p>
              <hr />
              <p className="text-gray-500 my-4 outline-none">
                <span className="font-semibold text-gray-500">
                  Total Teachers :{" "}
                </span>
                43
              </p>
              <hr />
              <button
                className="w-[250px] h-[44px] bg-red-700 rounded-md mt-6 text-white"
                // onClick={''}
              >
                Delete School
              </button>
            </div>

            {/* <img src="" alt="Student Profiles" /> */}
          </div>
          <div className=" w-[77vw] h-[74vh] ">
            <Box sx={{ width: "100%" }}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "#fff",
                  color: "white !important",
                  margin: 0,
                }}
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
                  <Tab label="All Students" {...a11yProps(0)} />
                  <Tab label="All Teachers" {...a11yProps(1)} />
                  <Tab label="School Configuration" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  Students List
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  Teachers List
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  School Configurations
                </TabPanel>
              </SwipeableViews>
            </Box>
          </div>
        </div>
      }
    </>
  );
};

export default SchoolDetails;
