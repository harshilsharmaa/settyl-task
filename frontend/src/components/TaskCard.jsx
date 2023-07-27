import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus, fetchAllTasks, deleteTask } from "../slices/taskSlice";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskCard = ({ itemIndex, expandedIndex, task, expandHandler, width }) => {
  const { user } = useSelector((state) => state.user.userInfo);

  const { taskUpdateInfo } = useSelector((state) => state.tasks);

  const [showUpdateTaskModal, setshowUpdateTaskModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(taskUpdateInfo){
      expandHandler(null);
      dispatch(fetchAllTasks());
    }
  }, [taskUpdateInfo]);

  const updateTaskStatusHandler = (taskId, status) => {
    dispatch(updateTaskStatus({taskId, status}));
  }

  const deleteTaskHandler = (taskId) => {
    dispatch(deleteTask(taskId));
  }
// w-7/12
  return (
    <div className={`${width} p-3 my-1 rounded-lg bg-gradient-to-r from-red-200 to-pink-200 flex flex-col items-center shadow-md`}>
      <div
        onClick={() => expandHandler(itemIndex)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <h1 className="text-xl font-semibold">{task.title}</h1>
        <div className="flex flex-col">
          <span className="text-sm">
            Assigned to: {task.assigned_user.name}
          </span>
          <span className="text-sm">
            Status: {task.status}
          </span>
          <span className="text-sm">Due date: {task.due_date}</span>
        </div>
        <div className="text-2xl transform transition-transform rotate-[0deg]">
          {itemIndex === expandedIndex ? "🔼" : "🔽"}
        </div>
      </div>

      {itemIndex === expandedIndex && (
        <div className="w-full mt-2 bg-white rounded-lg p-3">
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{task.description}</p>
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span>Created By: {task.created_by_user.name}</span>
            <span>Created At: {task.created_at}</span>
          </div>
          <div className="w-full flex justify-end mt-3">
            {task.assigned_user._id === user._id &&
            task.created_by_user !== user._id && task.status!=='done' ? (
              <button
                onClick={() =>updateTaskStatusHandler(task._id, 'done')}
               className="px-3 py-1 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600">
                Mark as Done
              </button>
            ) 
            : task.created_by_user === user._id ?
            (
              <>
                <button onClick={()=>setshowUpdateTaskModal(true)} className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600">
                  Edit
                </button>
                <button onClick={()=>deleteTaskHandler(task._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Delete
                </button>
              </>
            )
            :null
          }
          </div>
        </div>
      )}

      {
        showUpdateTaskModal && <UpdateTaskModal task={task} isOpen={showUpdateTaskModal} setshowUpdateTaskModal={setshowUpdateTaskModal} />
      }
    </div>
  );
};

export default TaskCard;
