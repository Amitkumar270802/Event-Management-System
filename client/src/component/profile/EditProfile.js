import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getUserDate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/student/${user._id}`);
      setData(data.user);
    } catch (err) {
      alert(err);
    }
  };

  const [input, setInput] = useState({
    name: data.name,
    phone: data.phone,
    email: data.email,
    registration_no: data.reg_no,
  });

  const changeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    try {
      const { data } = await axios.put(
        `/api/v1/student/update-details/${user._id}`,
        {
          name: input.name,
          phone: input.phone,
          reg_no: input.registration_no,
        }
      );
      if (data?.success) {
        navigate("/test");
        toast.success("Details Updated");
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
  useEffect(() => {
    getUserDate();
  }, []);
  return (
    <div className="mx-auto " data-aos="fade-up">
      <div className="flex flex-col gap-5 mt-20">
        <div className="bg-[#161d29] text-left text-md p-4 rounded-2xl flex">
          <div className="flex justify-center items-center gap-y-1">
            <img src={user.profileImg} className="h-[80px] rounded-3xl p-2" />
            <h1>{user.email}</h1>
          </div>
          <div className="flex text-sm p-4 gap-4 justify-center items-center">
            <button
              onClick={submitHandler}
              className=" w-fit p-2 h-fit bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md"
            >
              Change Image
            </button>
            <button
              onClick={submitHandler}
              className=" w-[80px] p-2 h-fit bg-[#2c333f] text-white hover:scale-95   font-semibold rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="bg-[#161d29] rounded-xl p-4  text-[#f1f2ff]">
          <h1 className="text-2xl font-semibold p-8 text-left">
            Personal Information
          </h1>
          <div className="flex justify-evenly gap-6">
            <div className="flex flex-col">
              <h2 className="text-left p-2">First Name</h2>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">Last Name</h2>
              <input
                type="text"
                // name="name"
                // value={data.name}
                // onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
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
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">Registration No.</h2>
              <input
                type="text"
                name="registration_no"
                value={data.reg_no}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
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
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">College</h2>
              <input
                type="text"
                name="college"
                value={data.college}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex text-sm p-4 gap-4">
            <button
              onClick={submitHandler}
              className=" w-[80px] p-2 bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md"
            >
              Save
            </button>
          </div>
          <div className="flex text-sm p-4 gap-4">
            <button
              onClick={submitHandler}
              className=" w-[80px] p-2 bg-[#161d29] text-white hover:scale-95   font-semibold rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
