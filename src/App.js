import React, { useState } from "react";
import PhotoUploader from "./components/PhotoUploader";
import Notification from "./components/notif";
import "./assets/global.scss";

function App() {
  const [notification, setNotification] = useState(null);

  const handleUploadSuccess = () => {
    setNotification({
      message: "Uspesno sacuvano!",
      type: "success",
    });
  };

  const handleUploadError = (error) => {
    setNotification({ message: `Dogodila se greska: ${error}`, type: "error" });
  };

  return (
    <div className="App">
      <div className="welcome-text">
        <p>Hvala sto ste deo nase price!</p>
        <h1>Ines i Nikola</h1>
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
