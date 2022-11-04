import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";

import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import VerifyAccount from "./pages/verifyaccount/VerifyAccount";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/sidebar/Navbar";
import Students from "./pages/students/Students";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route element={<SignIn />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<ForgotPassword />} path="/forgotpassword" />
            <Route element={<VerifyAccount />} path="/verifyaccount" />
            <Route element={<ResetPassword />} path="resetpassword" />
            <Route element={<Dashboard />} path="dashboard/:schoolId/">
              {/* <Route element={<Students />} path="students" /> */}
            </Route>
            <Route element={<Students />} path="dashboard/:schoolId/students" />
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
