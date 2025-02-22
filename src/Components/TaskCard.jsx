/* eslint-disable react/prop-types */
import { useDrag } from "react-dnd";

const TaskCard = ({ task, handleDelete, handleUpdate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, category: task.category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  
  const getCardColor = (id) => {
    const colors = [
      "bg-gradient-to-r from-pink-100 to-purple-100",
      "bg-gradient-to-r from-blue-100 to-cyan-100",
      "bg-gradient-to-r from-green-100 to-teal-100",
      "bg-gradient-to-r from-yellow-100 to-orange-100",
      "bg-gradient-to-r from-indigo-100 to-blue-100",
    ];
    const index = id.charCodeAt(0) % colors.length; 
    return colors[index];
  };

  return (
    <div
      ref={drag}
      className={`relative w-full p-4 rounded-xl shadow-lg transition-all duration-300 
        ${isDragging ? "opacity-50 scale-95" : "hover:shadow-xl hover:scale-105"}
        ${getCardColor(task._id)} // Apply unique background color
      `}
    >

      <div>
        <h1 className="text-lg font-semibold text-gray-900">{task?.title}</h1>
        <p className="text-gray-600 mt-1 text-sm">{task?.description}</p>
        <p className="text-xs text-gray-500 mt-2">📅 {formatDate(task?.createdAt)}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleUpdate(task._id)}
          className="flex-1 p-2 rounded-lg bg-white/80 backdrop-blur-md text-sm font-medium text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-md"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="flex-1 p-2 rounded-lg bg-white/80 backdrop-blur-md text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-200 shadow-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;