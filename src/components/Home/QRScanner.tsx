import React, { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";
import QrReader from "jsqr";
import { useNavigate } from "react-router-dom";

const QRScanner: React.FC = () => {
  const Navigate = useNavigate();
  const [result, setResult] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  let stream: MediaStream | null = null;
  const [qrCodeResult, setQrCodeResult] = useState<string | null>(null);
  // const [start, setStart] = useState(true);

  const scanQRCode = () => {
    if (
      videoRef.current &&
      videoRef.current.videoWidth &&
      videoRef.current.videoHeight
    ) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const code = QrReader(
          imageData.data,
          imageData.width,
          imageData.height
        );
        if (code) {
          setResult(code.data);
          stopCamera();
        }
      }
    }
  };

  console.log("QR Code -> ", result);

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      console.log(stream);
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

  useEffect(() => {
    const interval = setInterval(scanQRCode, 1000); // Adjust scan interval as needed
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (start) {
  //     startCamera();
  //   }
  //   setStart(false)
  // }, [start]);

  return (
    <div className="p-2">
      <div className="flex items-center justify-between py-4 ">
        <div>
          <img
            src="./arrow_left_alt.svg"
            alt="right arrow"
            className="cursor-pointer"
            onClick={() => {
              stopCamera();
              Navigate("/");
            }}
          />
        </div>
        <div className=" w-full flex justify-center">
          <h1>Scan QR</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center h-[85vh]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <button onClick={startCamera}>Start Camera</button>

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

export default QRScanner;
