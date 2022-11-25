import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  useEditStudentMutation,
  useRemoveStudentMutation,
} from "../../api/students/StudentsApi";

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
  const { isLoggingIn, loggedInSchool } = useSelector(
    (state) => state.loginSchool.loggedInSchool?.loggedInSchool
  );

  const [removeStudent] = useRemoveStudentMutation();

  const handleStudentDelete = (e) => {
    // removeStudent({ id });
    window.location.reload();
  };

  // const data = useEditStudentMutation("1212");
  // console.log("Edit student", data);
  return (
    <div className="flex justify-start mb-1  px-3 cursor-pointer hover:bg-slate-50 ">
      <div
        className="flex justify-between w-[60%] mr-auto py-4"
        onClick={() => navigate(`${Math.random() * 12000}`)}
      >
        <div className="flex items-center justify-space-around">
          <Avatar alt="profile" src={profilePic} />
          <p
            className="ml-4 w-64
           "
            title={fullname}
          >
            {fullname}{" "}
            <span title={`Prefect ${fullname}`}>
              {isPrefect && <VerifiedIcon fontSize="12" />}
            </span>
          </p>
        </div>
        <p className="text-right w-64 mt-2">{email}</p>
        <p className="w-36 text-right mt-2 ">{age}</p>
        <p className="w-48 text-right mt-2">{stage}</p>
        <p className="w-48 text-right mt-2">{gender}</p>
      </div>
      <div className="flex w-[10%] justify-end py-4">
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => alert(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Student;
