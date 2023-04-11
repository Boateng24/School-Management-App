import pic from "../../../assets/pic.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { schoolLogin } from "../../features/auth/schoolLoginSlice";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const { error } = useSelector((state) => state.schoolResetPassword);

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) =>
    setConfirmNewPassword(e.target.value);
  const dispatch = useDispatch();

  const validation = newPassword === confirmNewPassword;

 
  const handleResetPassword = (e) => {
    e.preventDefault();
    setShowError(true);
    if (validation) {
      setNewPassword("");
      setConfirmNewPassword("");
    }
    
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowError(false);
  };

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
          message={
            validation
              ? "Password reset successfully"
              : "Passwords do not match"
          }
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
        <form onSubmit={handleResetPassword}>
          <h1 className="text-3xl text-gray-700 text-center font-[600] mb-8">
            Reset Password
          </h1>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="newPassword" className="font-[500] text-[#344054]">
              New Password
            </label>
            <input
              onChange={handleNewPasswordChange}
             
              value={newPassword}
              type="password"
              required
              name="newPassword"
              placeholder="Password must be more than 8 letters"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="font-[500] text-[#344054]"
            >
              Confirm New Password
            </label>
            <input
              onChange={handleConfirmNewPasswordChange}
              value={confirmNewPassword}
              type="password"
              required
              name="confirmNewPassword"
              placeholder="Password must be more than 8 letters"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>

          <div className="grid">
            <button
              className="w-[360px] bg-[#29365f] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] mt-6 cursor-pointer"
              // disabled={!canSubmit}
              type="submit"
            >
              Save new password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
