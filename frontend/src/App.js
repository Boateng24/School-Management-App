import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<SignIn />} path="/" />
            <Route element={<SignUp />} path="/signup" />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
