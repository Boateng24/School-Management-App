import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminNavbar from "../../components/superAdmin/Navbar/Navbar";
import { useGetAllSchoolsQuery } from "../../api/superadmin/SuperAdminApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: '#543eac',
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function AdminDashboard() {

    const {currentData} = useGetAllSchoolsQuery()
    console.log('All schools' , currentData);


    const rowss = currentData?.allSchools
  return (
    <div className="">
      <AdminNavbar />
      <div className="flex justify-end px-6">
        <button
          className="w-[120px] bg-[#f5e5f8] text-[#9C27B0] font-bold h-[44px] rounded-[8px] mt-6 cursor-pointer"
          // disabled={!canSubmit}
          type="submit"
        >
          Add School
        </button>
      </div>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData?.allSchools.map(
                  ({ schoolName, email, id, address }) => (
                    <StyledTableRow key={id}>
                      <StyledTableCell component="th" scope="row">
                        {schoolName}
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
