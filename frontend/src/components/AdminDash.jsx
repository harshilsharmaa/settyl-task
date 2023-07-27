import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import axios from "axios";
import { backendUrl } from "../constants";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";

const AdminDash = () => {
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [users, setUsers] = useState([]);
  const [allTasks, selectAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const {user} = useSelector((state)=>state.user.userInfo)

  const fetchAnalytics = async () => {
    const { data } = await axios.get(`${backendUrl}/api/admin/taskAnalytics`, {
      withCredentials: true,
    });
    // console.log(data.tasksInfo);


    // const output = [
    //   {date: '2023-07-27', count: 1},
    //   {date: '2023-07-24', count: 1},
    //   {date: '2023-07-26', count: 3}
    // ];

    // setBarData(formattedDataArray);
    setBarData(data.tasksInfo);
    setPieData(data.tasksStatusCount);
    setUsers(data.users);
    selectAllTasks(data.tasks);
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const [showCardIndex, setShowCardIndex] = useState(null);

  const expandHandler = (itemIndex) => {
    if (itemIndex === showCardIndex) {
      setShowCardIndex(null);
    } else {
      setShowCardIndex(itemIndex);
    }
  };

  const applyFilterHandler = (type) => {
    setActiveFilter(type);
    if (type === "All") {
      setTasks(allTasks);
    }
    if (type === "Pending") {
      setTasks(allTasks.filter((item) => item.status === "pending"));
    }
    if (type === "Done") {
      setTasks(allTasks.filter((item) => item.status === "done"));
    }
    if (type === "sortByDueDate") {
      const sortedTasks = allTasks.sort((a, b) => {
        return new Date(a.due_date) - new Date(b.due_date);
      });
      setTasks(sortedTasks);
    }
  };

  const updateUserRoleHandler =  async(user) => {
    const userRole = user.userRole === 'user' ? 'admin' : 'user';
    const {data} = await axios.patch(`${backendUrl}/api/admin/updateuserrole/${user._id}`, {userRole}, {withCredentials: true});

    setUsers(data.users);
  }

  return (
    <div className="bg-slate-100">
      <div className="w-8/12 m-auto flex items-center justify-between flex-col md:flex-row ">
        <div className="">
          <span>Task Status</span>
          {pieData ? <PieChart data={pieData} /> : null}
        </div>
        <div className="">
          <span className="">Tasks</span>
          {barData!==null ? (
            <LineChart data={barData} width={400} height={280} />
          ) : null}
        </div>
      </div>

      <div className="border-b-4 w-full mb-4"></div>

      <div className=" m-auto w-full flex flex-col justify-evenly md:flex-row">
        <div className="w-full flex flex-col  items-center md:w-9/12">
          <div className="w-full flex items-center justify-center p2">
            <button
              className={`${
                activeFilter === "All"
                  ? "bg-slate-500 text-white"
                  : "bg-slate-200 text-gray-800"
              } px-3 py-2 rounded-lg mx-2`}
              onClick={() => applyFilterHandler('All')}
            >
              All
            </button>
            <button
              className={`${
                activeFilter === "Pending"
                  ? "bg-slate-500 text-white"
                  : "bg-slate-200 text-gray-800"
              } px-3 py-2 rounded-lg mx-2`}
              onClick={() => applyFilterHandler('Pending')}
            >
              Pending
            </button>
            <button
              className={`${
                activeFilter === "Done"
                  ? "bg-slate-500 text-white"
                  : "bg-slate-200 text-gray-800"
              } px-3 py-2 rounded-lg mx-2`}
              onClick={() => applyFilterHandler('Done')}
            >
              Done
            </button>
            <button
              className={`${
                activeFilter === "sortByDueDate"
                  ? "bg-slate-500 text-white"
                  : "bg-slate-200 text-gray-800"
              } px-3 py-2 rounded-lg mx-2`}
              onClick={() => applyFilterHandler('sortByDueDate')}
            >
              Sort By Due Date
            </button>
          </div>

          <div className="w-full flex flex-col items-center h-80 overflow-y-scroll">


          {tasks?.length > 0
            ? tasks.map((item, index) => {
              return (
                  <TaskCard
                    key={item._id}
                    task={item}
                    expandHandler={expandHandler}
                    itemIndex={index}
                    expandedIndex={showCardIndex}
                    width={"w-10/12"}
                    />
                    );
                  })
                  : null}
                  </div>
        </div>
        <div className="w-full p-5 flex flex-col items-center md:w-6/12 ">
          <div className="bg-slate-200 w-full flex items-center justify-between p-2 border-b">
            <span>Name</span>
            <span>Tasks</span>
            <span>Role</span>
            <button>Make Admin</button>
          </div>
          <div className="w-full flex flex-col items-center h-80 overflow-y-scroll">

          {users?.length > 0
            ? users.map((item, index) => {
                return (
                  <div
                    key={item._id}
                    className="bg-red-200 w-full flex items-center justify-between p-2 border-b"
                  >
                    <span className="font-bold">{item.name} {item._id===user._id?'(me)':null}</span>
                    <span>{item.tasks.length}</span>
                    <span>{item.userRole}</span>
                    {
                      item._id===user._id?
                      <button disabled={true} className="bg-slate-300 rounded-lg px-2 py-1">Remove Admin</button>
                      :
                        <button className="bg-blue-300 rounded-lg px-2 py-1" onClick={()=>updateUserRoleHandler(item)}>{
                          item.userRole === 'user' ? 'Make Admin' : 'Remove Admin'
                        }
                    </button>
                    }
                  </div>
                );
              })
            : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
