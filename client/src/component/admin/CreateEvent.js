import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateEvent = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    venue: "",  
    date: "",
    image: "",
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
      if (data?.success) {
        toast.success("Event Created");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data.message;
        // alert(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error(err);
      }
    }
  };

  const cancleHandler = () => {
    navigate("/admin/all-events");
  };

  return (
    <div className="flex justify-center mx-auto items-center h-screen bg-black ">
      <div className="bg-[#161d29] rounded-xl p-4  text-[#f1f2ff] w-5/12">
        <h1 className="text-2xl font-semibold p-4 text-center q">
          Event Information
        </h1>
        <div className="flex justify-evenly ">
          <div className="flex flex-col">
            <h2 className="text-left p-2">Event Name</h2>
            <input
              type="text"
              name="event"
              value={input.event}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">Description</h2>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
            />
          </div>
        </div>
        <div className="flex justify-evenly ">
          <div className="flex flex-col">
            <h2 className="text-left p-2">Date of Event</h2>
            <input
              type="text"
              name="date"
              value={input.date}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">Venue</h2>
            <input
              type="text"
              name="venue"
              value={input.venue}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-[250px] rounded-lg text-[#999daa] "
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-left p-2">Upload Image Link</h2>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={changeHandler}
            className="bg-[#2c333f] p-2 w-full rounded-lg text-[#999daa] "
          />
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
            <button
              onClick={cancleHandler}
              className=" bg-[#2c333f] w-[80px] p-2  text-white hover:scale-95   font-semibold rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
