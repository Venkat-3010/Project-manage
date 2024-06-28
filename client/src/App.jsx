import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import AppProvider from "./context/AppProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedInterface from "./components/SharedInterface/SharedInterface";
import InterfacePage from "./pages/InterfacePage/InterfacePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/board"
            element={<ProtectedRoute Component={BoardPage} />}
          />
          <Route
            path="/analytics"
            element={<ProtectedRoute Component={AnalyticsPage} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute Component={SettingsPage} />}
          />
          <Route path="/shared/:id" element={<InterfacePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
