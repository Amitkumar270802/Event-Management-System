import axios from "axios";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import ConfirmModal from "../Modal/ConfirmModal";

const Card = ({ description, title, id, venue, date, image }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const editEvent = () => {
    navigate(`/admin/update-event/${id}`, {
      state: { description, title, venue, date, image },
    });
  };

  const list = async () => {
    try {
      const { data } = await axios.get(`/api/v1/event/event_reg/${id}`);
      if (data.success) {
        setUser(data.event.users);
        navigate(`/admin/student-list/${id}`);
        console.log(data.event.users);
        console.log("List Recieved");
      }
    } catch (err) {}
  };
  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/event/delete-event/${id}`);
      if (data.success) console.log("Event Delete Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-white ">
      <div className="w-[330px] shadow-sm shadow-gray-300 bg-black rounded-3xl m-2">
        <div className="flex flex-col p-4 shadow-2xl rounded-lg ">
          <img src={image} className="h-[200px] w-fit rounded-2xl " />

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
          <div className="flex justify-center gap-4 p-4 bg-yellow-300 text-black rounded-3xl">
            <PiUsersThreeBold
              onClick={list}
              className="hover:scale-75 rounded-full border p-[1px] border-black"
            />
            <FaRegEdit onClick={editEvent} className="hover:scale-75" />
            <RiDeleteBin6Line
              onClick={deleteHandler}
              className="hover:scale-75"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
