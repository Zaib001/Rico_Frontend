// src/components/MatchResultCard.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://rico-app-backend.onrender.com");

const MatchResultCard = ({ profile, onDismiss }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isBlocked, setIsBlocked] = useState(profile.user.isBlocked || false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportComment, setReportComment] = useState("");
  const token = localStorage.getItem("token");

  if (!profile) {
    console.error("Profile prop is missing or invalid");
    return null;
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleBlockToggle = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (isBlocked) {
        await axios.post(`https://rico-app-backend.onrender.com/api/users/unblock-user/${profile.user._id}`, {}, { headers });
        setIsBlocked(false);
        alert("User unblocked successfully");
      } else {
        await axios.post(`https://rico-app-backend.onrender.com/api/users/block-user/${profile.user._id}`, {}, { headers });
        setIsBlocked(true);
        alert("User blocked successfully");
      }
    } catch (error) {
      console.error("Error toggling block status:", error);
      alert("Failed to change block status");
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(profile.user._id);
    }
  };

  const handleReport = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        `https://rico-app-backend.onrender.com/api/users/report-user/${profile.user._id}`,
        { reportReason: reportComment },
        { headers }
      );
      alert("User reported successfully");
      setShowReportModal(false);
      setReportComment("");
    } catch (error) {
      console.error("Error reporting user:", error);
      alert("Failed to report user");
    }
  };

  const handleLike = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(`https://rico-app-backend.onrender.com/api/users/like-user/${profile.user._id}`, {}, { headers });
      socket.emit("likeNotification", { senderId: "YourUserId", receiverId: profile.user._id });
      alert("User liked successfully");
    } catch (error) {
      console.error("Error liking user:", error);
      alert("Failed to like user");
    }
  };

  return (
    <div className={`relative border-2 border-lime-400 rounded-lg bg-black text-white p-4 mb-6 ${showDetails ? 'h-auto' : 'h-80'}`}>
      <img
        src={profile.user.profilePicture}
        alt={profile.user.name}
        className="w-full h-64 object-cover rounded-t-lg mb-4"
      />
      <div className="px-2 space-y-2">
        <h2 className="text-xl font-bold">{profile.user.name}</h2>
        <p className="text-sm text-gray-300">Distance: {profile.distance} Miles</p>
        <p className="text-sm font-bold">
          Ranked {profile.rank} of {profile.totalMatches}
        </p>
        <p className="text-lg font-semibold text-lime-400">
          {Math.round(profile.matchScore)}% Match
        </p>
      </div>
      <div className="flex justify-between mt-4 space-x-2">
        <button className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded" onClick={handleLike}>
          LiiQ
        </button>
        <button
          className="flex-1 bg-blue-500 text-white font-bold py-2 rounded"
          onClick={toggleDetails}
        >
          {showDetails ? 'Hide Details' : 'Details'}
        </button>
        <button
          className="flex-1 bg-red-500 text-white font-bold py-2 rounded"
          onClick={handleDismiss}
        >
          X
        </button>
        <button
          className={`flex-1 ${isBlocked ? 'bg-green-500' : 'bg-gray-600'} text-white font-bold py-2 rounded`}
          onClick={handleBlockToggle}
        >
          {isBlocked ? 'Unblock' : 'Block'}
        </button>
        <button
          className="flex-1 bg-orange-500 text-white font-bold py-2 rounded"
          onClick={() => setShowReportModal(true)}
        >
          Report
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lime-400 font-bold">Profile Details</h3>
          <p className="text-sm text-white"><strong>Education:</strong> {profile.user.filters?.basicDetails?.education || 'N/A'}</p>
          <p className="text-sm text-white"><strong>Languages Spoken:</strong> {profile.user.filters?.basicDetails?.languagesSpoken || 'N/A'}</p>
          <p className="text-sm text-white"><strong>Zip Code:</strong> {profile.user.filters?.basicDetails?.zipCode || 'N/A'}</p>
          <p className="text-sm text-white"><strong>Relationship Goals:</strong> {profile.user.filters?.relationshipAndHealth?.relationshipGoals || 'N/A'}</p>
          <p className="text-sm text-white"><strong>Alcohol Use:</strong> {profile.user.filters?.relationshipAndHealth?.alcoholUse || 'N/A'}</p>
          <p className="text-sm text-white"><strong>Cannabis Use:</strong> {profile.user.filters?.relationshipAndHealth?.cannabisUse || 'N/A'}</p>
          <p className="text-sm text-white"><strong>Other Drug Use:</strong> {profile.user.filters?.relationshipAndHealth?.otherDrugUse || 'N/A'}</p>
          {profile.filters?.audioBio && (
            <div className="mt-2">
              <h4 className="text-sm text-lime-400">Audio Bio:</h4>
              <audio controls src={profile.filters.audioBio}></audio>
            </div>
          )}
          {profile.filters?.galleryPics?.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm text-lime-400">Gallery Pictures:</h4>
              <div className="flex space-x-2">
                {profile.filters.galleryPics.map((pic, index) => (
                  <img key={index} src={pic} alt={`Gallery ${index}`} className="w-20 h-20 rounded-lg" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Report User</h2>
            <textarea
              className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white"
              placeholder="Enter your reason for reporting this user..."
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleReport}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MatchResultCard.propTypes = {
  profile: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isBlocked: PropTypes.bool,
    }).isRequired,
    distance: PropTypes.number,
    matchPercentage: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
    totalMatches: PropTypes.number.isRequired,
    filters: PropTypes.shape({
      basicDetails: PropTypes.shape({
        education: PropTypes.string,
        languagesSpoken: PropTypes.string,
        zipCode: PropTypes.string,
      }),
      relationshipAndHealth: PropTypes.shape({
        relationshipGoals: PropTypes.string,
        alcoholUse: PropTypes.string,
        cannabisUse: PropTypes.string,
        otherDrugUse: PropTypes.string,
      }),
      audioBio: PropTypes.string,
      galleryPics: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default MatchResultCard;
