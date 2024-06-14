import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Test from "./Test";

const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  const [data, setData] = useState({});
  const getUserDate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/student/${user._id}`);
      setData(data.user);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getUserDate();
  }, []);

  return (
    <div className="mx-auto " data-aos="fade-up">
      <div className="flex flex-col gap-5 m-4">
        <div className="bg-[#161d29] text-left text-md p-4 rounded-2xl flex">
          <div className="flex justify-center items-center">
            <img src={user.profileImg} className="h-[80px] rounded-3xl p-2" />
            <h1>{user.email}</h1>
          </div>
        </div>
        <div className="bg-[#161d29] rounded-xl p-4  text-[#f1f2ff] ">
          <h1 className="text-2xl font-semibold p-8 text-left">
            Personal Information
          </h1>
          <div className="flex justify-evenly gap-6">
            <div className="flex flex-col">
              <h2 className="text-left p-2">First Name</h2>
              <input
                type="text"
                value={data.name}
                className="select-none cursor-not-allowed outline-none bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">Last Name</h2>
              <input
                type="text"
                name="name"
                value={data.name}
                className="select-none bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
          </div>
          <div className="flex justify-evenly gap-6">
            <div className="flex flex-col">
              <h2 className="text-left p-2">Phone Number</h2>
              <input
                type="text"
                name="phone"
                value={data.phone}
                className="select-none bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">Registration No.</h2>
              <input
                type="text"
                name="registration_no"
                value={data.reg_no}
                className="select-none bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
          </div>

          <div className="flex justify-evenly gap-6">
            <div className="flex flex-col">
              <h2 className="text-left p-2">City</h2>
              <input
                type="text"
                name="city"
                value={data.city}
                className="select-none bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">College</h2>
              <input
                type="text"
                name="college"
                value={data.college}
                className="select-none bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
