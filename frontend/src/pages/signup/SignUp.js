import React from "react";

const SignUp = () => {
  return (
    <div className=" h-screen">
      <div className="h-3/4 flex justify-center items-center">
        {/* <h1>School Management System</h1> */}
        <div className="h-[500px] w-96  flex justify-center flex-col ">
          <div className="mb-6">
            <label htmlFor="title" className="font-[500] text-[#344054] ">
              Fullname
            </label>
            <input
              type="title"
              required
              name="fullname"
              placeholder="Enter your fullname"
              className=" mt-2 w-96 h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="mb-6 ">
            <label htmlFor="email" className="font-[500] text-[#344054]">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              placeholder="john@gmail.com"
              className=" mt-2 w-96 h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4 "
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="font-[500] text-[#344054]">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="Enter your password"
              className=" mt-2 w-96 h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="font-[500] text-[#344054]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="Confirm your password"
              className=" mt-2 w-96 h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="title" className="font-[500] text-[#344054]">
              Fullname
            </label>
            <input
              type="title"
              required
              name="fullname"
              placeholder="Enter your fullname"
              className=" mt-2 w-96 h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
            />
          </div>
        </div>
      </div>
      <div>2</div>
    </div>
  );
};

export default SignUp;
