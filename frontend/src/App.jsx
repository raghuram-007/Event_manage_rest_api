import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import RegistrationForm from "./components/RegistrationForm";
import MyRegistrations from "./components/MyRegistrations";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // for redirect after logout

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>🎫</span> Event Registration System
          </h1>

          <nav className="flex items-center gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
              Events
            </Link>
            {token && (
              <Link
                to="/my-registrations"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                My Registrations
              </Link>
            )}
            {token ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/register/:id" element={<RegistrationForm />} />
          <Route
            path="/my-registrations"
            element={token ? <MyRegistrations /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

// Wrap App in Router in index.js
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
