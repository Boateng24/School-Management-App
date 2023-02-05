import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
// import AddIcon from "@mui/icons-material/Add";
import Student from "./Student";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useAddStudentMutation,
  useFindAllStudentsQuery,
  useGetAllJHSQuery,
  useGetAllPrefectsQuery,
  useGetAllPrimaryQuery,
  useCountAllStudentsQuery,
} from "../../api/students/StudentsApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Students = () => {
  const navigate = useNavigate();
  const [allJHS, setAllJHS] = useState(useGetAllJHSQuery());
  const [allStudents, setAllStudents] = useState(useCountAllStudentsQuery());
  const [findAllStudents, setFindAllStudents] = useState(
    useFindAllStudentsQuery()
  );

  const { data } = useGetAllPrefectsQuery();
  const { currentData } = useGetAllPrimaryQuery();
  const [myData, setMyData] = useState([]);
  const dispatch = useDispatch();

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [addNewStudent, setAddNewStudent] = useAddStudentMutation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/findallstudents"
      );
      const data = await response.json();
      console.log("All students", data?.fetchstudents);
      setMyData(data);
    };
    fetchStudents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewStudent({
      fullname,
      email,
      password,
      stage,
    });
    handleClose();
    window.location.reload();
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStage = (e) => {
    setStage(e.target.value);
  };

  const [opened, setOpened] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (opened) {
      setShowSuccess(true);
      setFullname("");
      setPassword("");
    } else {
      setShowSuccess(false);
    }
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  }, [opened]);

  return (
    <div className=" w-[94vw]  mt-[120px] m-auto">
      <div className="flex justify-center items-center">
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
      <div className="rounded-lg max-h-[70vh] w-[92vw] flex flex-col m-auto mt-4 p-4 border-2 border-gray-100 overflow-y-scroll scrollbar-hide ">
        <div className="h-[10%] flex justify-between">
          <div>
            <input
              onChange={handleChange}
              value={searchTerm}
              type="search"
              name="searchTerm"
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
            <div className="bg-green-400">
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="backdrop-blur-md"
              >
                <Box sx={style} className="rounded-md">
                  <p
                    id="modal-modal-title"
                    className="font-bold text-xl mb-4 -mt-2"
                  >
                    Add New Student
                  </p>
                  <div id="modal-modal-description" sx={{ mt: 2 }}>
                    <form action="" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4 mb-[-8px]">
                        <label
                          htmlFor="email"
                          className="font-[500] text-[#344054] mb-[-6px]"
                        >
                          Fullname
                        </label>
                        <input
                          onChange={(e) => setFullname(e.target.value)}
                          value={fullname}
                          type="text"
                          required
                          name="fullname"
                          placeholder="John Doe"
                          className="w-[330px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-[-8px] mt-8">
                        <label
                          htmlFor="email"
                          className="font-[500] text-[#344054] mb-[-6px]"
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          required
                          name="email"
                          placeholder="john.joe@gmail.com"
                          className="w-[330px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-[-8px]  mt-8">
                        <label
                          htmlFor="password"
                          className="font-[500] text-[#344054] mb-[-6px]"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          // defaultValue="Hi"
                          // defaultValue={`Welcome@123`}
                          // readOnly
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          name="password"
                          placeholder="********"
                          className="w-[330px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4  mt-8">
                        <label
                          htmlFor="stage"
                          className="font-[500] text-[#344054] mb-[-6px]"
                        >
                          Stage
                        </label>
                        <FormControl
                          sx={{ m: 0, minWidth: 120, height: 44 }}
                          size="small"
                        >
                          {/* <InputLabel id="demo-select-small">Stage</InputLabel> */}
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={stage}
                            className="w-[330px] h-[44px] border-[1px] border-gray-50 rounded-[18px] outline-none px-4"
                            label="Stage"
                            style={{
                              borderRadius: "8px",
                              height: "49px",
                              width: "330px",
                              // border: "1px solid rgb(249 250 251)",
                              outline: "none",
                              padding: " 8px",
                            }}
                            onChange={handleStage}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Stage 1"}>Stage 1</MenuItem>
                            <MenuItem value={"Stage 2"}>Stage 2</MenuItem>
                            <MenuItem value={"Stage 3"}>Stage 3</MenuItem>
                            <MenuItem value={"Stage 4"}>Stage 4</MenuItem>
                            <MenuItem value={"Stage 5"}>Stage 5</MenuItem>
                            <MenuItem value={"Stage 6"}>Stage 6</MenuItem>
                            <MenuItem value={"JHS 1"}>JHS 1</MenuItem>
                            <MenuItem value={"JHS 2"}>JHS 2</MenuItem>
                            <MenuItem value={"JHS 3"}>JHS 3</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <button className="w-[330px] h-[44px] bg-[#29365F] rounded-md mt-6 text-white">
                        ADD NEW STUDENT
                      </button>
                    </form>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
        <div className="h-[90%] ">
          {myData?.fetchstudents
            // .filter(({ firstname }) =>
            // firstname.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            // )
            ?.map(
              ({
                id,
                fullname,
                gender,
                profilePic,
                isPrefect,
                stage,
                email,
                age,
              }) => (
                <div>
                  <Student
                    // className="text-left"
                    fullname={fullname}
                    email={email}
                    age={age || "Unknown"}
                    gender={gender || "Unknown"}
                    id={id}
                    profilePic={profilePic}
                    isPrefect={isPrefect}
                    stage={stage[0]?.classType}
                  />
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default Students;
