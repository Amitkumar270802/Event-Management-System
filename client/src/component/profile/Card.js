import React from "react";

const Card = ({ title, description, image, venue, date }) => {
  return (
    <div className="bg-black p-2 rounded-2xl">
      <div className="h-[190px] bg-purple-950 rounded-2xl drop-shadow-2xl">
        <div
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className={` relative  rounded-2xl text-sm  h-[105px] w-[320px] flex justify-between`}
        >
          <div className=" absolute top-[90px] rounded-2xl w-full ">
            <div className="text-center flex flex-col gap-2 text-white font-semibold  backdrop-blur-3xl p-2">
              <h1>Event Name : {title}</h1>
              <h1> Date : {date}</h1>
              <h1>Venue : {venue}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
