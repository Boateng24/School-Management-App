import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";

import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import VerifyAccount from "./pages/verifyaccount/VerifyAccount";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import PageNotFound from "./pages/pagenotfound/PageNotFound";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<SignIn />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<ForgotPassword />} path="/forgotpassword" />
            <Route element={<VerifyAccount />} path="/verifyaccount" />
            <Route element={<ResetPassword />} path="resetpassword" />
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
