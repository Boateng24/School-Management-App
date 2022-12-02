import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import StudentReport from "../../pages/students/StudentReport";

const StudentBody = () => {
  const [greetStudent, setGreetStudent] = useState("");
  const { firstname } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  console.log(currentHour, "Current hour");

  useEffect(() => {
    if (currentHour >= 0 && currentHour <= 11) {
      setGreetStudent("morning");
    } else if (currentHour > 11 && currentHour < 16) {
      setGreetStudent("afternoon");
    } else {
      setGreetStudent("evening");
    }
  }, [greetStudent, currentHour]);

  return (
    <div className="w-[85vw] h-screen">
      <div className="h-[8vh] ml-[18vw] bg-grey-100  border-b-2 border-gray-100 flex items-center">
        <h3 className="font-bold text-gray-500">
          Good {greetStudent} {firstname} 👋
        </h3>
      </div>
      <div className="h-[92vh] bg-grey-50">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentBody;
