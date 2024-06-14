import React, { useState } from "react";

const Update = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    venue: "",
    date: "",
    image: "",
  });
  const changeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = () => {
    console.log(data);
  };
  return (
    <div className=" bg-slate-200 m-10 mt-0 ">
      <div className=" bg-black  text-white  p-4 text-center text-3xl flex justify-center flex-col  ">
        Update Event
      </div>
      <div className="h-[650px] w-full flex justify-center items-center">
        <div className="w-[400px] h-[370px] bg-gray-100 shadow-2xl p-4 flex flex-col gap-y-8">
          <div className="flex  justify-around ">
            <h1 className=" w-[120px] text-left">Event Name</h1>
            <input
              name="name"
              value={data.name}
              onChange={changeHandler}
              type="text"
              className="bg-transparent w-[180px] capitalize outline-none border-b-black border-b-2"
            />
          </div>
          <div className="flex justify-around">
            <h1 className=" w-[120px] text-left">Description</h1>
            <input
              name="description"
              value={data.description}
              onChange={changeHandler}
              type="text"
              className="bg-transparent w-[180px] capitalize outline-none border-b-black border-b-2"
            />
          </div>
          <div className="flex justify-around">
            <h1 className=" w-[120px] text-left">Venue</h1>
            <input
              name="venue"
              value={data.venue}
              onChange={changeHandler}
              type="text"
              className="bg-transparent w-[180px] capitalize outline-none border-b-black border-b-2"
            />
          </div>
          <div className="flex justify-around">
            <h1 className=" w-[120px] text-left">Date of Event</h1>
            <input
              name="date"
              value={data.date}
              onChange={changeHandler}
              type="text"
              className="bg-transparent w-[180px] capitalize outline-none border-b-black border-b-2"
            />
          </div>
          <div className="flex justify-around">
            <h1 className=" w-[120px] text-left">Upload image</h1>
            <input
              name="image"
              value={data.image}
              onChange={changeHandler}
              type="text"
              className="bg-transparent w-[180px] capitalize outline-none border-b-black border-b-2"
            />
          </div>
          <div className="flex text-sm p-4">
            <button
              onClick={submitHandler}
              className=" w-[120px] p-2 bg-black hover:bg-gray-800  text-white rounded-md"
            >
              send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
