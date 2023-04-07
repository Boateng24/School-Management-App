import React from "react";
import { useParams } from "react-router-dom";

const SchoolDetails = () => {
  const [allSchools, setAllSchools] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/allSchools");
        const data = await response.json();
        setAllSchools(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const { schoolId } = useParams();
  console.log("All", allSchools?.allSchools);
  const currentSchool = allSchools?.allSchools?.filter(
    (school) => school.id === schoolId
  );

  /* email , name , id , address { GPS, POBox,createdAt,location,schoolId,updatedAt,website}


*/
  console.log("Current School", currentSchool && currentSchool[0]);

  return (
    <>
      {" "}
      {
        <div>
          <h1> School Name: {currentSchool && currentSchool[0]?.schoolName}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.email}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.address[0]?.GPS}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.address[0]?.location}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.address[0]?.website}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.address[0]?.createdAt}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.address[0]?.upatedAt}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.address[0]?.POBox}</h1>
        </div>
      }
    </>
  );
};

export default SchoolDetails;
