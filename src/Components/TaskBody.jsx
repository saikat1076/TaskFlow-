import { useEffect, useState } from "react";
import useGetTask from "../hooks/useGotTasks";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropZone from "./TaskColumn";
import Modal from "./Modal";

const TaskBody = () => {
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const { data, refetch } = useGetTask();
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState(null);

  // Categorize tasks whenever `data` changes
  useEffect(() => {
    if (data) {
      const todos = data.filter((task) => task.category === "todo");
      const inProgress = data.filter((task) => task.category === "progress");
      const completed = data.filter((task) => task.category === "done");

      setTodo(todos);
      setProgress(inProgress);
      setDone(completed);
    }
  }, [data]); // Only depend on `data`

  const handleDrop = async (id, newCategory) => {
    if (!id) {
      console.error("Error: Undefined ID received!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/updateCategory/${id}`, {
        category: newCategory,
      });

      console.log("Task Moved Response:", response.data);
      toast.success("Task moved successfully!");
      refetch(); // Refetch tasks after moving
    } catch (error) {
      console.error("Axios Error:", error.response?.data || error.message);
      toast.error("Failed to move task!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/tasks/${id}`);
      if (data.deletedCount > 0) {
        toast.success("Task deleted successfully");
        refetch(); // Refetch tasks after deletion
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      toast.error("Failed to delete task");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/tasks/${id}`);
      if (data) {
        setIsOpen(true);
        setTask(data);
      }
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      toast.error("Failed to fetch task");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Task Management Board
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DropZone
          category="todo"
          tasks={todo}
          onDrop={handleDrop}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
        <DropZone
          category="progress"
          tasks={progress}
          onDrop={handleDrop}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
        <DropZone
          category="done"
          tasks={done}
          onDrop={handleDrop}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>

      {task && <Modal task={task} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <ToastContainer />
    </div>
  );
};

export default TaskBody;