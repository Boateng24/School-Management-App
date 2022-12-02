// import usersLogin from "../../../assets/usersLogin.png";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { usersLogin } from "../../../features/auth/loginUserSlice";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, AvatarGroup } from "@mui/material";

const UsersLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showError, setShowError] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { isLoggingIn, loggedInUser, error, success } = useSelector(
    (state) => state.loginUser
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

  const handleUserLogin = (e) => {
    e.preventDefault();
    dispatch(
      usersLogin({
        email,
        password,
      })
    );
  };

  if (loggedInUser) {
    return <Navigate to={`${loggedInUser?.loggedInUser?.id}`} />;
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

      <div className="hidden lg:flex min-w-[50vw] h-[100vh] bg-[#29365f]  flex-col">
        {/* <h1 className="text-4xl mt-16 px-16 text-white font-bold">
          Hello there 😍 , Welcome back
        </h1> */}

        <img
          src={usersLogin}
          width="350"
          style={{ margin: "auto" }}
          alt="background"
        />
      </div>
      <div className=" flex h-[100vh] flex-1 justify-center items-center">
        <form action="" onSubmit={handleUserLogin}>
          <h1 className="text-3xl text-gray-700 text-center font-[600] mb-8">
            Student Login
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
              <Link to="/usersforgotpassword" className="underline">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersLogin;
