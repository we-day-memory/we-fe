import React, { useState } from "react";
import PhotoUploader from "./components/PhotoUploader";
import Notification from "./components/notif";
import "./assets/main.scss";
import texts from "./constants/texts.js";

function App() {
  const [notification, setNotification] = useState(null);

  const handleUploadSuccess = () => {
    setNotification({
      message: texts.notifications.success,
      type: "success",
    });
  };

  const handleUploadError = () => {
    setNotification({
      message: `${texts.errors.general} ${error}`,
      type: "error",
    });
  };

  const { brideName, groomName, date } = texts.header;

  return (
    <div className="app">
      <div className="header-image-border">
        <img src="/src/assets/headerImage.png" alt="Wedding Header" className="header-image" />
      </div>

      <div className="header">
        <h1>{`${brideName} i ${groomName}`}</h1>
      </div>

      <div className="date">
        <p>{date}</p>
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
};

export default App;