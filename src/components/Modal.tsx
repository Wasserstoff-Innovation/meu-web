import React, { useState } from "react";
import Modal from "react-modal";
import { RiCamera2Line, RiImageAddLine } from "react-icons/ri";

Modal.setAppElement("#root");

interface ImagePickerModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCameraOpen: () => void;
  onGalleryOpen: () => void;
  onSaveImage: (imageUrl: string) => void;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onRequestClose,
  onCameraOpen,
  onGalleryOpen,
  onSaveImage,
}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  const handleCapture = () => {
    // Logic to capture image from camera
    const capturedImageUrl = "captured_image_url"; // Replace this with the actual captured image URL
    setCapturedImage(capturedImageUrl);
    setIsCameraOpen(false); // Close the camera after capturing
  };

  const handleSave = () => {
    if (capturedImage) {
      onSaveImage(capturedImage);
      onRequestClose();
    }
  };

  const handleCameraOpen = () => {
    setIsCameraOpen(true);
    onCameraOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Picker Modal"
      className="w-full max-w-sm mx-auto mt-20 p-4 bg-white rounded-md shadow-lg"
    >
      <h2 className="text-lg font-semibold mb-4">Choose an Option</h2>
      <button
        className="flex items-center justify-center w-full py-2 mb-2 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none"
        onClick={handleCameraOpen}
      >
        <RiCamera2Line className="mr-2" /> Open Camera
      </button>
      <button
        className="flex items-center justify-center w-full py-2 mb-2 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none"
        onClick={onGalleryOpen}
      >
        <RiImageAddLine className="mr-2" /> Choose from Gallery
      </button>
      {isCameraOpen && (
        <button
          className="block w-full mt-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none hover:bg-gray-200"
          onClick={handleCapture}
        >
          Capture
        </button>
      )}
      {capturedImage && (
        <div className="flex justify-center mt-4">
          <img src={capturedImage} alt="Captured" className="w-40 h-40 rounded-md" />
        </div>
      )}
      {capturedImage && (
        <button
          className="block w-full mt-4 py-2 text-sm text-white bg-primary-500 rounded-md focus:outline-none hover:bg-primary-600"
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </Modal>
  );
};

export default ImagePickerModal;
