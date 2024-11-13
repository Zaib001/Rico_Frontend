import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/login";
import ProfileCreation from "./pages/ProfileCreationPage";
import SignupForm from "./components/SignupForm";
import MessageScreen from "./components/MessageScreen";
import FindMatches from "./components/FindMatches";
import Footer from "./components/footer";
import MatchResults from "./components/MatchResults";
import { useAuth } from "./context/AuthContext"; // Importing Auth Context

// Private Route Component
const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Static Header */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Header /> } />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/message" element={<MessageScreen />} />
          <Route path="/match" element={<FindMatches />} />
          <Route path="/results" element={<MatchResults />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfileCreation />} />} />
        </Routes>
      </div>
      <Footer /> {/* Static Footer */}
    </div>
  );
}

export default App;
