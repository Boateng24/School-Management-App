import React from "react";
import { Link } from "react-router-dom";
import background from "../../assets/background.png";

const VerifyAccount = () => {
  return (
    <div className="flex">
      <div className="hidden lg:flex min-w-[50vw] h-[100vh] ">
        <img src={background} alt="backgroundpic" width={"100%"} />
      </div>
      <div className=" flex h-[100vh] flex-1 justify-center items-center">
        <form action="">
          <h1 className="text-3xl text-gray-700 text-center font-[600] mb-3">
            Verify Account
          </h1>

          <p className="mb-8 text-[#344054]">
            Enter the verification code we sent to sam@gmail.com
          </p>
          <div className=" flex justify-center">
            <input
              type="tel"
              className="w-16 h-16 rounded-lg border-[1px] mr-4 text-[#344054] border-[#D0D5DD] outline-none text-5xl text-center font-medium"
              placeholder="0"
            />
            <input
              type="tel"
              className="w-16 h-16 rounded-lg border-[1px] mr-4 text-[#344054] border-[#D0D5DD] outline-none text-5xl text-center font-medium"
              placeholder="0"
            />
            <input
              type="tel"
              className="w-16 h-16 rounded-lg border-[1px] mr-4 text-[#344054] border-[#D0D5DD] outline-none text-5xl text-center font-medium"
              placeholder="0"
            />
            <input
              type="tel"
              className="w-16 h-16 rounded-lg border-[1px] text-[#344054] border-[#D0D5DD] outline-none text-5xl text-center font-medium"
              placeholder="0"
            />
          </div>

          <div className="grid">
            <button className="w-[360px] bg-blue-700 hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] mt-6">
              Verify
            </button>
            <Link
              to="/"
              className="w-[360px] text-center  text-gray-500 h-[44px] rounded-[8px] mt-4"
            >
              &#8592; Back to log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
