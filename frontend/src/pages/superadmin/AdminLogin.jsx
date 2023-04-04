import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/auth/AdminLoginSlice";

const AdminLogin = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const data = useSelector(state => state.superAdmin)

  console.log('Error is' , data);
  const handleEmail = e => setEmail(e.target.value)
  const handlePassword = e => setPassword(e.target.value)

  const dispatch = useDispatch()

  const handleAdminLogin = (e) => {
    e.preventDefault()
    dispatch(adminLogin({
      email, 
      password
    }))
  }

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-3xl text-center text-gray-600 pt-8 mb-6">
        Admin Login
      </h1>
      <form
        className="h-auto bg-white w-[400px] grid place-items-center"
        onSubmit={handleAdminLogin}
      >
        <hr />
        <div className="grid grid-cols-1 gap-4 my-6">
          <label htmlFor="email" className="font-[500] text-[#344054]">
            Email
          </label>
          <input
            onChange={handleEmail}
            value={email}
            type="email"
            required
            name="email"
            placeholder="Eg. johndoe@gmail.com"
            className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <label htmlFor="password" className="font-[500] text-[#344054]">
            Password
          </label>
          <input
            onChange={handlePassword}
            value={password}
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            className="w-[360px] h-[44px] border-[1px] rounded-[8px] border-[#D0D5DD] outline-none px-4"
          />
        </div>
        <div className="grid mb-8 mt-2">
          <button
            className="w-[360px] bg-[#29365F] hover:bg-blue-900 text-gray-50 h-[44px] rounded-[8px] cursor-pointer"
            // disabled={!canSubmit}
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
