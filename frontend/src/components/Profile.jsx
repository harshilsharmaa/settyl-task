import TaskCard from './TaskCard'

const Profile = () => {
  return (
    <div className="">
        <div className="border-b-2">
            <button className="m-4 bg-red-600 rounded-lg py-3 px-5 text-white text-xl">Create Task +</button>
        </div>

        <div className='overflow-auto flex flex-col items-center '>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
        </div>
    </div>
  )
}

export default Profile