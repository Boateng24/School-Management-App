import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/auth/AdminLoginSlice";
import { Navigate, redirect } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedInAdmin, error } = useSelector((state) => state.superAdmin);
  const [errorMessage, setErrorMessage] = useState(error || "");

  console.log("Logged in role", loggedInAdmin?.loggedInUser?.role);

  console.log("Error is", error);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 

  const dispatch = useDispatch();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    dispatch(
      adminLogin({
        email,
        password,
      })
    );
  };

  React.useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }

    return () => {
      setInterval(() => {
        setErrorMessage("");
      }, [5000]);
    };
  }, [error]);

    // React.useEffect(() => {
    //   if (loggedInAdmin === null) {
    //       return redirect("/admin-login");
    //   }
    // }, []);

 

  if (loggedInAdmin?.loggedInUser?.role === "superAdmin") {
    return (
      <Navigate to={`${loggedInAdmin?.loggedInUser?.id}`} />
    );
  }
 


  // const checkConditions = errorMessage && email && password
  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center flex-col">
     
      {error && (
        <p
          className={
            errorMessage.length > 0 && "bg-red-100 text-red-700 border-2 border-red-300 w-96 p-4 rounded-lg font-bold"
          }
        >
          {" "}
          {errorMessage}
        </p>
      )}
      <h1 className="font-bold text-3xl text-center text-gray-600 pt-8 mb-6">
        Admin Login
      </h1>
      <form
        className="h-auto bg-white w-[400px] grid place-items-center"
        onSubmit={handleAdminLogin}
      >
        <hr />
        <div className="grid grid-cols-1 gap-4 my-6">
          <label htmlFor="email" className="font-[500] text-[#344054]">
            Email
          </label>
          <input
            onChange={handleEmail}
            value={email}
            type="email"
            required
            name="email"
            placeholder="Eg. johndoe@gmail.com"
            className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <label htmlFor="password" className="font-[500] text-[#344054]">
            Password
          </label>
          <input
            onChange={handlePassword}
            value={password}
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid mb-8 mt-2">
          <button
            className="w-[360px] bg-[#29365F] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] cursor-pointer"
            // disabled={!canSubmit}
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
