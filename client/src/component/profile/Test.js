import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiLockPasswordFill } from "react-icons/ri";
import Event from "./../event/Event";
import SavesEvents from "./../profile/SavesEvents";
import Profile from "./../profile/Profile";
import { RxPerson } from "react-icons/rx";
import { CiBookmark } from "react-icons/ci";
import EditProfile from "./../profile/EditProfile";
import MyEvents from "./MyEvents";
import { setUser } from "../../redux/profileSlice";
import { MdLogout } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { setToken } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Test = () => {
  const [choice, setChoice] = useState(2);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logout Successfully");
  };
  return (
    <div className="flex justify-around items-center text-white bg-[#161d29] ">
      <div className="w-2/12  " data-aos="fade-up">
        <h1
          className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 hover:bg-yellow-400 hover:text-black p-4  "
          onClick={() => setChoice(2)}
        >
          <GoProjectRoadmap />
          My Events
        </h1>
        <h1
          className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 hover:bg-yellow-400 hover:text-black p-4  "
          onClick={() => setChoice(3)}
        >
          <CiBookmark /> Wishlist
        </h1>
        <h1
          className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 hover:bg-yellow-400 hover:text-black p-4  "
          onClick={() => setChoice(4)}
        >
          <RxPerson />
          My Profile
        </h1>

        <h1
          className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 hover:bg-yellow-400 hover:text-black p-4  "
          onClick={() => setChoice(5)}
        >
          <RxPerson />
          Edit Profile
        </h1>
        <h1
          className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 hover:bg-yellow-400 hover:text-black p-4  "
          onClick={() => setChoice(1)}
        >
          <RiLockPasswordFill />
          Change Password
        </h1>
        <h1
          onClick={logoutHandler}
          className="hover:text-lg cursor-pointer ease-in duration-200 m-2 flex items-center gap-x-3 hover:bg-yellow-400 hover:rounded-lg hover:text-black p-4  "
        >
          <MdLogout />
          Logout
        </h1>
      </div>
      <div className="bg-[#000814] h-screen w-9/12 flex justify-center items-center ">
        {choice === 2 && <MyEvents />}
        {choice === 3 && <SavesEvents />}
        {choice === 4 && <Profile />}
        {choice === 5 && <EditProfile />}
      </div>
    </div>
  );
};

export default Test;
