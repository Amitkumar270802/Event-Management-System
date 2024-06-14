import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./SavedCard";
import { Link } from "react-router-dom";
import ErrorPage from "../common/ErrorPage";
import { ScrollLink } from "react-scroll";

const SavesEvents = () => {
  const { user } = useSelector((state) => state.profile);
  const [events, setEvents] = useState([]);
  const getSavedEvent = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/student/getSavedEvent/${user._id}`
      );
      console.log("data :", data);

      if (data?.success) {
        setEvents(data.user.saveEvents);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSavedEvent();
  }, []);
  return (
    <div className="mx-auto flex flex-col justify-center items-center w-11/12">
      {events.length > 0 ? (
        <>
          <div className=" flex flex-wrap gap-6 justify-start  p-4 rounded-2xl max-h-[510px] overflow-y-scroll ">
            {events.map((item, key) => {
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
        </>
      ) : (
        <div>
          <ErrorPage text={"No Events Found"} />
        </div>
      )}
    </div>
  );
};

export default SavesEvents;
