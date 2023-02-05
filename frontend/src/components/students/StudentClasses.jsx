import { Divider, Table } from "@mui/material";
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
import SimpleAccordion from "../accordion/Accordion";

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
        <Box sx={{ p: 3 }}>
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

const StudentClasses = ({ name }) => {
  const { studentId } = useParams();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log(studentId);
  return (
    <div className="flex">
      <div className=" w-[80vw] max-h-[72vh]  ">
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar
            position="static"
            style={{ backgroundColor: "#FFF", color: "white" }}
            elevation={0}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              style={{ color: "white" }}
              aria-label="full width tabs example"
            >
              <Tab label="Class 1" {...a11yProps(0)} />
              <Tab label="Class 2" {...a11yProps(1)} />
              <Tab label="Class 3" {...a11yProps(2)} />
              <Tab label="Class 4" {...a11yProps(3)} />
              <Tab label="Class 5" {...a11yProps(4)} />
              <Tab label="Class 6" {...a11yProps(5)} />
              <Tab label="Form 1" {...a11yProps(6)} />
              <Tab label="Form 2" {...a11yProps(7)} />
              <Tab label="Form 3" {...a11yProps(8)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={6} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={7} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
            <TabPanel value={value} index={8} dir={theme.direction}>
              <SimpleAccordion name="English Language" />
              <SimpleAccordion name="Religious and moral Education" />
              <SimpleAccordion name="Elective Mathematics" />
              <SimpleAccordion name="Integrated Science" />
              <SimpleAccordion name="French Language" />
              <SimpleAccordion name="Information and Communication Technology" />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
};

export default StudentClasses;
