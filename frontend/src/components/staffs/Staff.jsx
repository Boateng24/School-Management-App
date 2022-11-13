import { Button } from "@mui/material";
import React from "react";

const Staff = () => {
  return (
    <div className="flex justify-start mb-1 even:bg-slate-50 px-3 cursor-pointer">
      <div className="flex justify-between w-[60%] mr-auto py-4">
        <p>Name</p>
        <p>Staff ID</p>
        <p>Class</p>
        <p>Gender</p>
      </div>
      <div className="flex w-[10%] justify-end py-4">
        <Button style={{ color: "#29365F" }}>Edit</Button>
        <Button style={{ color: "#29365F" }}>Delete</Button>
      </div>
    </div>
  );
};

export default Staff;
