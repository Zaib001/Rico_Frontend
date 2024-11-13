import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { FilterProvider } from "./context/FilterContext";
import { ProfileProvider } from "./context/ProfileContext";
import { AuthProvider } from "./context/AuthContext"; // Importing Auth Context
import { BrowserRouter } from "react-router-dom";

// Ensure BrowserRouter wraps everything
createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* Only one BrowserRouter */}
    <AuthProvider>
      <FilterProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </FilterProvider>
    </AuthProvider>
  </BrowserRouter>
);
