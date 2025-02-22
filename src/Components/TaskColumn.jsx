import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const TaskColumn = ({ category, tasks, setTasks, onDrop, handleDelete, handleUpdate }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item.id, category);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTask = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div
      ref={drop}
      className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
        isOver ? "bg-green-50 border-2 border-green-300" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      {/* Column Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              index={index}
              moveTask={moveTask}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;