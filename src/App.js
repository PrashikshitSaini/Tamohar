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

  // Generate particles for animation
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 12; i++) {
      particles.push(<div key={`particle-${i}`} className="particle"></div>);
    }
    return particles;
  };

  // Generate dust particles
  const renderDustParticles = () => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push(<div key={`dust-${i}`} className="dust-particle"></div>);
    }
    return particles;
  };

  // Generate floating orbs
  const renderOrbs = () => {
    return (
      <>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        {/* Enhanced background animations */}
        <div className="cosmic-background">
          <div className="nebula nebula-1"></div>
          <div className="nebula nebula-2"></div>
          <div className="nebula nebula-3"></div>
          <div className="stars"></div>
        </div>

        {/* New soothing animated elements */}
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <div className="aurora-container">
          <div className="aurora"></div>
          <div className="aurora"></div>
        </div>

        <div className="breath-circle"></div>

        <div className="lotus-animation"></div>
        <div className="cosmic-particles">{renderParticles()}</div>
        <div className="cosmic-dust">{renderDustParticles()}</div>
        {renderOrbs()}

        <div className="sacred-geometry">
          <div className="inner-circle"></div>
          <div className="flower-of-life"></div>
        </div>

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
            <Route path="/daily" element={<DailyShlok />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
