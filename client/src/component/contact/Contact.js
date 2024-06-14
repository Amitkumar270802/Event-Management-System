import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../navabar/Navbar";
import Lottie from "lottie-react";
import x from "../anim/Animation - 1711180966660.json";
import { toast } from "react-toastify";

const Contact = () => {
  const [input, setInput] = useState({
    name: "",
    phone: "",
    college: "",
    message: "",
  });
  const changeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const { data } = await axios.post("/api/v1/user/message", {
        name: input.name,
        phone: input.phone,
        college: input.college,
        message: input.message,
      });
      if (data.success) {
        toast.success("Message Send Successfully");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error(err);
      }
    }
  };

  return (
    <div className="bg-[#000814]  h-screen flex justify-center items-center">
      <div className="bg-[#161d29] md:w-4/12 w-7/12 rounded-2xl p-4  text-[#f1f2ff] shadow-sm shadow-gray-100">
        <h1 className="text-md font-semibold p-2 mb-[20px] rounded-3xl text-center bg-black ">
          Here From You
        </h1>
        <div className="flex justify-evenly pb-2 ">
          <div className="flex flex-col">
            <h2 className="text-left p-2">Name</h2>
            <input
              required
              type="text"
              name="name"
              value={input.name}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">Phone</h2>
            <input
              required
              type="text"
              name="phone"
              value={input.phone}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
        </div>
        <div className="flex justify-evenly pb-2 ">
          <div className="flex flex-col">
            <h2 className="text-left p-2">College</h2>
            <input
              required
              type="text"
              name="college"
              value={input.college}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">Message</h2>
            <input
              required
              type="text"
              name="message"
              value={input.message}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-11/12 rounded-lg text-[#999daa] "
            />
          </div>
        </div>
        <div className="flex text-sm  gap-4 justify-start mt-8  items-center ">
          <button
            className="  p-2 bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md"
            onClick={submitHandler}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};
export default Contact;
