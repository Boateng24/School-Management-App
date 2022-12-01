import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import StudentBody from "../../components/students/StudentBody";
import StudentSidebar from "../../components/students/StudentSidebar";

const StudentsPage = () => {
  const { studentId } = useParams();
  const { firstname, email, role } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );
  return (
    <div className="100vh w-screen flex">
      <StudentSidebar />
      <StudentBody />
      {/* <Outlet /> */}
    </div>
  );
};

export default StudentsPage;
