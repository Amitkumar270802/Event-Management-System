import axios from "axios";
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { description, title, venue, date } = location.state;
  const { id } = useParams();
  console.log(id);
  const [input, setInput] = useState({
    title: title,
    description: description,
    venue: venue,
    date: date,
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
      const { data } = await axios.put(`/api/v1/event/update-event/${id}`, {
        title: input.title,
        description: input.description,
        venue: input.venue,
        date: input.date,
      });
      if (data?.success) {
        toast.success("Event Updated");
        navigate("/admin/all-events");
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

  return (
    <div className="bg-black h-screen flex justify-center items-center ">
      <div className="bg-[#161d29] rounded-xl p-4  text-[#f1f2ff] w-6/12">
        <h1 className="text-2xl font-semibold p-8 text-left">Update Event</h1>
        <div className="flex justify-evenly pb-2">
          <div className="flex flex-col">
            <h2 className="text-left p-2">Event Name</h2>
            <input
              name="title"
              value={input.title}
              onChange={changeHandler}
              type="text"
              className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-left p-2">Description</h2>
            <input
              name="description"
              value={input.description}
              onChange={changeHandler}
              type="text"
              className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
            />
          </div>
        </div>
        <div className="flex justify-evenly pb-2">
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
          <div className="flex flex-col">
            <h2 className="text-left p-2">Date</h2>
            <input
              type="text"
              name="date"
              value={input.date}
              onChange={changeHandler}
              className="bg-[#2c333f] p-2 w-[300px] rounded-lg text-[#999daa] "
            />
          </div>
        </div>

        <div className="flex p-8">
          <div className="flex text-sm p-4">
            <button
              onClick={submitHandler}
              className="  p-2 bg-yellow-300 text-black hover:scale-95   font-semibold rounded-md"
            >
              Update Event
            </button>
          </div>
          <div className="flex text-sm p-4">
            <button
              onClick={() => navigate("/admin/all-events")}
              className=" w-[120px] p-2 bg-black hover:bg-gray-800  text-white rounded-md"
            >
              Canel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
