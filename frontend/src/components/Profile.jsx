import { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CreateTaskModal from './CreateTaskModal'

const Profile = () => {

  const { userInfo } = useSelector((store) => store.user);
  console.log(userInfo)

  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCreateTaskModal, setshowCreateTaskModal] = useState(false);

  useEffect(() => {
    setTasks(userInfo?.user?.tasks);
  }, [userInfo])

  const [showCardIndex, setShowCardIndex] = useState(null);

  const expandHandler = (itemIndex) => {
    if(itemIndex===showCardIndex){
      setShowCardIndex(null);
    }
    else{
      setShowCardIndex(itemIndex);
    }
  }

  if(tasks.length===0){
    return (
      <h1>Loading</h1>
    )
  }


  return (
    <div className="">
      <div className="border-b-2">
        <button onClick={()=>setshowCreateTaskModal(true)} className="m-4 bg-red-600 rounded-lg py-3 px-5 text-white text-xl">Create Task +</button>
        <div className="flex justify-center space-x-4 mt-4">
      <button
        className={`px-4 py-2 rounded-md focus:outline-none ${
          activeFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
        }`}

      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded-md focus:outline-none ${
          activeFilter === 'My Tasks' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
        }`}

      >
        My Tasks
      </button>
      <button
        className={`px-4 py-2 rounded-md focus:outline-none ${
          activeFilter === 'Assigned to Me' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
        }`}

      >
        Assigned to Me
      </button>
    </div>
      </div>

      <div className='overflow-auto flex flex-col items-center '>

        {
          tasks.map((item, index) => {
            return (
              <TaskCard key={item._id} task={item} expandHandler={expandHandler} itemIndex={index} expandedIndex={showCardIndex}/>
            )
          })
        }
      </div>

      {
        showCreateTaskModal ?<CreateTaskModal setshowCreateTaskModal={setshowCreateTaskModal}  users={["aasd", "asd"]}/> :null
      }
    </div>
  )
}

export default Profile