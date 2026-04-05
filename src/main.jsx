import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  ClerkProvider,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const PUBLISHABLE_KEY =
  "pk_test_YWN0dWFsLWhhZ2Zpc2gtODEuY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/sign-in"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route
            path="/sign-in/*"
            element={
              <div className="auth-container">
                <div className="auth-box">
                  <h1>evol</h1>
                  <p>Collect words you love</p>
                  <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
                </div>
              </div>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <div className="auth-container">
                <div className="auth-box">
                  <h1>evol</h1>
                  <p>Collect words you love</p>
                  <SignUp routing="path" path="/sign-up" />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);