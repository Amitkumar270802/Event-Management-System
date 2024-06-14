import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { GoBookmark } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ title, description, image, venue, date, id }) => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const submitHandler = async () => {
    if (!token) {
      console.log("Please Login");
      navigate("/login");
    }
    try {
      const { data } = await axios.post("/api/v1/student/event_reg", {
        studentId: user._id,
        eventId: id,
      });
      if (data?.success) {
        toast.success("Enrolled in a event");
        navigate("/profile");
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

  const saveEvent = async () => {
    if (!token) {
      toast.error("Please Login");
      navigate("/login");
    }
    try {
      const { data } = await axios.post("/api/v1/student/save_event", {
        studentId: user._id,
        eventId: id,
      });
      if (data?.success) {
        toast.success("Event Saved");
        navigate("/test");
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
    <div className="w-[330px] bg-black rounded-3xl m-2 shadow-sm shadow-gray-200">
      <div className="flex flex-col p-4 shadow-2xl rounded-lg ">
        <img src={image} className="h-[200px] w-fit rounded-2xl " />
        <GoBookmark
          onClick={saveEvent}
          className="text-yellow-300 rounded-md  text-xl"
        />
        <table className="text-left m-3">
          <tr className="">
            <td className="text-lg font-extrabold">Event </td>
            <td className="text-lg font-extrabold ">:</td>
            <td className="text-sm font-semibold pl-2">{title}</td>
          </tr>
          <tr className="">
            <td className="text-lg font-extrabold">Venue </td>
            <td className="text-lg font-extrabold">:</td>
            <td className="text-sm font-semibold pl-2">{venue}</td>
          </tr>
          <tr className="">
            <td className="text-lg font-extrabold">Description</td>
            <td className="text-lg font-extrabold">:</td>
            <td className="text-sm font-semibold pl-2">{description}</td>
          </tr>
          <tr className="">
            <td className="text-lg font-extrabold">Date </td>
            <td className="text-lg font-extrabold">:</td>
            <td className="text-sm font-semibold pl-2">{date}</td>
          </tr>
        </table>
        <div className="flex text-sm p-4">
          <button
            onClick={submitHandler}
            className=" w-[120px] p-2 bg-yellow-300 hover:scale-95 text-black font-semibold rounded-md"
          >
            Register<span className="font-bold">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;