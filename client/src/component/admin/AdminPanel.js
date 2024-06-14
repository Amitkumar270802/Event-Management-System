import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiLockPasswordFill } from "react-icons/ri";
import { setUser } from "../../redux/profileSlice";
import { MdLogout } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { setToken } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import Event from "./AllEvent";
const AdminPanel = () => {
  const [choice, setChoice] = useState();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/event");
  };
  return (
    <div className="min-h-screen w-screen bg-[#000814]">
      <div className="w-screen bg-[#161d29] text-white border-b border-gray-500 flex justify-around items-center p-4">
        <div>
          <h1 className="text-2xl">Poornima</h1>
        </div>
        <div className="flex gap-4">
          <Link to={"/event"}>Home</Link>
          <Link to={"/event"}>About us</Link>
          <Link to={"/contact"}>Contact Us</Link>
        </div>
      </div>
      <div className="flex  justify-around text-white  bg-[#161d29]  ">
        <div className="w-1/12 min-h-screen  ">
          <div className="text-left flex flex-col gap-5 bg-[#161d29] ">
            <h1
              className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 "
              onClick={() => setChoice(1)}
            >
              <GoProjectRoadmap />
              Create Event
            </h1>
            <h1
              className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 "
              onClick={() => setChoice(2)}
            >
              <GoProjectRoadmap />
              All Event
            </h1>

            <h1
              className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 "
              onClick={() => setChoice(3)}
            >
              <RiLockPasswordFill />
              Change Password
            </h1>
            <h1
              onClick={logoutHandler}
              className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 active:bg-yellow-200 w-[300px] p-4 active:text-yellow-800 "
            >
              <MdLogout />
              Logout
            </h1>
          </div>
        </div>
        <div className="bg-[#000814] w-9/12  ">
          {choice === 1 && <CreateEvent />}
          {choice === 2 && <Event />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
