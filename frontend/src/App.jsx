import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurveyList from "./pages/SurveyList";
import CreateSurvey from "./pages/CreateSurvey";
import FillSurvey from "./pages/FillSurvey";
import DashB from "./pages/DashB";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute>
            <SurveyList />
          </ProtectedRoute>
        } />

        <Route path="/create" element={
          <ProtectedRoute>
            <CreateSurvey />
          </ProtectedRoute>
        } />

        <Route path="/fill/:id" element={<FillSurvey />} />

        <Route path="/dashboard/:id" element={
          <ProtectedRoute>
            <DashB />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
