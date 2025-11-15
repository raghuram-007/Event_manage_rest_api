import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("events/");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          All Events
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing events and experiences waiting for you
        </p>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group"
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Event Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {event.title}
                </h3>
                
                {/* Event Description */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
                
                {/* Event Meta Information */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-700">
                    <span className="text-blue-500 mr-3">📅</span>
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">📍</span>
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link 
                  to={`/events/${event.id}`}
                  className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform group-hover:-translate-y-1 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View Details
                  <svg 
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 max-w-md mx-auto">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-600 text-lg font-medium mb-4">No events available</p>
            <p className="text-gray-500 mb-6">
              Check back later for new events and experiences
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;