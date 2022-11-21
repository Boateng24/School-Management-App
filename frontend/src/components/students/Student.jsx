import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";

const Student = ({ firstname, gender, id, profilePic, isPrefect }) => {
  const navigate = useNavigate();
  const { isLoggingIn, loggedInSchool } = useSelector(
    (state) => state.loginSchool.loggedInSchool?.loggedInSchool
  );

  return (
    <div className="flex justify-start mb-1  px-3 cursor-pointer hover:bg-slate-50 ">
      <div
        className="flex justify-between w-[60%] mr-auto py-4"
        onClick={() => navigate(`${Math.random() * 12000}`)}
      >
        <div className="flex items-center">
          <Avatar alt="profile" src={profilePic} />
          <p
            className="ml-4 w-64
           "
            title={firstname}
          >
            {firstname}{" "}
            <span title={`Prefect ${firstname}`}>
              {isPrefect && <VerifiedIcon fontSize="12" />}
            </span>
          </p>
        </div>
        <p className="text-right w-56">robertksam2000@gmail.com</p>
        <p className="w-36 text-right ">Age</p>
        <p className="w-48 text-right">Class</p>
        <p className="w-48 text-right">{gender}</p>
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
