import pic from "../../../assets/pic.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { schoolLogin } from "../../features/auth/schoolLoginSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const handleForgotPassword = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex">
      <div className="hidden lg:flex min-w-[50vw] h-[100vh] bg-[#29365f] align-center justify-center flex-col">
        <h1 className="text-5xl mt-16 px-16 text-white font-bold">
          School Management System
        </h1>
        <p className="w-[47vw] text-gray-300 px-16 py-12 text-base leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis modi
          magnam quasi! Dolor provident, nam quaerat recusandae aperiam
          voluptates quisquam, reiciendis a est at deleniti esse debitis, sed
          odit sequi?
        </p>
        <img src={pic} width="700" alt="background" />
      </div>
      <div className=" flex h-[100vh] flex-1 justify-center items-center">
        <form action="" onSubmit={handleForgotPassword}>
          <h1 className="text-3xl text-gray-700 text-center font-[600] mb-8">
            Forgot Password?
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

          <div className="grid">
            <button
              className="w-[360px] bg-[#29365F] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] mt-6 cursor-pointer"
              // disabled={!canSubmit}
              type="submit"
            >
              Send reset link
            </button>
            <div className="w-[360px]  text-gray-500 h-[44px] text-center rounded-[8px] mt-4">
              Already have an account?{" "}
              <span>
                {" "}
                <Link to="/" className="underline">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
