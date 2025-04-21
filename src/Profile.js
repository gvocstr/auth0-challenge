import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import the hook from Auth0

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0(); // Access user data from Auth0
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user) {
      setUserInfo(user); // Set the user data when it's loaded
    }
  }, [user]);

  // Loading and Authentication Check
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {/* User Profile Display */}
      {userInfo && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <div className="flex items-center mb-4">
            {/* Profile Picture */}
            <img
              src={userInfo.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mr-4"
            />
            <div>
              {/* Displaying User Name and Nickname */}
              <h2 className="text-2xl font-semibold text-blue-700">{userInfo.name}</h2>
              <p className="text-gray-600">Nickname: {userInfo.nickname}</p>
            </div>
          </div>

          {/* Displaying Additional User Information */}
          <div className="mt-4">
            <p className="text-gray-500">
              <strong>Account Created At:</strong>{" "}
              {new Date(userInfo.updated_at).toLocaleString()}
            </p>
            <p className="text-gray-500">
              <strong>User ID:</strong> {userInfo.sub}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
