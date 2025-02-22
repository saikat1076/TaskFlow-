import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetTask from "../hooks/useGotTasks";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Modal = ({ isOpen, setIsOpen, task }) => {
  const { refetch } = useGetTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const axiosSecure = useAxiosSecure();

  // Set initial values when the task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title length
    if (title.length > 50) {
      return toast.error("Title must not exceed 50 characters.");
    }

    // Validate description length
    if (description.length > 200) {
      return toast.error("Description must not exceed 200 characters.");
    }

    try {
      const updateTask = { title, description, createdAt: new Date() };
      const { data } = await axiosSecure.put(`/tasks/${task._id}`, updateTask);

      if (data.modifiedCount > 0) {
        toast.success("Task updated successfully!");
        setIsOpen(false);
        refetch(); // Refetch tasks after update
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  return (
    <dialog open={isOpen} className="modal bg-black/50 backdrop-blur-sm">
      <div className="modal-box bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Description (optional)"
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </form>
    </dialog>
  );
};

export default Modal;