import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Illustration from "../../assets/Illustration.jpg";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Doughnuts from "../../components/chart/Doughut";
import Chart1 from "../../components/chart/Chart1";
import { useFindAllStudentsQuery } from "../../api/students/StudentsApi";
import { useFindAnnouncementQuery } from "../../api/school/SchoolApi";

const StudentsDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [greetStudent, setGreetStudent] = useState("");
  const { firstname } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=education",
        {
          method: "GET",
          headers: { "X-Api-Key": "RtG3uNvmmQrSN+tqeGD9Sg==tpH0xo8xKdxBlC4y" },
          contentType: "application/json",
        }
      );
      const data = await response.json();
      setQuotes(data);
    };
    fetchQuotes();
  }, []);

  const currentDate = new Date();
  const currentHour = currentDate.getHours();


  useEffect(() => {
    if (currentHour >= 0 && currentHour <= 11) {
      setGreetStudent("morning");
    } else if (currentHour > 11 && currentHour < 16) {
      setGreetStudent("afternoon");
    } else {
      setGreetStudent("evening");
    }
  }, [greetStudent, currentHour]);


  // Find announcements
  const {data, isError, error} = useFindAnnouncementQuery();
  console.log('Find announcement', data);
  console.log('Find announcement type', typeof data); 
  console.log('Error', error); 

  return (
    <div className="flex ml-[17vw] w-[80vw] h-[91vh]">
      <div className="w-[70%] ">
        <div className="flex h-[28%] rounded-lg p-4 border-b-2 border-gray-100">
          <div className="min-w-[500px] " style={{ flex: 1 }}>
            <h1 className="text-4xl font-bold text-gray-600 ">
              {" "}
              Good {greetStudent} {firstname}
            </h1>
            <p className="py-3 w-[100%] text-gray-400">
              {quotes[0]?.quote ||
                `Hello ${firstname}, we're fetching your quote`}
            </p>
            <span className="font-bold text-gray-700">{quotes[0]?.author}</span>
          </div>
          <div>
            <img
              src={Illustration}
              style={{ maxWidth: 260 }}
              alt="Student Illustration"
            />
          </div>
        </div>
        <div className="flex h-[20%] rounded-lg justify-between">
          <div className="flex items-center justify-between w-[50%] rounded-lg border-r-2 border-b-2 border-gray-100 ">
            <div>
              <p className="p-2 text-gray-400">Semester score</p>
              <h1 className="px-2 text-4xl text-gray-500 font-black">3.54</h1>
            </div>
            <div className="flex flex-col justify-center items-center pr-16">
              <div className=" bg-green-300 rounded-full h-10 border-[5px] border-green-100 w-10 flex items-center justify-center text-white mb-3">
                <IconButton>
                  <ArrowUpwardIcon style={{ color: "green" }} />
                </IconButton>
              </div>
              <p className="text-gray-400">0.002%</p>
            </div>
          </div>
          <div className="pl-12 flex items-center justify-between w-[50%] border-b-2 border-gray-100 rounded-lg ">
            <div>
              <p className="p-2 text-gray-400">Best subject</p>
              <h1 className="px-2 text-2xl text-gray-500 font-medium">
                Integrated Science
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center pr-12">
              <p className="text-gray-400 text-3xl">82%</p>
            </div>
          </div>
        </div>
        <div className="h-[50%] rounded-lg p-6">
          <Chart1 />
        </div>
      </div>
      <div className="w-[30%] h-[100%] border-l-2 border-gray-100">
        <div className="h-[50%] rounded-lg p-4">
          <Doughnuts />
        </div>
        <div className="h-[50%] rounded-lg p-4 mt-4 mb-16">
          <h1 className="text-2xl font-bold mb-3 text-gray-500">
            Upcoming activities
          </h1>
          <div>
            <p className="text-gray-500 text-large py-3">
              * Talent Show Day - 23rd December , 2022
            </p>
            <hr />
            <p className="text-gray-500 text-large py-4">
              * Career Day Celebration - 28th January , 2023
            </p>
            <hr />
            <p className="text-gray-500 text-large py-4">
              * Rep your tribe day - 3rd January , 2023
            </p>
            <hr />
            <p className="text-gray-500 text-large py-4">
              * Talent Show Day - 12th January , 2023
            </p>
            <hr />
            <p className="text-gray-500 text-large py-4">
              * Talent Show Day - 7th February , 2023
            </p>
            <hr />
            <p className="text-gray-500 text-large py-3">
              * Quiz Fest - 13th February , 2023
            </p>
            <hr />
          </div>
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
};

export default StudentsDashboard;
