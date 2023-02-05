import React from "react";

import StudentBody from "../../components/students/StudentBody";
import StudentSidebar from "../../components/students/StudentSidebar";

const StudentsPage = () => {

  return (
    <div className="100vh w-screen flex">
      <StudentSidebar />
      <StudentBody />
      {/* <Outlet /> */}
    </div>
  );
};

export default StudentsPage;
