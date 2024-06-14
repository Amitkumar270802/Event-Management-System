import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    registration_no: "",
    phone: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const { data } = await axios.post("/api/v1/student/register", {
        name: input.name,
        email: input.email,
        password: input.password,
        reg_no: input.registration_no,
        phone: input.phone,
      });
      if (data.success) {
        toast.success("Student Registered Successfully");
        navigate("/login");
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
  const changeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="bg-[#000814]  h-screen flex justify-center items-center">
      <div className="bg-[#161d29] md:w-4/12 w-7/12 rounded-2xl p-4  text-[#f1f2ff] shadow-sm shadow-gray-100">
        <h1 className="text-md font-semibold p-2 mb-[20px] rounded-3xl text-center bg-black ">
          Registration
        </h1>
        <div className="flex justify-evenly pb-2 ">
          <div className="flex flex-col">
            <h2 className="text-left p-2">First Name</h2>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">Last Name</h2>
            <input
              type="text"
              name=""
              value={""}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
        </div>
        <div className="flex justify-evenly pb-2 ">
          <div className="flex flex-col ">
            <h2 className="text-left p-2">Registration No.</h2>
            <input
              type="text"
              name="registration_no"
              value={input.registration_no}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">phone</h2>
            <input
              type="text"
              name="phone"
              value={input.phone}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
        </div>
        <div className="flex justify-evenly pb-2 md:flex-row flex-col">
          <div className="flex flex-col">
            <h2 className="text-left p-2">Email</h2>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">Password</h2>
            <input
              type="text"
              name="password"
              value={input.password}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
        </div>

        <div className="flex p-2 ">
          <div className="flex flex-col sm:flex-row text-sm p-4 gap-4  justify-between items-center">
            <button
              onClick={submitHandler}
              className="  p-2 bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md"
            >
              Registration
            </button>
            <div>
              <Link to={"/login"}>
                <h1 className=" text-blue-700 cursor-pointer hover:text-blue-950  underline underline-offset-2">
                  Already Registered ?
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
