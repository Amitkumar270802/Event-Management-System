import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../common/ErrorPage";
import { toast } from "react-toastify";

const MyEvents = () => {
  const { user } = useSelector((state) => state.profile);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const userId = user._id;
  const getEvents = async () => {
    try {
      const { data } = await axios.get(`/api/v1/student/student_reg/${userId}`);
      console.log("data :", data);

      if (data?.success) {
        setEvents(data.user.events);
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
    <div
      className="mx-auto flex flex-col justify-center items-center"
      data-aos="fade-up"
    >
      {events.length > 0 ? (
        <>
          <div className="w-11/12 flex flex-wrap gap-6 justify-start  max-h-[510px] overflow-y-scroll ">
            <div className="flex flex-wrap gap-5 ">
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
          </div>
        </>
      ) : (
        <div>
          <ErrorPage text={"Not Registered in any Event"} />
        </div>
      )}
    </div>
  );
};

export default MyEvents;
