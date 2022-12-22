import { Divider, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../components/sidebar/Sidebar";
import SchoolIcon from "@mui/icons-material/School";
import background from "../../assets/background.png";
import Chart from "../../components/chart/Chart";
import Chart1 from "../../components/chart/Chart1";
import Sidebar from "../../components/sidebar/Sidebar";
import BadgeAvatars from "../../components/avatar/Avatar";
import { ChatWidget } from "../../components/chat/Chat";
import { Outlet } from "react-router-dom";
import {
  useFindAllStudentsQuery,
  useCountAllStudentsQuery,
} from "../../api/students/StudentsApi";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState();
  // const { data } = useFindAllStudentsQuery();
  // console.log("Find all students", data);
  const data = useCountAllStudentsQuery();
  

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/countallstudents"
      );
      const data = await response.json();

      setStudentCount(data?.countstudents);
    };
    fetchStudents();
  }, []);

  // const deleted = useDeleteStudentMutation("/clar1vqa30004udo4qhub4hzr");
  // console.log(deleted, "deleted");
  return (
    <>
      <div className=" w-[99vw] mt-[120px] ">
        {/* <Sidebar /> */}
        <div className="flex justify-center">
          <div className="bg-white w-[30vw] h-fit ml-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
            <div className="flex items-center">
              <IconButton color="primary" sx={{ mr: 1 }}>
                <div className="grid place-items-center h-10 w-10 bg-blue-100 rounded-full">
                  <SchoolIcon fontSize="medium" />
                </div>
              </IconButton>
              <h5 className="font-bold text-gray-600 mt-2 text-2xl">
                Students
              </h5>
            </div>
            <div className="flex items-center mt-4">
              <p className="font-black text-gray-600 text-3xl px-3">
                {studentCount || "na"}
                {/* {data?.findallstudents} */}
              </p>
              <p className="text-gray-400">
                <span className="text-green-600">+12%</span> compared to last
                month
              </p>
            </div>
          </div>

          <div className="bg-white w-[30vw] h-fit ml-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
            <div className="flex items-center">
              <IconButton color="secondary" sx={{ mr: 1 }}>
                <div className="grid place-items-center h-10 w-10 bg-[#fbe9ff] rounded-full">
                  <SchoolIcon fontSize="medium" />
                </div>
              </IconButton>
              <h5 className="font-bold text-2xl text-gray-600 mt-2">Staffs</h5>
            </div>
            <div className="flex items-center mt-4">
              <p className="font-black text-gray-600 text-3xl px-3">57</p>
              <p className="text-gray-400">23 teaching and 31 non-teaching</p>
            </div>
          </div>

          <div className="bg-white w-[30vw] h-fit mx-4 mt-[-50px] border-2 rounded-lg p-4  border-gray-100">
            <div className="flex items-center">
              <IconButton color="warning" sx={{ mr: 1 }}>
                <div className="grid place-items-center h-10 w-10 bg-[#f6dcd2] rounded-full">
                  <SchoolIcon fontSize="medium" />
                </div>
              </IconButton>
              <h5 className="font-bold text-gray-600 mt-2 text-2xl">
                Suggest something
              </h5>
            </div>
            <div className="flex items-center mt-4">
              <p className="font-black text-gray-600 text-3xl px-3">18</p>
              <p className="text-gray-400">
                <span className="text-red-600">- 2%</span> compared to last
                month
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[61vw] ml-4  p-2 mt-8 h-[65vh]">
            <Chart />{" "}
          </div>
          <div className="w-[30vw] mx-4  p-2 mt-8 h-[65vh]">
            <div className="bg-white w-[30vw] h-[90%] mt-4 border-2 rounded-lg p-4  border-gray-100">
              <div className="flex items-center">
                <IconButton color="secondary" sx={{ mr: 1 }}>
                  <div className="grid place-items-center h-10 w-10 bg-[#fbe9ff] rounded-full">
                    <SchoolIcon fontSize="medium" />
                  </div>
                </IconButton>
                <h5 className="font-bold text-gray-600 mt-2 text-2xl">
                  Recent Chats
                </h5>
              </div>
              <div className="flex flex-col items-center mt-4">
                <ChatWidget />
                <ChatWidget />
                <ChatWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
