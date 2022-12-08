import pic from "../../../assets/pic.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewSchool } from "../../../features/auth/createSchoolSlice";
import { useEffect, useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SignUp = () => {
  const { isCreating, currentSchool, error } = useSelector(
    (state) => state.createSchool
  );
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { schoolName, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();

  // Create a new organization
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewSchool({ schoolName, email, password }));
    // navigate("/cool");
  };

  if (currentSchool) {
    return <Navigate to={"/"} />;
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
    <div className="flex bg-slate-50">
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showError}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error?.map((errorMessage) => (
            <p style={{ color: "white" }}>{errorMessage?.msg}</p>
          ))}
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
        <form action="" onSubmit={onSubmit}>
          <h1 className="text-3xl text-gray-700 text-center font-[600] mb-8">
            Register Your School
          </h1>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="School name" className="font-[500] text-[#344054]">
              School name
            </label>
            <input
              onChange={onChange}
              value={schoolName}
              type="text"
              name="schoolName"
              required
              placeholder="Eg. Neumann International School"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
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
            <label htmlFor="passoword" className="font-[500] text-[#344054]">
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
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label
              htmlFor="confirmPassoword"
              className="font-[500] text-[#344054]"
            >
              Confirm Password
            </label>
            <input
              onChange={onChange}
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              required
              placeholder="Enter your password"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid">
            <button
              className="w-[360px] bg-[#29365F] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] mt-6 cursor-pointer"
              disabled={isCreating}
              type="submit"
            >
              {isCreating ? "Creating school..." : "Create school"}
            </button>
            <div className="w-[360px]  text-gray-500 h-[44px] text-center rounded-[8px] mt-4">
              Already have an account?{" "}
              <span>
                {" "}
                <Link to="/" className="underline">
                  Log in
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
