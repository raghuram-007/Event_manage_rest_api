import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`events/${id}/`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (!event) return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-600 font-semibold">Event not found</p>
        <Link 
          to="/" 
          className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="p-8">
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              {event.title}
            </h2>
            
            {/* Event Meta Information */}
            <div className="flex flex-wrap gap-6 text-gray-700">
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <span className="text-blue-600">📅</span>
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                <span className="text-green-600">📍</span>
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About this event</h3>
            <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-6 rounded-xl border border-gray-200">
              {event.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate(`/register/${event.id}`)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register Now
            </button>
            
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:underline px-4 py-3 border border-gray-300 hover:border-blue-300 rounded-xl hover:bg-blue-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;