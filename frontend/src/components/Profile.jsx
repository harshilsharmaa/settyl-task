import { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import { useSelector, useDispatch } from 'react-redux'
import CreateTaskModal from './CreateTaskModal'
import {fetchAllTasks} from '../slices/taskSlice';

const Profile = () => {

  const { userInfo } = useSelector((store) => store.user);

  const { tasksInfo } = useSelector((store) => store.tasks);


  const [tasks, setTasks] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCreateTaskModal, setshowCreateTaskModal] = useState(false);

  useEffect(() => {
    setTasks(tasksInfo?.tasks);
  }, [tasksInfo])

  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("called")
    dispatch(fetchAllTasks());
  }, [])

  const [showCardIndex, setShowCardIndex] = useState(null);

  const expandHandler = (itemIndex) => {
    if (itemIndex === showCardIndex) {
      setShowCardIndex(null);
    }
    else {
      setShowCardIndex(itemIndex);
    }
  }

  const applyFilterHandler = (type) => {
    setActiveFilter(type);
    if (type === 'All') {
      setTasks(tasksInfo?.tasks);
    }
    else if (type === 'My Tasks') {
      setTasks(tasksInfo?.tasks.filter((item) => item.created_by_user === userInfo.user._id));
    }
    else if (type === 'Assigned to Me') {
      setTasks(tasksInfo?.tasks.filter((item) => item.assigned_user._id === userInfo.user._id));
    }
    else if (type === 'Done') {
      setTasks(tasksInfo?.tasks.filter((item) => item.status === 'done'));
    }
  }


  return (
    <div className="">
      <div className="">
        <div className='flex justify-between'>
          <button onClick={() => setshowCreateTaskModal(true)} className="m-4 bg-red-600 rounded-lg py-3 px-5 text-white text-xl ">Create Task +</button>
          <h3 className='m-4 font-bold text-2xl'>Hy, {userInfo.user.name}</h3>
        </div>
        <div className="flex justify-center space-x-4 items-center">
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${activeFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            onClick={() => applyFilterHandler('All')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${activeFilter === 'My Tasks' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            onClick={() => applyFilterHandler('My Tasks')}
          >
            My Tasks
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${activeFilter === 'Assigned to Me' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            onClick={() => applyFilterHandler('Assigned to Me')}
          >
            Assigned to Me
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${activeFilter === 'Done' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            onClick={() => applyFilterHandler('Done')}
          >
            Done
          </button>
        </div>
      </div>

      {
        !tasks ? <h1>Loading</h1>
          : tasks.length === 0 ? <h1>No Tasks</h1>
            :
            <div className='overflow-auto flex flex-col items-center '>

              {
                tasks.map((item, index) => {
                  return (
                    <TaskCard key={item._id} task={item} expandHandler={expandHandler} itemIndex={index} expandedIndex={showCardIndex} width={'w-7/12'} />
                  )
                })
              }
            </div>
      }


      {
        showCreateTaskModal ? <CreateTaskModal setshowCreateTaskModal={setshowCreateTaskModal} /> : null
      }
    </div>
  )
}

export default Profile