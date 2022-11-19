import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Student = ({ firstname, gender }) => {
  const navigate = useNavigate();
  const { isLoggingIn, loggedInSchool } = useSelector(
    (state) => state.loginSchool.loggedInSchool?.loggedInSchool
  );

  const data = useSelector((state) => state.findAllStudents);

  return (
    <div className="flex justify-start mb-1  px-3 cursor-pointer hover:bg-slate-50 ">
      <div
        className="flex justify-between w-[60%] mr-auto py-4"
        onClick={() => navigate(`${Math.random() * 12000}`)}
      >
        <div className="flex items-center">
          <Avatar alt="profile" />
          <p className="ml-4" title={firstname}>
            {firstname}
          </p>
        </div>
        <p>Email</p>
        <p>Age</p>
        <p>Class</p>
        <p>{gender}</p>
      </div>
      <div className="flex w-[10%] justify-end py-4">
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Student;
