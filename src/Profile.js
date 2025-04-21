import React, { useState, useEffect } from "react";
import { CalendarIcon, UserIcon, MailIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { useAuth0 } from "@auth0/auth0-react";

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
              alt={userInfo.name}
              className="w-24 h-24 rounded-full border-4 border-blue-500 mr-4"
            />
            <div>
              {/* Displaying User Name and Nickname */}
              <h2 className="text-2xl font-semibold text-blue-700">{userInfo.name}</h2>
              <h3 className="text-gray-600">Username: {userInfo.nickname}</h3>
            </div>
          </div>

          {/* Displaying Additional User Information */}

          <ul className="space-y-3 text-gray-700 mt-4">

          {/* <li className="p-2 bg-gray-100 rounded flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span><strong>User ID:</strong> {userInfo.sub}</span>
            </li> */}

            <li className="p-2 bg-gray-100 rounded flex items-center">
              <MailIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span><strong>Email Address:</strong> {userInfo.email}</span>
            </li>

            <li className="p-2 bg-gray-100 rounded flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span><strong>Registration Date:</strong>{" "}
              {new Date(userInfo.updated_at).toLocaleString()}
              </span>
            </li>

            {userInfo.email_verified ? (
              <li className="p-2 bg-gray-100 rounded flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span><strong>Email Verified:</strong> {userInfo.email_verified.toString()}</span>
              </li>) : (
              <li className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
                <strong class="font-bold text-xl mb-2">⚠ Email Not Verified!</strong>
                <p>Please fix this by clicking on the link that has been sent to your email account.</p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;

