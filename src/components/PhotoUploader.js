import React, { useState } from "react";
import http from "../services";

function PhotoUploader({ onUploadSuccess, onUploadError }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false); // State to manage spinner visibility

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews(filePreviews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsUploading(true);
    const chunkSize = 10;
    for (let i = 0; i < selectedFiles.length; i += chunkSize) {
      try {
        const chunk = selectedFiles.slice(i, i + chunkSize);
        const formData = new FormData();
        chunk.forEach((file) => {
          formData.append("files", file);
        });
        await http.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        onUploadSuccess();
      } catch (error) {
        onUploadError("Greska!");
        setIsUploading(false);
        throw error;
      }

      setIsUploading(false);
      setSelectedFiles([]);
      setFilePreviews([]);
      setUploadProgress({});

    }
  };

  const handleRemoveImage = (index) => {
    // Remove the image from the selectedFiles array
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newSelectedFiles);

    // Remove the image preview
    const newFilePreviews = filePreviews.filter((_, i) => i !== index);
    setFilePreviews(newFilePreviews);
  };

  return (
    <div className="photo-upload-container">
      {isUploading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="file-input-container">
          <label htmlFor="file-upload" className="file-upload-label">
            Izaberi uspomenu
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>
        {filePreviews.length > 0 && (
          <div className="previews">
            {filePreviews.map((src, index) => (
              <div key={index} className="preview-item">
                <img src={src} alt={`Preview ${index}`} />

                <button
                  className="remove-button"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        {filePreviews.length > 0 && <button className="submit-button" type="submit">Upload</button>}
      </form>
    </div>
  );
}

export default PhotoUploader;
