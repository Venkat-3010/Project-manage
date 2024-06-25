import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  if (isLoggedIn === null) {
    return <Loader />;
  }

  return isLoggedIn ? <Component /> : null;
};

export default ProtectedRoute;
