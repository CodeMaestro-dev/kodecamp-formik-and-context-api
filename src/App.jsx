import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./assets/auth/AuthContext";
import SignUp from "./assets/pages/SignUp";
import Login from "./assets/pages/Login";
import Dashboard from "./assets/pages/Dashboard";
import ProtectedRoute from "./assets/auth/ProtectedRoute";

export default function App() {
  return (
    <div className="bg-[#333333] h-screen flex justify-center">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}
