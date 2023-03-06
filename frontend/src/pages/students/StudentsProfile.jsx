import { Avatar, Button } from "@mui/material";

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetStudentDetailsQuery,
  useUpdateStudentProfilePictureMutation,
  useUpdateStudentStageMutation,
} from "../../api/students/StudentsApi";

// This is staging

const StudentsProfile = () => {
  // const { id } = useSelector(
  //   (state) => state.loginUser?.loggedInUser?.loggedInUser
  // );
  const { id } = useSelector(
    (state) => state.loginUser?.loggedInUser?.loggedInUser
  );



  
  const [toggle , setToggle] = useState(true)
  const [response , setResponse] = useState([])
  
    useEffect(() => {
      const getDetails = async () => {
        const res = await fetch(`http://localhost:5000/api/v1/user/${id}`);
        const data = await res.json();
        setResponse(data?.findUser);
      };
      getDetails();
     
    }, [id]);



    const path = response?.profilePic?.filename
    console.log("Path", response?.profilePic);
    console.log("Path", path);
    
    
    const handleToggle = e => setToggle(!toggle)
    const [profilePicture, setProfilePicture] = useState(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBUQEhAVFRUVFRUVFRUVFRUVFRUVFhUWFxUVFRUYHSggGB0lHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGBAQFysdHR0tLSstLSsuLS0tLS0tLTUrKy0tLS4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstKy0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAADAAMBAQEAAAAAAAAAAAAAAQIDBQYEBwj/xAA+EAACAQIEAwUGBAMGBwAAAAAAAQIDEQQSITEFQVEGImFxgQcTMpGhsRTB0fBCUoIVM2JykuEjQ1OissLx/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAIhEBAAICAgEFAQEAAAAAAAAAAAECAxEhMRIEE0FRYXEU/9oADAMBAAIRAxEAPwD6lEpEotGmFItEopANFISKQDRSEikFUikSiiCkNCQ0BSGJDQDQxGj7U9q8Lw2m5VZ3na8aUWs873tZctnq7bPoBvRnxjjPtqqSWXC4WMHznWedc7JRhbw1zPyOHn264i6n4h4uq25u8c81BrR2VNPLBLbupPxZdG36fA+C8O9tGNorJVo0q9n8esJOPR20v4257H1rsb2uw3FaLqUbxlCyqU5fFBvbVaSTs7NdOTTRNDoAAApiAAAAAAAAAAAAGAhgAABAwFcArRIpEopGmFxLRCLQFIokpANFISGgqkUhIaIKKRKKAaGJDA03bDj0eHYOpiHZyStTi3bNN/Cvu34Jn5l4zxKtiqkqtacqlWVrzdvLkl5JK2yVjuPbZx732O/Dp93DJK3J1ZpSlJrwTivR9Ti+zmBeIxNOLdlmV79Fy/fUb1G1iNzpuODdgsXXjGVowjKzvJ/Wxt5+y6onriV6U3+p9QwdFRiktloj1VY6bHk968vbGCkPiuM9m+KhFuE6c7LRd6LflyPZ7EMXKjxb3Mm456VSm4O93ONpJPxWSW59ScX0OV/syOF49g8ZGCy15TpTutI1XTlGM1/iadv6X1OmLLNp1LnmwxWN1fXxgI7vMBgACAYAIAAAAQAMBDAAAAAAADRopEotFZUi0Qi0BSKRKGFUmUiUWkQNFIlFICkUiRgUhoSKQH5e9pfd4vjFf/m/SUIS/wDb6Hr9nFalTqTrVM0nFWpwjFylJu98q20S3dlqdL7Qexrq47GV7tOUo1U7rJ7tUaUXe9tXL3nOyUfEn2XYB01VhUhreO663tb0S+ZyyXjxmHbHjtExL247tFXnJ052wkMrlmUozrSSaVv5Ybp89zSR41ifeRWGxtWalqlUUXms2nrba6Z3mJ7LRnJVE7SV7d2L0f8AC8yd1s+T0R5q/BPdNOc4qW0Woq6b6Jtq/ocYtER09HhMz252r2n4lGEXOFKNNynD38byUnCMn8O0b5Wr3eqPN2f4lWxdajKtiZ1Yxr05xhSp3neEladPLHVpyV1Zq176XOxxVXBKlLB1KkXkhFzjmTlDXMpyfKV1mv1PLwTgfu6ka1Gu7xd4yy0m0pfEk8mzRqt4ietM3x213t3fZivi6kKjxKimqslTStnVNKNlVce45qWZPLpobkxYahGnHLG9ryerbbcpOUm2+rbfqZT0vIYCGAAAgAAEwABAAwAAAYgAYAIDSIpEopFZWi0Qi0BSKJRQU0UhIaIKRSJRSApDRKKQFIYkMDg+3+Lw9LE0qWKmoUsTTcYyeiVSjNNxnLZKSqRtfTuPqjwYacIzvGSkv5o7Ozsn47o23th4L+L4TWy01KpRtVp6apRa97a2v93n08jQUqUaNGmo/Dkg/TKv0R5s1Yid/b14bzMan4dNLENK66HMYntBQ966U2pTad1J2UV6/oe9YxyWVO1ret9eZ5OHU05VO6lKUm5OSttorPmcI7ej+OdqYGnPNlnPLJydqdKpJPNe95P4jd9m8fnrqgt0o5tHHmkrxesXqtPI8GPwck2ni3HpGKTt5tvxRuOx9H3mLpRvmyrM582oXs5euX5o7a8mLzWscPqQCA9T55jEMKBAAASMAEACAYCABgIYAAABpEWjHEtFYZEUiEUmBkRSMaZSCrTLRjRaIqkUiUMChoQwKQyUYcZjYUY3k/Jc35AZcTlySz2ccssyeqcbaprpY4JYeNSlkta3w25JcjccY4jUqxypZYvdPeS5Jv6ngwbSVuh5vURbjjh6vTa555cjisRVw83Hly6fvY1lfHTTzxV5N3ySbte3na2ux2fFsGqi2Vzmcbw+Ub31X7scK2d7VaGMcbi6yjGGactFGLSWrdtW7Lfd2PsPYXszPBQdSvKLrziotRbcYQWqgm93fVvwXS75rsHhbYim7dXfyi3+h9OPXj5jbyZdxOjGSM6uJjEgCmBIwABAAMQCAAAAGMkLgMBXADSotGKLLTKwyIpMhFIKtFXIQwMiZUWY0Wgq0y0Y0WiCyZzUVdilNJXfI1lebnfM35J2t6rcsRtJlVbGVJ3y92Oyel343fL0PBGKbad827zay879BV8P0lJNbNSaa9efrc8FXFSh/fXcE9K0VadPxqR6f4lp1VtTrEM7e+pHqeTEYO+sXZnpo4hTTi2m1bZ6ST+GUfB2fk0x0enyfVEVpcROcdJrTqvzRrMZJ26p7NczsJUk1sa3EcGhNtwbg+dnz6tPR+qPPf01Z5jh3r6i0cTy5ytiqmHpurTupxyuKW77yvFeMldep2MO09Si1CtTzp/DUi1HN4ST0Uvkma6hwiV7yqZrbd2K+yWp75YKE45Grq1rM1jxzWNSzkyRadw3vDeM0MRdQlaS+KE1lnHzi/uro2B87x3DpwalB96PwSfT/pz6xf0Nl2f46763StaUJfwyTs7dNbp8tnszpNPpz27MDFQrxmrxd7Oz6p9GuRkuYaMBAABcGIAEAgHYBXFcBgK4JgVcBXADSItGJMuLKwyItGNMtBVplEIoCkUiEy0wLRaMaLRFefiE7JLq/t/9PBKRm4nLvJdFf5t/oeVyv5rfqdaxwxKKkmtn6P8AU8tWum7Puy5X5/lJF1E3tNrys/o0zBVw9SSs8lRdJLK/mrr6G0axp0qmVaK90uSv8Si/5XZS8Msupu8G200907r11uvC9zRYujUg1JRfdekZNNavVKd7eV7Pqua2HCcbnpp+cfHuzaS+pJIbuOuopw5ox0p6HojIy08kqlpa6X2fXwZmjJPR6P8Aexix9HNB25aowYLEKUUpbrn08wPbOnfRo5/H4VUqjktp7vxtlfzWX/Qup0MZ8nueDjtK9K/R2+en3s/QQS9HAuIZW29ptX+Vkzprnz3hlTbZdLXb+1kdjwjFZo5NdFpfe3iS9flay2QEhc5tHcQmFwABAACATALhcQmwKAkANMmXExItFYZUWjGi0FWikQmUBSKTIKQGRMtGNFJkVqcfUtXafOMf38zDUp352a2a+zM/HqaThO27yP11jf1VvU81OrOOji5R6rdeaOtemJYp++W8IS8U3F/LUmGWWkoZXyUtG/J3szYU5Rls/Rqxcqaa1jp6GtpprakErpqa5d6LkrdLq7S+ngaaEfw8mo6xlLNHW9r3clfwf5HVRSjonddN7eT5Gv4vhFUpuSg867y0tma5ePS/iNrpjoV2/lqe6nVOcwVbq9ee5taVYTA2l7o0uHdpyh8j30cQr2ZrMdLJXUuTJBL30sTbuy5bP8jLi17ylOK3cXbz5fU8mJXMijirbhWn4ZUul3pJcrpOP0/M6TA4mVNrvKS5W3ORWJjRrVYNpRjJyvfTJJKWt9Fa7Xkkb3hUp1lmSyQ5Sku/LxUX8K8Zf6UZvetY5WlLWnh2mFxCmuj5ma5ydWCi73k2rNNyd0+q6ehv+HY9Vl0kt1+a8DzVzVtOod74bVjb2BcQXOrkLgK4AAmFxMBCC4gHcZIAaZFoxRZkRpzZUykzGmWiKyIoxplJhVotGNMpMDIikY0y0FYOJ0nOjKK3tdead19jV4SvmSfVXN4mcbx/jNPhlOrUqRvllFUYXtnlVbcI35K+a71sovfYtZ0kw39SpGMc02ora70u3sl1f7sSql/hh/VO69VHf0djm+F1Z1JKtWalVkuXwU0/4Kafwra73fM6CjWPNf1M71V6q+m1G7M6hLnO3+VJL63+48tv4pfP8tis10YKrscpyW+3SMdfpyvF2sPWalJJSvKLel9e8reD+6MuDxqlspedtD38RpurKMU4KV9HOGdJW1srrXRcz0Uez0ZWdWrOfhfJD/TC2ng2z1Uzx489uFsE+XHTzycakHKDWaOrXXqeXiWIjKEKl14/v0+h1lDDRpxtGKSWiSVkvJGOrSUlfJdeKHv6+E9j9c/OqnFeR46703N/KhDnBfJMx1MDQkrSpxad07pWa6fUn+iPpr/P+uHwPAXjMR7+rUl7tZVCMLJVFHWM5N35t205J9Dp6fvqc3FLNG/dkmrv/MuTNnGhTjooxS5aCc0tvl+R5L2m3MvTSIrGoeWedr4beb/S5goVKtKXvMyzJ7Rva3R33MuJxaS3NZiMU+T6HLqdw6dxp9AwuIVWEZraSv5dV8zLc0XZDE58PbnGclbonqvuzdn0azuIl868amYVcQXFc0yLktjZLYCbFcGS5BFXAjOgCtPEtMxJlxZpzZostMxJmRMirTKIRSYVaKTMaZaYGRDTITKQGRHHe0zs7Tx2GSm5JRkm3F6prMovXR/FJf1HXpkYiiqkJQe0k1/uB884LVdOMaUpZnFJZmleVla78dDqcJO6OVxlB0tHpJSa+V7o2/CMXmSPFmp4W/JfQw386fsN/Fk1Ikw1HOqo7mGnllQu03undeDPSsTNbZfVf7nir4+K5mvr8USJvSzG20xnEq6TcYRfk7N+Sen1OOq9u6sZ+7q5qTv8M0l8ns/NG0nj5SvYw/goz1qWl4W0HkaezB8ZVVaVPqj1TqytpK5yWP4FRTbpydGXJ02kuusPhfyNUuJ4nDStOSnHlOOj9Y9fJlOncVcVUX8L2PP+Pa+JM1GE443FN3s9m01e29j1f2pFrkZmFjT1y4gmKFdPXQ1tXHR/lR4MXiU9pW8FoiaXbu+zmOjGtGC2qJr1SbT+j+Z1x8v7BuVbFxau1TUpTfJXTjFX63f0Z9PPZh348vFn15cHcBXFc7OBiC4gExMbJbAQC/ewwrRRZcWYYsypmmGZFpmGLMqZBkRSMaZQGRMpGJMyJhVplJmMpAWikyEMDmO1fDu+q2uV6O3KXX6L1RznDK8qc3dWWZ5euXr4anddo5NYSq1vlX/kj5jjcVOGJpU078525qSsl6bmMlPOv8dcOTwt/X0bAV8yTLxWHVTnZnNYLGunpfR7eZlxXEZbpni2+h475erGcOVviNJVoqD1ZNbjb1VzW4jiEp6tWXIyjYyxlOPM8tfi/KKbNVUqRSbk/m7I8yxjk7Uo/wBT29FzN1pNumLWiO3vq4hvvVZZV0uautj3XX/BjaKdnJqz9I8vNm0wnB3UlnleTSdvBvQ9WB4UqNV3XdqWi19n8/ueqmDXbz3z74h0vs7ca2Dlh6sVNQm9JLMrS238VJ+psK/YrCSd4upDwjJNf9yb+pruxlJ0cTUp8pxb9YtW+jkdmbmsT24+Ux002D7H4OGrjKf+eWnyjY3NHh1CCyxo00uihH9NSosypiKxHUE2me5KhRhTVoQjFb2jFRV/JF3EBUVcVxCAdxNgIIbZDY2yWwp3Am4Ac9GRlhIANMMsWWmAAZEyrgBA0y4sAAtMpMACmUgAK8nFlF0Kiltklf5HzPglD3tedaXV2ADVUljnjpxrSUbWvsyOIY2p/LlXN3X0ADnbDWZ27VzXrGml/EzbexMpVH/F8rABYx1j4T3LT8suHwjb1d/PU3fDcFqrWADcQxMunw1JRVkv9zzcSjt4DA2w9/DZ2rU59Wr/ANUXH7tHVXADlbtqBcyU5jAisgWAAFcLgABcVwACWyGwAgVwABsf/9k="
    );
    console.log('Profile pic default', profilePicture);
  const { data: student } = useGetStudentDetailsQuery(id);


  const personalDetails = {
    fullname: student?.findUser?.fullname,
    email: student?.findUser?.email,
    gender: student?.findUser?.gender,
    userPicture: student?.findUser?.profilePic
  };
  const stageDetails = student?.findUser?.stage;
  const addressDetails = student?.findUser?.address;
  const guardianDetails = student?.findUser?.guardian;
  

  // Student personal details
  const [personalData, setPersonalData] = useState(personalDetails);

  // Student stage details
  const [stageInfo, setStageInfo] = useState(stageDetails);

  // Student address details
  const [address, setAddress] = useState(addressDetails);

  // Student guardian details
  const [guardian, setGuardian] = useState(guardianDetails);
  const [updateStudentProfilePicture] =
    useUpdateStudentProfilePictureMutation();

  const { fullname, email, gender } = personalData;
  const { classType, mainStage, teacher } = stageInfo;
  const { phoneNumber, GPS, location } = address;
  const { mother, father, other } = guardian;



  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file && file.type) {
      setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      updateStudentProfilePicture({ profilePic: profilePicture, id });
    }
  };
 

  // Handlers
  
  const personalInformationChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const stageInformationChange = (e) => {
    setStageInfo({ ...stageInfo, [e.target.name]: e.target.value });
  };

  const addressInformationChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const guardianInformationChange = (e) =>
    setGuardian({ ...guardian, [e.target.name]: e.target.value });
  // const handled = (e) =>
  //   updateStudentProfilePicture({ profilePic: profilePicture?.name , id});

  return (
    <div className=" flex justify-center items-center flex-col w-[80vw] scrollbar-hide mt-[182px] mx-[17vw] h-[74vh] ">
      {/* Profile Picture */}
      <div
        className="mt-48 mb-8 flex items-center flex-col justify-center"
        name="profilePicture"
      >
        <Avatar
          name="profilePicture"
          src={profilePicture}
          sx={{ width: 180, height: 180, marginTop: 8, marginBottom: 6 }}
        />
        <label
          htmlFor="profilePic"
          type="file"
          // className="border-2 cursor-pointer border-gray-100 rounded-lg py-3 px-8 mt-24 bg-gray-100 text-gray-800"
          className="w-[160px] mb-12 text-center bg-[#3C0E3C]  text-gray-50 h-[44px] rounded-[8px] cursor-pointer py-2 px-5 "
        >
          Upload image
        </label>
        <input
          id="profilePic"
          style={{ display: "none" }}
          size={60}
          type="file"
          onChange={handleProfilePicture}
        />
      </div>

      <div className="grid grid-cols-2 m-4 p-4">
        {/* Student Personal Info */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Personal Information
          </h3>
          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="fullname" className="font-[500] text-[#344054]">
                  Fullname
                </label>
                <input
                  onChange={personalInformationChange}
                  value={fullname}
                  type="text"
                  name="fullname"
                  required
                  placeholder="Eg. John Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="Email" className="font-[500] text-[#344054]">
                  Email
                </label>
                <input
                  onChange={personalInformationChange}
                  value={email}
                  type="email"
                  name="email"
                  required
                  placeholder="Eg. john.doe@gmail.com"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="age" className="font-[500] text-[#344054]">
                  Age
                </label>
                <input
                  // onChange={onChange}
                  // value={schoolName}
                  type="number"
                  name="age"
                  required
                  placeholder="Eg. 25"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="gender" className="font-[500] text-[#344054]">
                  Gender
                </label>
                <input
                  onChange={personalInformationChange}
                  value={gender}
                  type="text"
                  name="gender"
                  required
                  placeholder="Please type either male or female"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
        {/* Student Stage */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Stage Information
          </h3>
          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="ClassType"
                  className="font-[500] text-[#344054]"
                >
                  Class Type
                </label>
                <input
                  onChange={stageInformationChange}
                  value={classType}
                  type="text"
                  name="classType"
                  required
                  placeholder="Eg. Primary"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="Main Stage"
                  className="font-[500] text-[#344054]"
                >
                  Main Stage
                </label>
                <input
                  onChange={stageInformationChange}
                  value={mainStage}
                  type="text"
                  name="schoolName"
                  required
                  placeholder="Eg. Stage 3"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="classTeacher"
                  className="font-[500] text-[#344054]"
                >
                  Class Teacher
                </label>
                <input
                  onChange={stageInformationChange}
                  value={teacher}
                  type="text"
                  name="classTeacher"
                  required
                  placeholder="Eg. John Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div className="opacity-0">4</div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
        {/* Student Address */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Student Address
          </h3>

          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="GPS" className="font-[500] text-[#344054]">
                  GPS
                </label>
                <input
                  onChange={addressInformationChange}
                  value={GPS}
                  type="text"
                  name="GPS"
                  required
                  placeholder="Eg. Primary"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="Location" className="font-[500] text-[#344054]">
                  Location
                </label>
                <input
                  onChange={addressInformationChange}
                  value={location}
                  type="text"
                  name="location"
                  required
                  placeholder="Eg. Takoradi - Racecourse"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="phoneNumber"
                  className="font-[500] text-[#344054]"
                >
                  Phone number
                </label>
                <input
                  onChange={addressInformationChange}
                  value={phoneNumber}
                  type="number"
                  name="phoneNumber"
                  required
                  placeholder="Eg. +233 XXX XXXX"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div className="opacity-0">4</div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
        {/* Guardian Address */}
        <div className=" m-4 p-4 rounded border-2 border-gray-200">
          <h3 className="p-2 font-semibold text-gray-800 mb-4 text-xl">
            Guardian Information
          </h3>
          <div className="grid grid-cols-2">
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="father" className="font-[500] text-[#344054]">
                  Father
                </label>
                <input
                  onChange={guardianInformationChange}
                  value={father}
                  type="text"
                  name="father"
                  required
                  placeholder="Eg. Peter Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="mother" className="font-[500] text-[#344054]">
                  Mother
                </label>
                <input
                  onChange={guardianInformationChange}
                  value={mother}
                  type="text"
                  name="mother"
                  required
                  placeholder="Eg. Jane Doe"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label htmlFor="other" className="font-[500] text-[#344054]">
                  Other
                </label>
                <input
                  onChange={guardianInformationChange}
                  value={other}
                  type="text"
                  name="other"
                  placeholder="Eg. 25"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 mb-4 mx-2">
                <label
                  htmlFor="studentId"
                  className="font-[500] text-[#344054]"
                >
                  Student Id
                </label>
                <input
                  // onChange={onChange}
                  // value={schoolName}
                  type="password"
                  name="studentId"
                  required
                  placeholder="Student Id"
                  className="w-[230px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {toggle ? (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="text-[#3C0E3C] bg-[#feeefe] px-6 py-2 rounded font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsProfile;
