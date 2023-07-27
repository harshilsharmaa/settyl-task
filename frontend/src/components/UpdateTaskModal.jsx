import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../slices/taskSlice';

const UpdateTaskModal = ({task, isOpen, setshowUpdateTaskModal }) => {

  const {users} = useSelector((store)=>store.user.allUsers);

  const {taskUpdateInfo, loading} = useSelector((store)=>store.tasks);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [assignedTo, setAssignedTo] = useState(task.assigned_user._id);

  const dispatch = useDispatch();

  const handleUpdateTask = () => {

    const due_date = dueDate;
    const assigned_user_id = assignedTo;
    const data = {title, description, due_date, assigned_user_id}
    dispatch(updateTask({data, taskId: task._id}))
  };

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center `}>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="w-6/12 bg-white p-4 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            required="true"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            required="true"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Due Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={dueDate}
            required="true"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Assigned To</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={assignedTo}
            required="true"
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={handleUpdateTask}
          >
            Update
          </button>
          <button onClick={()=>setshowUpdateTaskModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;