import React, { useEffect, useState } from "react";
import Navbar from "../navabar/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "./../../redux/authSlice";
import { setUser } from "../../redux/profileSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // to call the implementation of Action of store.js
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const { data } = await axios.post("/api/v1/student/login", {
        email: input.email,
        password: input.password,
      });
      if (data?.success) {
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        // console.log("Login Successfull");
        toast.success("Login Successfull");
        if (data.user.role === "user") navigate("/test");
        else navigate("/admin/all-events");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data.message;
        // alert(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error(err);
      }
    }
  };

  return (
    <div className="h-screen bg-[#000814]  flex justify-center items-center ">
      <div className="bg-[#161d29]  rounded-xl p-6 text-[#f1f2ff] shadow-sm shadow-gray-100 ">
        <h1 className="text-md font-semibold p-2 text-center rounded-2xl bg-black">
          Login Here
        </h1>
        <div className="flex flex-col">
          <h2 className="text-left p-2">Email</h2>
          <input
            type="text"
            name="email"
            required
            value={input.email}
            onChange={changeHandler}
            className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-left p-2">Password</h2>
          <input
            type="text"
            name="password"
            required
            value={input.password}
            onChange={changeHandler}
            className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
          />
        </div>
        <div className="flex text-sm  gap-4 justify-start mt-8  items-center ">
          <button
            className="  p-2 bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md"
            onClick={submitHandler}
          >
            Login
          </button>
          <button className="  p-2 bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md">
            Forgot Password
          </button>
          <Link to={"/registration"}>
            <div className="text-blue-700 cursor-pointer hover:text-blue-950 underline underline-offset-2">
              New User ?{" "}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
