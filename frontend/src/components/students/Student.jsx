import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  useEditStudentMutation,
  useRemoveStudentMutation,
} from "../../api/students/StudentsApi";
import { useState } from "react";

const Student = ({
  fullname,
  gender,
  id,
  profilePic,
  isPrefect,
  email,
  stage,
  age,
}) => {
  const navigate = useNavigate();
  const { name } = useSelector(
    (state) => state.loginSchool.loggedInSchool.loggedInSchool || ""
  );
  const { loggedInSchool } = useSelector(
    (state) => state.loginSchool.loggedInSchool || ""
  );

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [removeStudent] = useRemoveStudentMutation();
  const { studentId } = useParams();

  const handleStudentDelete = () => {
    removeStudent({ id });
    handleClose();
    window.location.reload();
    setShowSuccess(true);
  };
  const [details, setDetails] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    const studentsDetails = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/findallstudents"
      );
      const data = await response.json();

      setDetails(data?.fetchstudents);
    };
    studentsDetails();
  }, []);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="flex justify-start mb-1  px-3 cursor-pointer hover:bg-slate-50 "
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-blur-md"
      >
        <Box sx={style} className="rounded-md">
          <p id="modal-modal-title" className="font-bold text-xl ">
            Delete Student
          </p>
          <div id="modal-modal-description">
            {/* <form action="" onSubmit={handleSubmit}> */}
            <form action="">
              <div className="grid grid-cols-1 gap-4 mt-4">
                {`Are you sure you want to delete ${fullname} from ${name} ??`}
              </div>
              <div className="grid grid-cols-2 gap-4  mt-2">
                <button
                  className="w-[170px] h-[44px] border-2 border-grey-100 text-gray-600 rounded-md mt-6"
                  onClick={handleClose}
                >
                  No , keep it.
                </button>
                <button
                  className="w-[170px] h-[44px] bg-[#29365F] rounded-md mt-6 text-white"
                  onClick={handleStudentDelete}
                >
                  Yes , delete
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="flex justify-between w-[60%] mr-auto py-4"
        onClick={() => navigate(`${id}`)}
        // onClick={() => navigate(`2`)}
      >
        <div className="flex items-center justify-space-around">
          <Avatar alt="profile" src={profilePic} />
          <p
            className="ml-4 w-80
           "
            title={fullname}
          >
            {fullname}{" "}
            <span title={`Prefect ${fullname}`}>
              {isPrefect && <VerifiedIcon fontSize="12" />}
            </span>
          </p>
        </div>
        <p className="text-right min-w-[320px] mt-2 mx-8">{email}</p>
        <p className="w-96 text-right mt-2 mx-8">{age}</p>
        <p className="w-96 text-right mt-2 mx-8">{stage}</p>
        <p className="w-96 text-right mt-2 mx-8">{gender}</p>
      </div>
      <div className="flex w-[10%] justify-end py-4">
        {isHovered && (
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Student;
