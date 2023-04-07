import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import CampaignIcon from "@mui/icons-material/Campaign";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, logoutSchool } from "../../features/auth/logoutSchoolSlice";
import { Button, FormControl, Modal, Select, Snackbar } from "@mui/material";
import { useSendAnnouncementMutation } from "../../api/school/SchoolApi";
import CloseIcon from "@mui/icons-material/Close";

function AccountMenu() {
  const { loggedInSchool } = useSelector(
    (state) => state.loginSchool?.loggedInSchool
  );

  const { loggedInUser } = useSelector(
    (state) => state?.loginUser?.loggedInUser || ""
  );
  const { currentUser } = useSelector((state) => state?.loginUser);
  const { accessToken } = useSelector(
    (state) => state.loginSchool.loggedInSchool.loggedInSchool
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, [4000]);
  }, [successMessage]);

  const handleOpen = (e) => setOpenModal(true);
  const handleCloseModal = (e) => setOpenModal(false);
  const [message, setMessage] = useState("");

  const [sendAnnouncement] = useSendAnnouncementMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendAnnouncement({
      message,
      // Check in with tuffour on this
      adminId: currentUser?.token,
      schoolId: loggedInSchool?.id,
    });
    handleCloseModal();
    setShowAlert(true);
    setSuccessMessage("Your announcement has been sent successfully");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

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

  // Alert snackbar
  const announcementSent = (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        message={successMessage}
        action={action}
      />
    </div>
  );

  // Modal
  const modal = (
    <div className="">
      {showAlert && announcementSent}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-blur-md"
      >
        <Box sx={style} className="rounded-md">
          <p id="modal-modal-title" className="font-bold text-xl mb-4 -mt-2">
            Announcement
          </p>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <form action="" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4  mt-8">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="All students will see this announcement"
                  required
                  cols={12}
                  rows={5}
                  className="p-4 border-2 border-gray-200 resize-none rounded-xl outline-none"
                ></textarea>
              </div>
              <button
                disabled={!message}
                className="w-[330px] h-[44px] bg-[#29365F] rounded-md mt-6 text-white"
              >
                Send Announcement
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );

  return (
    <React.Fragment>
      {modal}
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://fakeimg.pl/350x200/?text=World&font=lobster"
              //   onClick={AccountMenu}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate(`schoolProfile`)}>
          <Avatar /> Profile
        </MenuItem>

        <Divider />
        <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <CampaignIcon fontSize="small" />
          </ListItemIcon>
          Announcement
        </MenuItem>
        <MenuItem onClick={() => navigate(`schoolSettings`)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings and Preferences
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            localStorage.removeItem("applicationState");
            window.location.replace("/");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
