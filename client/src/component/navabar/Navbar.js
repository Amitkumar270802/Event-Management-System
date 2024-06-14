import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/authSlice";
import { setUser } from "../../redux/profileSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logout Successfully");
  };
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  console.log("Token: ", token);
  console.log("User : ", user);

  return (
    <div className="fixed  flex gap-4 text-lg mx-auto justify-between ">
      {!token && (
        <>
          <div className="w-screen bg-[#161d29] text-white border-b border-gray-500 flex justify-around items-center p-4">
            <div>
              <h1 className="text-md font-semibold  bg-yellow-400 p-2 rounded-md text-black">
                Poornima
              </h1>
            </div>
            <div className="flex gap-4">
              {/* <Link to={"/login"}>About us</Link> */}
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/event"}
              >
                Home
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/contact"}
              >
                Contact Us
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/registration"}
              >
                Registration
              </Link>
            </div>
          </div>
        </>
      )}
      {token && user && user.role === "admin" && (
        <>
          <div className=" w-screen bg-[#161d29] text-white border-b border-gray-500 flex justify-around items-center p-4">
            <h1 className="text-md font-semibold  bg-yellow-400 p-2 rounded-md text-black">
              Poornima
            </h1>
            <div className="flex gap-4 items-center" data-aos="fade-left">
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/admin/create-event"}
              >
                Create Event
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/admin/all-events"}
              >
                All Event
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/admin/all-messages"}
              >
                Get Messages
              </Link>
              <h1 onClick={logoutHandler}>Logout</h1>
            </div>
          </div>
          <Link to={"/admin"}>Dashboard</Link>
          <div onClick={logoutHandler} className="cursor-pointer">
            Logout
          </div>
        </>
      )}
      {token && user && user.role === "user" && (
        <>
          <div className="w-screen h-fit bg-[#161d29] text-white border-b border-gray-500 flex justify-around items-center p-4">
            <div>
              <h1 className="text-md font-semibold  bg-yellow-400 p-2 rounded-md text-black">
                Poornima
              </h1>
            </div>
            <div className="flex gap-4 items-center" data-aos="fade-left">
              <div className="flex gap-4">
                <img
                  alt="..."
                  src={user.profileImg}
                  className="h-[40px] rounded-full"
                />
              </div>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/test"}
              >
                Dashboard
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/event"}
              >
                All Event
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/test"}
              >
                About us
              </Link>
              <Link
                className="hover:border-b-2 hover:border-b-yellow-200"
                to={"/contact"}
              >
                Contact Us
              </Link>
              <h1 onClick={logoutHandler} className="cursor-pointer">
                Logout
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
