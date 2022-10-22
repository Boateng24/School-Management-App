import background from "../../assets/background.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentLogin } from "../../features/auth/studentLoginSlice";

const SignIn = () => {
  const dispatch = useDispatch();

  const handleStudentLogin = (e) => {
    e.preventDefault();
    dispatch(
      studentLogin({
        email: "robertsam@email.com",
        password: "Robertsam@123",
      })
    );
  };
  return (
    <div className="flex">
      <div className="hidden lg:flex min-w-[50vw] h-[100vh] ">
        <img src={background} alt="endophin" width={"100%"} />
      </div>
      <div className=" flex h-[100vh] flex-1 justify-center items-center">
        <form action="" onSubmit={handleStudentLogin}>
          <h1 className="text-3xl text-gray-700 text-center font-[600] mb-8">
            Welcome Back, Log in.
          </h1>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <label htmlFor="email" className="font-[500] text-[#344054]">
              Email
            </label>
            <input
              // onChange={onChange}
              //   value={title}
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
              // onChange={onChange}
              // value={id_number}
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>

          <div className="grid">
            <button
              className="w-[360px] bg-blue-700 text-gray-50 h-[44px] rounded-[8px] mt-6 cursor-pointer"
              // disabled={!canSubmit}
              type="submit"
            >
              Get started
            </button>
            <div className="w-[360px]  text-gray-500 h-[44px] text-center rounded-[8px] mt-4">
              Already have an account?{" "}
              <span>
                {" "}
                <Link to="/signUp" className="underline">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
