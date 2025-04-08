import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Components
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import DailyShlok from "./components/shlok/DailyShlok";
import BookmarksList from "./components/bookmarks/BookmarksList";
import Navbar from "./components/layout/Navbar";
import Settings from "./components/settings/Settings";
import "./App.css";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        {/* Add pure CSS background decorative elements */}
        <div className="app-background"></div>
        <div className="lotus-animation"></div>

        <Navbar />
        <main className="container spiritual-pattern">
          <Routes>
            <Route path="/" element={<DailyShlok />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/bookmarks"
              element={user ? <BookmarksList /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
            />
            {/* Add a catch-all route that redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
