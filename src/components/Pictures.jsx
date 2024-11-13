// src/components/BasicDetailsForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { useProfileContext } from "../context/ProfileContext";
import { FaCamera, FaSave, FaTrash, FaMicrophone, FaPlay, FaStop } from "react-icons/fa";

const Pictures = ({ isMatchBuilding = false }) => {
  const { profileData, updateProfile } = useProfileContext();
  const [bio, setBio] = useState(profileData.bio || "");
  const [galleryPics, setGalleryPics] = useState(profileData.pictures?.galleryPics || []);
  const [capturedImage, setCapturedImage] = useState(profileData.pictures?.profilePicture || null);
  const [audioURL, setAudioURL] = useState(profileData.pictures?.audioBio || null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const image = canvasRef.current.toDataURL("image/png");
    setCapturedImage(image);
    updateProfile("pictures", { profilePicture: image }); // Update profile picture in context
    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };

  const handleBioChange = (e) => {
    const updatedBio = e.target.value;
    console.log("Updated Bio:", updatedBio, typeof updatedBio); // Should log as a string
    setBio(updatedBio);
    updateProfile("bio", updatedBio);
  };
  

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    console.log('Generated gallery image URLs:', fileURLs); // Debug log
    setGalleryPics([...galleryPics, ...fileURLs]);
    updateProfile("pictures", { galleryPics: [...galleryPics, ...fileURLs] });
  };

  const saveBio = () => {
    console.log("Saving bio as:", bio, typeof bio); // Should log as a string
    updateProfile("bio", bio);
  };
  

  const deleteBio = () => {
    setBio("");
    updateProfile("bio", ""); // Clear bio in context
  };

  // Audio Recording Functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
  
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
  
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        console.log("Audio Blob:", audioBlob, "Size:", audioBlob.size); // Debug log
        if (audioBlob.size > 0) {
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          updateProfile("pictures", { audioBio: audioUrl }); // Update audio bio in context
        } else {
          console.error("Empty audio blob, skipping update.");
        }
      };
  
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  };
  

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
    console.log('Stopped recording:', audioURL); // Debug log
  };
  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL); // Release the object URL when component unmounts
      }
    };
  }, [audioURL]);
  
  return (
    <div className="space-y-4 md:space-y-0 md:space-x-4">
      {/* Main Content */}
      <div className="space-y-4">
        <div className="-mt-48">
          {capturedImage ? (
            <img src={capturedImage} alt="Profile" className="rounded-lg w-48 h-48 shadow-lg" />
          ) : (
            <video ref={videoRef} autoPlay className="w-48 h-48 rounded-lg shadow-lg"></video>
          )}
          <canvas ref={canvasRef} width="192" height="192" className="hidden"></canvas>
        </div>
        <div className="flex justify-center flex-wrap space-x-4">
          <button
            onClick={startCamera}
            className="bg-lime-400 text-black px-2  py-2 rounded-full flex items-center space-x-2 whitespace-nowrap"
          >
            <FaCamera /> <span>Start Camera</span>
          </button>
          <button
            onClick={captureImage}
            className="bg-lime-400 text-black px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap"
          >
            <FaCamera /> <span>Capture Image</span>
          </button>
          <button
            onClick={stopCamera}
            className="bg-red-500 mt-3 text-white px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap"
          >
            <FaCamera /> <span>Stop Camera</span>
          </button>
        </div>
      </div>

      {/* Bio Section */}
      <div >
        <h3 className="text-lime-400 font-semibold mt-10">Bio</h3>
        <textarea
          className="w-full h-48 p-2 rounded-lg bg-gray-700 text-white"
          value={bio}
          onChange={handleBioChange}
          placeholder="Add text Bio Here, Maximum 2000 characters"
          maxLength={2000}
        ></textarea>
        <div className="flex space-x-2 mt-2">
          <button onClick={saveBio} className="bg-lime-400 text-black px-4 py-2 rounded-full">
            Save Text
          </button>
          <button onClick={deleteBio} className="bg-red-500 text-white px-4 py-2 rounded-full">
            Delete Text
          </button>
        </div>
      </div>

      {/* Gallery Upload */}
      <div>
        <h3 className="text-lime-400 font-semibold mt-10">Gallery Pictures</h3>
        <input
          type="file"
          multiple
          onChange={handleGalleryUpload}
          className="mt-2 w-full bg-gray-700 text-white p-2 rounded"
        />
        <div className="flex flex-wrap space-x-2 mt-2">
          {galleryPics.map((pic, index) => (
            <img key={index} src={pic} alt={`Gallery ${index}`} className="w-20 h-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Voice Note Section */}
      <div>
        <h3 className="text-lime-400 font-semibold mt-10">Recorded Bio</h3>
        <div className="flex flex-col md:flex-row justify-center items-center space-x-2">
          {audioURL && (
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <audio controls src={audioURL} className="inline-block w-40"></audio>
              <button
                onClick={() => {
                  setAudioURL(null);
                  updateProfile("pictures", { audioBio: null }); // Delete audio bio in context
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap"
              >
                <FaTrash /> <span>Delete BIO</span>
              </button>
            </div>
          )}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-lime-400 text-black px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap"
            >
              <FaMicrophone /> <span>Record BIO</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap"
            >
              <FaStop /> <span>Stop Recording</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default Pictures;
