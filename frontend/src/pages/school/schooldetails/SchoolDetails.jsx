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
  console.log('School Id' , schoolId);
  console.log("All", allSchools?.allSchools);
  const currentSchool = allSchools?.allSchools?.filter(
    (school) => school.id == schoolId
  );

 const filtered = [1,2,3,4,5].filter(number => number === 3)
 console.log('Filtered', filtered);

  console.log("Current School", currentSchool && currentSchool[0]?.schoolName);

  return (
    <>
      {" "}
      {
        <div>
          <h1> School Name: {currentSchool && currentSchool[0]?.schoolName}</h1>
          <h1> School Email: {currentSchool && currentSchool[0]?.email}</h1>
        </div>
      }
    </>
  );
};

export default SchoolDetails;
