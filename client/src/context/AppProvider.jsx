import { useEffect, useState } from "react";
import { getTaskAnalytics, getTasks } from "../api/taskApi";
import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [filter, setFilter] = useState("This Week");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const taskData = await getTasks(filter);
      setTasks(taskData);
      setLoading(false);
    };

    fetchTasks();
  }, [filter]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const analyticsData = await getTaskAnalytics();
      setAnalytics(analyticsData);
      setLoading(false);
    };

    fetchAnalytics();
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{ tasks, analytics, filter, setFilter, loading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
