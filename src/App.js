import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook for Auth0 session management
import Profile from "./Profile"; // Import the Profile component
import TestApi from "./TestApi"; // Import the TestApi component
import { useNavigate } from "react-router-dom"; // useNavigate is used to navigate programmatically

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate(); // useNavigate is used to navigate programmatically

  // State to handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="logo.png" // Ensure the logo image is placed correctly
              alt="Cruise0"
              className="h-8"
            />
            <h1 className="text-white text-2xl font-semibold">Cruise0</h1>
          </div>

          {/* Mobile menu toggle */}
          <div className="block lg:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu} // Toggle the menu visibility when clicked
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round" // Corrected to camelCase
                  strokeLinejoin="round" // Corrected to camelCase
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links for larger screens */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
            <Link to="/test-api" className="text-white hover:text-gray-200">Fetch Repos</Link>

            {/* Login/Logout Button */}
            {!isAuthenticated ? (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => {
                  logout({ returnTo: window.location.origin }); // Ensure proper redirection after logout
                  navigate("/"); // Redirect to the homepage after logout (if needed)
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu: Toggle visibility when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <Link
              to="/"
              className="block text-white hover:text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="block text-white hover:text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/test-api"
              className="block text-white hover:text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Test API
            </Link>

            {/* Login/Logout Button */}
            {!isAuthenticated ? (
              <button
                onClick={() => loginWithRedirect()}
                className="block w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => {
                  logout({ returnTo: window.location.origin });
                  navigate("/");
                }}
                className="block w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Routing to different pages */}
      <Routes>
        <Route
          path="/"
          element={<Homepage user={user} isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <div className="container mx-auto p-6 text-center">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
              <h2 className="font-bold text-xl mb-2">You must log in to see your profile</h2>
              <p>Please log in to view your profile.</p>
            </div>
          </div>}
        />
        <Route
          path="/test-api"
          element={isAuthenticated ? <TestApi /> : <div className="container mx-auto p-6 text-center">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
              <h2 className="font-bold text-xl mb-2">You must log in to test the API</h2>
              <p>Please log in to continue and test the API functionality.</p>
            </div>
          </div>}
        />
      </Routes>
    </div>
  );
}

// Homepage Component (shown when user is not logged in)
const Homepage = ({ user, isAuthenticated, loginWithRedirect }) => (
  <div className="container mx-auto p-6 text-center">
    <h1 className="text-3xl font-bold mb-4">Cruise0</h1>
    {!isAuthenticated ? (
      <div>
        <h2 className="text-xl mb-4">Please log in to continue</h2>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    ) : (
      <div>
        <h2 className="text-xl mb-4">Welcome, {user?.name || "User"}!</h2>
        <p className="text-gray-600">You are now logged in.</p>
      </div>
    )}
  </div>
);

export default App;
