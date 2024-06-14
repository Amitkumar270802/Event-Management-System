import React from "react";
import { GoIssueClosed } from "react-icons/go";
const Message_Card = ({ name, college, phone, message, status }) => {
  return (
    <div className="p-4 relative ">
      <div className="flex justify-end absolute right-12 top-1">
        <GoIssueClosed className="text-xl  text-white hover:text-black rounded-full cursor-pointer hover:bg-green-300" />
      </div>
      <div className="w-11/12 bg-[#161d29] min-h-[100px] max-h-[140px] p-2 border border-emerald-500 shadow-md shadow-white">
        <div className="p-2 flex justify-between items-center font-semibold bg-black text-gray-100 rounded-md  ">
          <div>{name}</div>|<div>{phone}</div>|<div>{college}</div>|<div></div>
        </div>
        <div className="p-2 text-gray-300">{message}</div>
      </div>
    </div>
  );
};

export default Message_Card;
