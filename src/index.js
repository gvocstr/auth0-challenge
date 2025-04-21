import React from "react";
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import './index.css';

// Replace with your Auth0 app credentials
const domain = "gvocstr-tam.us.auth0.com";
const clientId = "rudiXBNhZ71RBbaEmWs551gXSN1LpJ5k";

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);
