import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AdminNavbar from "../../components/superAdmin/Navbar/Navbar";
import { useGetAllSchoolsQuery } from "../../api/superadmin/SuperAdminApi";
import { Box, Fab, IconButton, Modal } from "@mui/material";
import { createNewSchool } from "../../features/auth/createSchoolSlice";
import { useDispatch, useSelector } from "react-redux";
import {Delete, Add, Visibility} from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useRemoveSchoolMutation } from "../../api/school/SchoolApi";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
 
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
   
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));




export default function AdminDashboard() {

 const [allSchools , setAllSchools] = React.useState([])
  const { loggedInAdmin } = useSelector((state) => state.superAdmin);

  console.log('All', allSchools);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/allSchools");
        const data = await response.json();
        setAllSchools(data)
      } catch (error) {
       alert(error)
      }
    };
    fetchData();
  }, []);

  const [open , setOpen ] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // School payload
    const [schoolName , setSchoolName] = React.useState("")
    const [email , setEmail] = React.useState("")
    const [password , setPassword] = React.useState("")
    const [confirmPassword , setConfirmPassword] = React.useState("")

    const navigate = useNavigate()

    const handleSchoolName = (e) => {
      setSchoolName(e.target.value)
    }
    const handleEmail = (e) => {
      setEmail(e.target.value)
    }
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }
    const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value)
    }

    // const {currentData} = useGetAllSchoolsQuery()

  
   const dispatch = useDispatch()

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };


   const onSubmit = (e) => {
     e.preventDefault();
     dispatch(createNewSchool({ schoolName, email, password }));
     handleClose()
     window.location.reload()
     // navigate("/cool");
   };

   const [removeSchool] = useRemoveSchoolMutation()

   const handleSchoolDelete = (id) => {
    removeSchool( {id} );
    // alert("School deleted successfully")
   }

  return (
    <div className="">
      <AdminNavbar />
      <div className="flex justify-end px-6">
        <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={handleOpen}>
          <Fab color="secondary" aria-label="add">
            <Add />
          </Fab>
        </Box>
      </div>
      {/* Start Modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-blur-md"
      >
        <Box sx={style} className="rounded-md">
          <p id="modal-modal-title" className="font-bold text-xl mb-4 ">
            Add New School
          </p>
          <hr />
          <div id="modal-modal-description">
            <form action="" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-4 my-4">
                <label
                  htmlFor="School name"
                  className="font-[500] text-[#344054]"
                >
                  School name
                </label>
                <input
                  onChange={handleSchoolName}
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
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  required
                  name="email"
                  placeholder="Eg. johndoe@gmail.com"
                  className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <label
                  htmlFor="passoword"
                  className="font-[500] text-[#344054]"
                >
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
              <div className="grid grid-cols-1 gap-4 mb-4">
                <label
                  htmlFor="confirmPassoword"
                  className="font-[500] text-[#344054]"
                >
                  Confirm Password
                </label>
                <input
                  onChange={handleConfirmPassword}
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
                  className="w-[360px] bg-[#9C27B0] text-gray-50 h-[44px] rounded-[8px] mt-6 cursor-pointer"
                  // disabled={isCreating}
                  type="submit"
                >
                  {/* {isCreating ? "Creating school..." : "Create school"} */}
                  Add School
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      {/* End Modal */}
      <div className="flex justify-center items-center">
        <div className=" w-[97vw] ">
          <TableContainer
            //   component={Paper}
            className="mt-8"
          >
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              className=""
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>School</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">
                    Date Joined&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">Population</StyledTableCell>
                  <StyledTableCell align="right">Website</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!allSchools ? "Me" : allSchools?.allSchools?.map(
                  ({ schoolName, email, id, address }) => (
                    <StyledTableRow key={id}>
                      <StyledTableCell component="th" scope="row">
                        {schoolName || 'Eirrr'}
                      </StyledTableCell>
                      <StyledTableCell align="right">{email}</StyledTableCell>
                      <StyledTableCell align="right">
                        {address?.map(({ createdAt }) => createdAt)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {address?.map(({ location }) => location)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {address?.map(({ website }) => website)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton onClick={handleSchoolDelete(id)}>
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => navigate(`/admin-dashboard/${id}`)}
                        >
                          <Visibility />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
