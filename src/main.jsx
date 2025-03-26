import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_VuG436BdF",
  client_id: "391l637f81q72p6mfhdadaeavq",
  redirect_uri: "https://example.com",
  response_type: "code",
  scope: "openid",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

Amplify.configure(config);

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);