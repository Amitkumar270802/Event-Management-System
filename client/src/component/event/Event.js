import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import ErrorPage from "../common/ErrorPage";
import { toast } from "react-toastify";
// import coding from "../../Assets/coding.png";
const Event = () => {
  const [event, setEvent] = useState([]);
  const getEvents = async () => {
    try {
      const { data } = await axios.get("/api/v1/event/all-event");
      console.log(data);
      if (data?.success) {
        setEvent(data.events);
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

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex bg-[#000814] min-h-screen text-gray-300">
      {event.length > 0 ? (
        <div className="flex flex-wrap justify-start gap-5 p-4 mt-[80px]">
          {event.map((item, key) => {
            return (
              <div key={key}>
                <Card
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  college={item.college}
                  venue={item.venue}
                  date={item.date}
                  id={item._id}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <ErrorPage text={"No Event Found"} />
        </div>
      )}
    </div>
  );
};

export default Event;
