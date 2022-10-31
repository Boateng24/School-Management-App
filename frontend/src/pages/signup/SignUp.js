import background from "../../assets/background.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerSchool } from "../../features/auth/schoolRegistrationSlice";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  // const {currentUser, isRegistering} = useSelector((state) => state.schoolRegistration);
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { schoolName, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const { currentUser, isRegistering } = useSelector(
    (state) => state.schoolRegistration
  );
  console.log("Current User", currentUser);

  // Create a new organization
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerSchool({ schoolName, email, password }));
    // navigate("/cool");
  };

  return (
    <div className="flex bg-slate-50">
      <div className="hidden lg:flex min-w-[50vw] h-[100vh] ">
        <img src={background} alt="endophin" width={"100%"} />
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
              className="w-[360px] bg-blue-700 hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] mt-6 cursor-pointer"
              disabled={isRegistering}
              type="submit"
            >
              {isRegistering ? "Creating school..." : "Create school"}
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
