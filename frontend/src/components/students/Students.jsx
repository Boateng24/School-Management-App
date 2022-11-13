import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import SchoolIcon from "@mui/icons-material/School";
// import AddIcon from "@mui/icons-material/Add";
import Student from "./Student";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useGetAllJHSQuery,
  useGetAllPrefectsQuery,
  useGetAllPrimaryQuery,
  useGetAllStudentsQuery,
} from "../../api/students/StudentsApi";

const Students = () => {
  const navigate = useNavigate();
  const [allJHS, setAllJHS] = useState(useGetAllJHSQuery());
  const [allStudents, setAllStudents] = useState(useGetAllStudentsQuery());
  console.log("All students", allStudents);

  const { data } = useGetAllPrefectsQuery();
  const { currentData } = useGetAllPrimaryQuery();

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const {data} = useGetAllJHSQuery()
  console.log("All JHS", allJHS);
  return (
    <div className=" w-[99vw] mt-[120px] m-auto">
      {/* <Sidebar /> */}
      <div className="flex justify-center">
        {/* <Sidebar /> */}
        {/* First item */}
        <div className="bg-white w-[30vw] h-fit ml-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="primary" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-blue-100 rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-gray-600 mt-2 text-2xl">Prefects</h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">
              {data?.fetchPrefects}
            </p>
            <p className="text-gray-400">
              <span>{data?.countmalePrefects}</span> males and{" "}
              <span>{data?.countfemalePrefects}</span> females
            </p>
          </div>
        </div>
        {/* Second */}
        <div className="bg-white w-[30vw] h-fit ml-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="secondary" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-[#fbe9ff] rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-2xl text-gray-600 mt-2">
              Primary Students
            </h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">
              {currentData?.fetchPrimaryStudents}
            </p>
            <p className="text-gray-400">
              <span>students</span> from Primary 1 to Primary 6
            </p>
          </div>
        </div>
        {/* Third item */}
        <div className="bg-white w-[30vw] h-fit mx-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
          <div className="flex items-center">
            <IconButton color="warning" sx={{ mr: 1 }}>
              <div className="grid place-items-center h-10 w-10 bg-[#f6dcd2] rounded-full">
                <SchoolIcon fontSize="medium" />
              </div>
            </IconButton>
            <h5 className="font-bold text-gray-600 mt-2 text-2xl">
              JHS Students
            </h5>
          </div>
          <div className="flex items-center mt-4">
            <p className="font-black text-gray-600 text-3xl px-3">
              {allJHS?.data?.fetchJuniorHigh}
            </p>
            <p className="text-gray-400">
              <span>JHS</span> 1 to JHS 3
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg h-[70vh] w-[92vw] flex flex-col m-auto mt-4 p-4 border-2 border-gray-100">
        <div className="h-[10%] flex justify-between">
          <div>
            <input
              // onChange={onChange}
              // value={email}
              type="text"
              required
              name="search"
              placeholder="Search students"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#29365F" }}
              onClick={handleOpen}
            >
              Add Student
            </Button>
            <div
              className="backdrop-blur-3xl"
              style={{ backdropFilter: "blur(64px)" }}
            >
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
        <div className="h-[90%] ">
          <Student />
          <Student />
          <Student />
          <Student />
          <Student />

          <Student />
        </div>
      </div>
    </div>
  );
};

export default Students;
