import axios from "axios";
import React, { useEffect, useState } from "react";

import Card from "./Card";
const AllEvent = () => {
  const [event, setEvent] = useState([]);
  const getEvents = async () => {
    try {
      const { data } = await axios.get("/api/v1/event/all-event");
      console.log(data);
      if (data?.success) {
        setEvent(data.events);
      }
    } catch (err) {
      console.log("server Error");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex bg-[#000814] min-h-screen">
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
        <div className="w-screen flex items-center text-white p-10 rounded-2xl justify-center">
          <div className="flex flex-col flex-wrap gap-5 ">
            <div className="text-xl">No Event Found</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEvent;
