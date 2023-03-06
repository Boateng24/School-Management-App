import { Box, Button, IconButton, Modal, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useRemoveStudentMutation } from "../../api/students/StudentsApi";
import { useState } from "react";
import { useRemoveAnnouncementMutation } from "../../api/school/SchoolApi";

const Announcement = ({ id, message }) => {
  const [removeAnnouncement] = useRemoveAnnouncementMutation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [edit , setEdit] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { studentId } = useParams();

  const handleStudentAnnouncement = () => {
    removeAnnouncement({ id });
    handleClose();

    setSuccessMessage(`Your message has been deleted successfully`);
    setShowSuccess(true);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEdit = () => setEdit(true)
  const handleCloseEdit = () => setEdit(false)

  useEffect(() => {
    if (successMessage) {
        setShowSuccess(true)
        setTimeout(()=>{
            window.location.reload()
        }, 4000)
    }
  }, [successMessage]);

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

  const alertMessage = (
    // <div>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={showSuccess}
      autoHideDuration={6000}
      onClose={handleClose}
      message={successMessage}
      action={action}
    />
    // </div>
  );

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="flex justify-start mb-1  px-3 cursor-pointer hover:bg-slate-50 "
    >
      {/* Snackbar */}
      {/* {showSuccess && alertMessage} */}
      {showSuccess &&
        //   "Your message has been deleted successfully"
        alertMessage}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-blur-md"
      >
        <Box sx={style} className="rounded-md">
          <p id="modal-modal-title" className="font-bold text-xl ">
            Delete Announcement
          </p>
          <div id="modal-modal-description">
            {/* <form action="" onSubmit={handleSubmit}> */}
            <form action="">
              <div className="grid grid-cols-1 gap-4 mt-4">
                {`Are you sure you want to delete this message from your announcements ??`}
              </div>
              <div className="grid grid-cols-2 gap-4  mt-2">
                <button
                  className="w-[170px] h-[44px] border-2 border-grey-100 text-gray-600 rounded-md mt-6"
                  onClick={handleClose}
                >
                  No , keep it.
                </button>
                <button
                  className="w-[170px] h-[44px] bg-red-600 rounded-md mt-6 text-white"
                  onClick={handleStudentAnnouncement}
                >
                  Yes , delete
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {/* Edit Modal Start */}
      <Modal
        open={edit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-blur-md"
      >
        <Box sx={style} className="rounded-md">
          <p id="modal-modal-title" className="font-bold text-xl ">
            Edit Announcement
          </p>
          <div id="modal-modal-description">
            {/* <form action="" onSubmit={handleSubmit}> */}
            <form action="">
              <textarea cols={40} rows={4} className="rounded-lg mt-6 p-3 resize-none outline-none border-2 border-gray-100">
                {message}
              </textarea>
              <div className="grid grid-cols-2 gap-4  mt-2">
                <button
                  className="w-[170px] h-[44px] border-2 border-grey-100 text-gray-600 rounded-md mt-6"
                  onClick={handleCloseEdit}
                >
                 Close
                </button>
                <button
                  className="w-[170px] h-[44px] bg-red-600 rounded-md mt-6 text-white"
                  onClick={handleStudentAnnouncement}
                >
                  Edit Announcement
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {/* Edit Modal End */}
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="flex justify-between w-[60%] mr-auto py-4"
        onClick={() => navigate(`${id}`)}
        // onClick={() => navigate(`2`)}
      >
        <div className="flex items-center justify-space-around">
          <p className="ml-4 w-4/5" title={message}>
            {message}
          </p>
        </div>
      </div>
      <div className="flex w-[10%] justify-end py-4">
        {isHovered && (
          <div>
            <IconButton>
              <EditIcon onClick={handleEdit} />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
