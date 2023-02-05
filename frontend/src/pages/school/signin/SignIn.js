import pic from "../../../assets/pic.png";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { schoolLogin } from "../../../features/auth/loginSchoolSlice";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, AvatarGroup } from "@mui/material";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showError, setShowError] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { isLoggingIn, loggedInSchool, error } = useSelector(
    (state) => state.loginSchool
  );

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      setFormData({ email: "", password: "" });
    } else {
      setShowError(false);
    }
    setTimeout(() => {
      setShowError(false);
    }, 4000);
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleschoolLogin = (e) => {
    e.preventDefault();
    dispatch(
      schoolLogin({
        email,
        password,
      })
    );
  };

  if (loggedInSchool) {
    return (
      <Navigate to={`dashboard/${loggedInSchool.loggedInSchool.id}/home`} />
    );
  }

  // Display error message
  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="flex">
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showError}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error}
          action={action}
        />
      </div>

      <div className="hidden lg:flex min-w-[50vw] h-[100vh] bg-[#29365f] align-center justify-center flex-col">
        <h1 className="text-5xl mt-16 px-16 text-white font-bold">
          School Management System
        </h1>
        <p className="w-[47vw] text-gray-300 px-16 py-12 text-base leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis modi
          magnam quasi! Dolor provident, nam quaerat recusandae aperiam
          voluptates quisquam, reiciendis a est at deleniti esse debitis, sed
          odit sequi?
        </p>
        <img src={pic} width="700" alt="background" />
      </div>
      <div className=" flex h-[100vh] flex-1 justify-center items-center">
        <form action="" onSubmit={handleschoolLogin}>
          <h1 className="text-3xl text-gray-700 text-center font-[600] mb-8">
            Welcome Back, Log in.
          </h1>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="email" className="font-[500] text-[#344054]">
              Email
            </label>
            <input
              onChange={onChange}
              value={email}
              type="email"
              required
              name="email"
              placeholder="Eg. johndoe@gmail.com"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="password" className="font-[500] text-[#344054]">
              Password
            </label>
            <input
              onChange={onChange}
              value={password}
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="w-[360px]  text-gray-500 h-6 text-right rounded-[8px] mt-4">
            <span className="w-[360px] text-right">
              {" "}
              <Link to="/forgotpassword" className="underline">
                Forgot Password
              </Link>
            </span>
          </div>
          <div className="grid">
            <button
              className="w-[360px] bg-[#29365f] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] mt-6 cursor-pointer"
              // disabled={!canSubmit}
              type="submit"
            >
              {isLoggingIn ? "Logging in" : "Log in"}
            </button>
            <div className="w-[360px]  text-gray-500 h-[44px] text-center rounded-[8px] mt-4">
              Already have an account?{" "}
              <span>
                {" "}
                <Link to="/signUp" className="underline">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
