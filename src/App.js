import React, { useState } from "react";
import PhotoUploader from "./components/PhotoUploader";
import Notification from "./components/notif";
import "./assets/main.scss";
import texts from './constants/texts.js';

function App() {
  const [notification, setNotification] = useState(null);

  const handleUploadSuccess = () => {
    setNotification({
      message: texts.notifications.success,
      type: "success",
    });
  };

  const handleUploadError = (error) => {
    setNotification({ message: `${texts.errors.general} ${error}`, type: "error" });
  };

  return (
    <div className="App">
      <div className="welcome-text">
        <p>{texts.header.introMessage}</p>
        <h1>{texts.header.brideName} i {texts.header.groomName}</h1>
      </div>

      <PhotoUploader
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
