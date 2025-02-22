import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetTask from "../hooks/useGotTasks";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("todo");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, isFetching } = useGetTask();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length > 50) {
      return toast.error("Title must not exceed 50 characters.");
    }
    if (description.length > 200) {
      return toast.error("Description must not exceed 200 characters.");
    }

    const newTask = {
      title,
      email: user?.email,
      description,
      category,
      createdAt: new Date(),
    };

    try {
      const { data } = await axiosSecure.post("/tasks", newTask);
      if (data.insertedId) {
        toast.success("Task added successfully!");
        refetch();
        setTitle("");
        setDescription("");
        setCategory("todo");
      }
    } catch (error) {
      toast.error("Failed to add task.");
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Add a New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-lg bg-white"
        />
        <textarea
          placeholder="Description (optional)"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-lg bg-white resize-none min-h-[100px]"
        />
        <div className="flex items-center gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-lg bg-white flex-1"
          >
            <option value="todo">To-Do</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            disabled={isFetching}
            className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all flex-1 text-lg font-semibold"
          >
            {isFetching ? "Adding Task..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;