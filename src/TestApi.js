import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const TestApi = () => {
  const [username, setUsername] = useState(""); // Track the input value for the username
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiRequest = () => {
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError(null);

    // Update the URL with the provided username
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error testing API: " + error.message);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">GitHub Repo Fetcher</h1>

      {/* Input for GitHub Username */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
        />
      </div>

      <div>
        <button
          onClick={handleApiRequest}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mb-4"
        >
          {loading ? "Working..." : "Fetch repos"}
        </button>

        {/* Loading State */}
        {loading && (
          <div className="text-blue-500 font-bold">Loading data...</div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-200 text-red-800 p-4 rounded mt-4">
            <strong>Error: </strong> {error}
          </div>
        )}

        {/* API Response */}
        {apiResponse && !loading && (
          <div className="bg-gray-100 p-4 rounded mt-4 border-2 border-gray-300 shadow-lg text-left">
            <h2 className="text-xl font-bold mb-2">API Response:</h2>
            <SyntaxHighlighter
              language="json"
              style={github} // Using the github theme for syntax highlighting
              className="font-mono"
            >
              {JSON.stringify(apiResponse, null, 2)} {/* Ensure correct formatting */}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestApi;
