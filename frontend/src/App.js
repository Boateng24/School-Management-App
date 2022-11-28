import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";

import SignUp from "./pages/school/signup/SignUp";
import SignIn from "./pages/school/signin/SignIn";
import VerifyAccount from "./pages/school/verifyaccount/VerifyAccount";
import ForgotPassword from "./pages/school/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/school/resetpassword/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/sidebar/Navbar";
import Students from "./components/students/Students";
import Staffs from "./components/staffs/Staffs";
import Student from "./components/students/Student";
import StudentDetails from "./components/students/StudentDetails";
import SchoolProfile from "./components/school/SchoolProfile";
import SchoolSettings from "./components/school/SchoolSettings";
import UsersLogin from "./pages/users/signin/UsersLogin";
import UsersForgotPassword from "./pages/users/forgotpassword/UsersForgotPassword";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route element={<SignIn />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<UsersLogin />} path="/userslogin" />

            <Route element={<ForgotPassword />} path="/forgotpassword" />
            <Route
              element={<UsersForgotPassword />}
              path="/usersforgotpassword"
            />
            <Route element={<VerifyAccount />} path="/verifyaccount" />
            <Route element={<ResetPassword />} path="resetpassword" />
            {/* <Route element={<Dashboard />} path="dashboard/:schoolId/" /> */}
            <Route element={<Sidebar />} path="dashboard/:schoolId/">
              <Route element={<Dashboard />} path="home" />
              <Route element={<Students />} path="students" />
              <Route element={<SchoolProfile />} path="schoolProfile" />
              <Route element={<SchoolSettings />} path="schoolSettings" />
              {/* </Route> */}
              <Route element={<StudentDetails />} path="students/:studentId" />
              <Route element={<Staffs />} path="staffs" />
            </Route>
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
