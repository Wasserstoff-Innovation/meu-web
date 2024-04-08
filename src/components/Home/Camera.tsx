import React, { useRef, useState } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";

const CameraComponent: React.FC = () => {
  const Navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  let stream: MediaStream | null = null;

  const [qrCodeResult, setQrCodeResult] = useState<string | null>(null);
  const [isCameraStopped, setIsCameraStopped] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      console.log(stream);
      detectQRCode();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const detectQRCode = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (videoRef.current && context) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrCodeResult(code.data);
        setIsCameraStopped(true);
      } else {
        setQrCodeResult(null);
        if (!isCameraStopped) {
          requestAnimationFrame(detectQRCode);
        }
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = new Image();
        imageData.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (context) {
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            context.drawImage(imageData, 0, 0);
            const imageDataFromCanvas = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR(
              imageDataFromCanvas.data,
              imageDataFromCanvas.width,
              imageDataFromCanvas.height
            );
            if (code) {
              setQrCodeResult(code.data);
            } else {
              setQrCodeResult("No QR code found in the uploaded image.");
            }
          }
        };
        reader.readAsDataURL(file);
        imageData.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFromFile = () => {
    fileInputRef.current?.onclick;
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between py-4 ">
        <div>
          <img src="./arrow_left_alt.svg" alt="right arrow" />
        </div>
        <div className=" w-full flex justify-center">
          <h1>Scan QR</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center h-[85vh]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {!isCameraStopped && (
              <>
                <button onClick={startCamera}>Start Camera</button>
              </>
            )}
            <button onClick={stopCamera}>Stop Camera</button>
          </div>

          <div className="flex items-center justify-center">
            <div className="border-2 border-[#1272BA] p-4 rounded-md size-[240px] flex items-center justify-center">
              <video ref={videoRef} className=""></video>
            </div>
          </div>
          {qrCodeResult && <p>Detected QR code: {qrCodeResult}</p>}
        </div>
        <input
          type="file"
          id="qr"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          hidden
        />
        {/* icons  */}
        <div className="flex justify-evenly w-full  gap-2 items-start">
          <div
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
            onClick={() => Navigate("/share-profile")}
          >
            <div className="bg-[#313437] rounded-full p-2">
              <img
                src="./icons/qr_code.svg"
                alt="my-qr-code"
                className="size-4"
              />
            </div>
            <p className="text-[10px]">My QR</p>
          </div>
          <label
            htmlFor="qr"
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
            onClick={() => handleFromFile()}
          >
            <div className="p-2 bg-[#313437] rounded-full">
              <img src="./icons/photo.svg" alt="gallery" className="size-4" />
            </div>
            <p className="text-[8px]">
              Scan from <br />
              Gallery
            </p>
          </label>
          <div className="cursor-pointer">
            <div className="p-1 bg-[#313437] rounded-full">
              <img
                src="./icons/flashlight.svg"
                alt="flashlight"
                className="size-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
