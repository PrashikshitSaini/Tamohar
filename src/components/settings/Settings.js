import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  db,
  auth,
  requestNotificationPermission,
} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Settings = () => {
  const [user] = useAuthState(auth);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState("08:00");
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const fetchUserSettings = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setNotificationsEnabled(
            userData.preferences?.notificationsEnabled ?? true
          );
          setNotificationTime(
            userData.preferences?.notificationTime ?? "08:00"
          );
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, [user]);

  const handleSaveSettings = async () => {
    if (!user) return;

    try {
      // Request notification permission if enabling notifications
      if (notificationsEnabled) {
        const token = await requestNotificationPermission();
        if (!token) {
          setSaveMessage(
            "Notification permission denied. Please enable notifications in your browser settings."
          );
          return;
        }
      }

      await updateDoc(doc(db, "users", user.uid), {
        "preferences.notificationsEnabled": notificationsEnabled,
        "preferences.notificationTime": notificationTime,
      });

      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveMessage("Error saving settings. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading settings...</div>;
  }

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {saveMessage && (
        <div
          className={`message ${
            saveMessage.includes("Error") ? "error" : "success"
          }`}
        >
          {saveMessage}
        </div>
      )}

      <div className="settings-card">
        <div className="settings-section">
          <h3>Notifications</h3>

          <div className="setting-item">
            <label htmlFor="notifications-toggle" className="toggle-label">
              Daily Notifications
              <div className="toggle-description">
                Receive a new Gita shlok every day
              </div>
            </label>

            <div className="toggle-switch">
              <input
                type="checkbox"
                id="notifications-toggle"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
              <label
                htmlFor="notifications-toggle"
                className="switch-label"
              ></label>
            </div>
          </div>

          {notificationsEnabled && (
            <div className="setting-item">
              <label htmlFor="notification-time" className="input-label">
                Notification Time
                <div className="input-description">
                  Choose when to receive your daily shlok
                </div>
              </label>
              <input
                type="time"
                id="notification-time"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
              />
            </div>
          )}
        </div>

        <button onClick={handleSaveSettings} className="btn-primary">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
