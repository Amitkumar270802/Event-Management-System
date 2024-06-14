import axios from "axios";
import React, { useEffect, useState } from "react";
import Message_Card from "./Message_Card";

const Messages = () => {
  const [mess, setMess] = useState([]);
  const getMessages = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/getallmessage");
      console.log(data);
      if (data?.success) {
        setMess(data.newMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div className="min-h-screen bg-black m-auto">
      <table className="flex justify-stretch items-start flex-wrap gap-1 pt-20">
        {mess &&
          mess.map((item, key) => {
            return (
              <div key={key} className="w-[540px]">
                <Message_Card
                  name={item.name}
                  college={item.college}
                  phone={item.phone}
                  message={item.message}
                  status={item.status}
                />
              </div>
            );
          })}
      </table>
    </div>
  );
};

export default Messages;
