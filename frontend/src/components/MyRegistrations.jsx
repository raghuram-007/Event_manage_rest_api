import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get("my-registrations/");
        setRegistrations(response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setMessage("❌ Failed to load your registrations.");
      }
    };
    if (token) fetchRegistrations();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this registration?")) return;

    try {
      await api.delete(`registrations/${id}/delete/`);
      setRegistrations(registrations.filter((reg) => reg.id !== id));
      setMessage("✅ Registration cancelled successfully!");
    } catch (error) {
      console.error("Error deleting registration:", error);
      setMessage("❌ Failed to cancel registration.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <span className="text-2xl text-white">🎟️</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            My Registrations
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Manage your event registrations and attendance
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-8 p-4 rounded-2xl border ${
            message.includes("❌") 
              ? "bg-red-50 border-red-200 text-red-700" 
              : "bg-green-50 border-green-200 text-green-700"
          } transition-all duration-300`}>
            <div className="flex items-center justify-center">
              <span className="text-lg mr-3">{message.includes("❌") ? "❌" : "✅"}</span>
              <p className="font-medium">{message.replace("❌", "").replace("✅", "")}</p>
            </div>
          </div>
        )}

        {/* Registrations List */}
        {registrations.length > 0 ? (
          <div className="grid gap-6">
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 group"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Registration Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {reg.event_title}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-gray-700">
                          <span className="text-blue-500 mr-3">👤</span>
                          <span className="font-medium">{reg.name}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-500 mr-3">📧</span>
                          <span className="font-medium truncate">{reg.email}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-500 mr-3">📞</span>
                          <span className="font-medium">{reg.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="text-orange-500 mr-3">🕒</span>
                          <span className="text-sm">
                            {new Date(reg.registered_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleDelete(reg.id)}
                        className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 min-w-[120px]"
                      >
                        <svg 
                          className="w-4 h-4 mr-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">📭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Registrations</h3>
              <p className="text-gray-600 mb-6">
                You haven't registered for any events yet. Explore our events to get started!
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;