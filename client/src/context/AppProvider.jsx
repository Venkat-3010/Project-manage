import { useEffect, useState } from "react";
import { getTaskAnalytics, getTasks } from "../api/taskApi";
import { addPersons, getPeople } from "../api/userApi";
import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [filter, setFilter] = useState("This Week");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);

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

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await getPeople();
        console.log("Fetched people:", response);
        if (Array.isArray(response.people)) {
          setPeople(response.people);
        } else {
          console.error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    fetchPeople();
  }, []);

  const addPerson = async (email) => {
    // console.log("Adding person with email:", email);
    const response = await addPersons(email);
    if (response) {
      setPeople((prevPeople) => [...prevPeople, email]);
    }
    // console.log("response:", response, "people: ", people);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        analytics,
        filter,
        setFilter,
        loading,
        setLoading,
        people,
        addPerson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
