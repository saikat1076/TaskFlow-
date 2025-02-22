import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useGotTasks = () => {
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    isFetching,
    data = [],
    refetch,
    error, 
  } = useQuery({
    queryKey: ["tasks", user?.email], 
    queryFn: async () => {
      if (!user?.email) return []; 
      try {
        const { data } = await axios.get(
          `https://task-flow-server-peach.vercel.app/tasks?email=${user.email}`
        );
        return data;
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        throw new Error("Failed to fetch tasks");
      }
    },
    enabled: !!user?.email, 
  });

  return { isLoading, data, refetch, isFetching, error }; 
};

export default useGotTasks;