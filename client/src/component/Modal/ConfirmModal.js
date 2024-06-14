import axios from "axios";
import React, { useState } from "react";

const ConfirmModal = ({ image, title, venue, date, description }) => {
  const [input, setInput] = useState({
    title: title,
    description: description,
    venue: venue,
    date: date,
    image: image,
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
      const { data } = await axios.post("/api/v1/event/create-event", {
        title: input.title,
        description: input.description,
        venue: input.venue,
        date: input.date,
        image: input.image,
      });
      if (data?.success) console.log("Event Created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="bg-black-100 m-10  w-7/12 ">
        <div className="bg-[#161d29] rounded-xl p-4  text-[#f1f2ff] ">
          <h1 className="text-2xl font-semibold p-8 text-left">
            Event Information
          </h1>
          <div className="flex justify-evenly pb-2">
            <div className="flex flex-col">
              <h2 className="text-left p-2">Event Name</h2>
              <input
                type="text"
                name="event"
                value={input.event}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">Description</h2>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
              />
            </div>
          </div>
          <div className="flex justify-evenly pb-2">
            <div className="flex flex-col">
              <h2 className="text-left p-2">Date of Event</h2>
              <input
                type="text"
                name="date"
                value={input.date}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-left p-2">Venue</h2>
              <input
                type="text"
                name="venue"
                value={input.venue}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
              />
            </div>
          </div>
          <div className="ml-4">
            <div className="flex flex-col">
              <h2 className="text-left p-2">Upload Image Link</h2>
              <input
                type="text"
                name="image"
                value={input.image}
                onChange={changeHandler}
                className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
              />
            </div>
          </div>
          <div className="flex ">
            <div className="flex text-sm p-4 gap-4">
              <button
                onClick={submitHandler}
                className="  p-2 bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md"
              >
                Create Event
              </button>
            </div>
            <div className="flex text-sm p-4 gap-4">
              <button className=" bg-[#2c333f] w-[80px] p-2  text-white hover:scale-95   font-semibold rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
