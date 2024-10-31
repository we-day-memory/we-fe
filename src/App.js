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
      message: texts.errors.general
      ,
      type: "error",
    });
  };

  const { brideName, groomName, date } = texts.header;

  return (
    <div className="app">
      <div className="header-image-border">
        <div className="header-images"></div>
      </div>

      <div className="header">
        <h1>{`${brideName}`}</h1>
        <div className="icon-and-text-container">
          <h1 className="groom-name">{`${groomName}`}</h1>
        </div>
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