

const TaskCard = ({itemIndex, expandedIndex, task, expandHandler}) => {

  return (
    <div className="w-7/12 p-3 my-1 rounded-lg bg-gradient-to-r from-red-200 to-pink-200 flex flex-col items-center shadow-md">
  <div onClick={() => expandHandler(itemIndex)} className="w-full flex items-center justify-between cursor-pointer">
    <h1 className="text-xl font-semibold">{task.title}</h1>
    <div className="flex flex-col">
      <span className="text-sm">Assigned to: {task.assigned_user}</span>
      <span className="text-sm">Status: pending</span>
      <span className="text-sm">Due date: 20/03/2023</span>
    </div>
    <div className="text-2xl transform transition-transform rotate-[0deg]">
      {itemIndex === expandedIndex ? '🔼' : '🔽'}
    </div>
  </div>

  {itemIndex === expandedIndex && (
    <div className="w-full mt-2 bg-white rounded-lg p-3">
      <div>
        <h3 className="font-semibold">Description:</h3>
        <p>{task.description}</p>
      </div>
      <div className="flex justify-between mt-3 text-sm">
        <span>Created By: Harshil</span>
        <span>Created At: 23/03/2333</span>
      </div>
      <div className="w-full flex justify-end mt-3">
        <button className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600">Edit</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
      </div>
    </div>
  )}
</div>
  )

}

export default TaskCard