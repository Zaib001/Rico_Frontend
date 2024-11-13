import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Notification from "./Notification";
import ProfileDropdown from "./ProfileDropdown";
import ProfileCreationModal from "./ProfileCreationModal";
import TestimonialsSection from "./TestimonialsSection";
import HowItWorksSection from "./HowItWorksSection";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Logo.png";

// Initialize Socket.IO client
const socket = io("https://rico-app-backend.onrender.com"); // Adjust URL based on your backend

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Assuming AuthContext provides user info
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileCreationOpen, setIsProfileCreationOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [acceptedLikes, setAcceptedLikes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // Connect to the socket and listen for notifications when the component mounts
  useEffect(() => {
    console.log(user)
    const fetchLikedUsers = async () => {
      try {
        const response = await fetch('https://rico-app-backend.onrender.com/api/users/likedUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data)
        if (data.success) {
          setNotifications(data.likedUsers);
        }
      } catch (error) {
        console.error('Error fetching liked users:', error);
      }
    };

    fetchLikedUsers();

    // Optional: Poll the server periodically (e.g., every 60 seconds)
    const interval = setInterval(fetchLikedUsers, 60000);

    return () => clearInterval(interval);

  }, [user]);

  useEffect(() => {
    const fetchAcceptedLikes = async () => {
      try {
        const response = await fetch('https://rico-app-backend.onrender.com/api/users/acceptedLike', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setAcceptedLikes((prev) => [...prev, ...data.acceptedLikes.map(user => ({ ...user, accepted: true }))]);
        }
      } catch (error) {
        console.error('Error fetching accepted likes:', error);
      }
    };

    fetchAcceptedLikes();
    const interval = setInterval(fetchAcceptedLikes, 60000);

    return () => clearInterval(interval);
  }, [user]);



  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleProfileCreation = () => setIsProfileCreationOpen((prev) => !prev);
  const toggleNotification = () => {
    setIsNotificationOpen((prev) => {
      console.log("Toggling notification state:", !prev);
      return !prev;
    });
  };

  // Scroll animation for the About section
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const aboutVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // Handle accepting a like
  const handleAcceptLike = async (senderId, index) => {
    try {
      const response = await fetch(`https://rico-app-backend.onrender.com/api/users/accept-like/${senderId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this token is valid
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.success) {
        alert('Like accepted! You can now chat with this user.');

        setNotifications(data.user)


        console.log('Accepted user:', data.user);
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error accepting like:', error);
    }
  };




  return (
    <>
      <header
        className="h-screen bg-gray-900 bg-cover bg-center flex flex-col justify-between"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1472608127515-7a7e160c6ab9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <nav className="container mx-auto flex justify-center items-center p-6">
          <div className="flex justify-between items-center w-full max-w-6xl">
            <div className="flex items-center">
              <img src={logo} alt="LiiQwise Logo" className="h-12 mr-4" />
            </div>

            <div className="flex-grow"></div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notification Icon */}
                <div className="relative">
                  <i
                    className="fas fa-bell text-lime-400 text-2xl cursor-pointer"
                    onClick={toggleNotification}
                  ></i>
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                      <Notification
                        notifications={[...notifications, ...acceptedLikes]}
                        toggleNotification={toggleNotification}
                        handleAcceptLike={handleAcceptLike}
                      />
                    </div>
                  )}
                </div>


                {/* Envelope Icon */}
                <Link to="/message">
                  <i className="fas fa-envelope text-lime-400 text-2xl cursor-pointer"></i>
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <i
                    className="fas fa-user-circle text-lime-400 text-2xl cursor-pointer"
                    onClick={toggleDropdown}
                  ></i>
                  <ProfileDropdown
                    isDropdownOpen={isDropdownOpen}
                    toggleProfileCreation={toggleProfileCreation}
                    handleLogout={logout}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-2xl px-6 py-2 bg-transparent border border-lime-400 text-lime-400 rounded-full hover:bg-lime-400 hover:text-black transition-all duration-300 ease-in-out shadow-md"
              >
                Sign in
              </button>
            )}
          </div>
        </nav>



        {/* Profile Creation Modal */}
        <ProfileCreationModal isProfileCreationOpen={isProfileCreationOpen} />

        <div className="container mx-auto flex flex-col items-center justify-center flex-1 text-center px-4 lg:px-8 py-12">
          <motion.div
            className="flex flex-col justify-center items-center"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-lime-400">
              DATING FOR EVERY SINGLE PERSON
            </h1>
            <p className="text-white text-3xl mb-6">
              LiiQwise is the only dating app that matches you on what matters
              to you.
            </p>
            <button className="bg-lime-400 text-2xl text-black py-4 px-6 rounded-full mb-6 hover:bg-lime-500 transition-all duration-300">
              <Link to="/login">Join LiiQwise</Link>
            </button>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={aboutVariants}
          className="container mx-auto text-center px-6"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            About LiiQwise
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-6xl mx-auto mb-12">
            Most dating sites do not actually "Match" you with someone
            compatible. They simply give you lots of profiles to swipe through.
            At LiiQwise, you can only browse profiles that have been matched and
            ranked by our algorithms. This saves you time and shows you more
            quality dates.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6 md:w-1/3"
            >
              <h3 className="text-2xl font-semibold mb-4 text-lime-400">
                Unique Matches
              </h3>
              <p className="text-gray-600">
                See matches that align with your preferences and values.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6 md:w-1/3"
            >
              <h3 className="text-2xl font-semibold mb-4 text-lime-400">
                Advanced Algorithms
              </h3>
              <p className="text-gray-600">
                Our proprietary algorithms are reciprocal, considering both your
                and your match's preferences.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6 md:w-1/3"
            >
              <h3 className="text-2xl font-semibold mb-4 text-lime-400">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Your privacy and safety are our top priorities.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <TestimonialsSection />
      <div className="w-full max-w-6xl mx-auto border-t-[1px] border-gray-800"></div>
      <HowItWorksSection />
    </>
  );
};

export default Header;
