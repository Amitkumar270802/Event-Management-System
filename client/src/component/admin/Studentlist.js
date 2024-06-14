import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Studentlist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/event/event_reg/${id}`);
      if (data) {
        setUser(data.event);
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
    getUser();
  }, []);
  return (
    <div className="bg-black mx-auto flex justify-center items-center h-screen ">
      <div className=" rounded-xl p-2 flex flex-col gap-4 text-[#f1f2ff] justify-center items-center">
        <h1 className="text-md font-semibold p-2  text-center rounded-3xl">
          {user.title}
        </h1>
        <div className="bg-[#161d29] p-4 rounded-2xl h-[540px]">
          <table className=" w-full text-white flex gap-5 p-1 justify-between flex-col ">
            <thead className=" bg-black  p-3 w-full flex justify-between rounded-xl">
              <td className="min-w-[200px]">Student's Name</td>
              <td className="min-w-[200px]">Email</td>
              <td className="min-w-[200px]">Registration No.</td>
              <td className="min-w-[200px]">Phone </td>
            </thead>
            <tbody className="max-h-[540px] ">
              {user.users &&
                user.users.map((item, key) => {
                  return (
                    <tr key={key} className="w-full flex justify-between ">
                      <td className="min-w-[200px]">{item.name}</td>
                      <td className="min-w-[200px]">{item.email}</td>
                      <td className="min-w-[200px]">{item.reg_no}</td>
                      <td className="min-w-[200px]">{item.phone}</td>
                    </tr>
                  );
                })}
            </tbody>
            <div className="flex text-sm  ">
              <button
                onClick={() => navigate("/admin/all-events")}
                className=" min-w-[100px] p-2 bg-yellow-300 text-black hover:scale-95  font-semibold rounded-md"
              >
                Close
              </button>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Studentlist;
