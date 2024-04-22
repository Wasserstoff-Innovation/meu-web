import React, { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";
import QrReader from "jsqr";
import { useNavigate } from "react-router-dom";

const QRScanner: React.FC = () => {
  const Navigate = useNavigate();
  // const [result, setResult] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  let stream: MediaStream | null = null;
  const [qrCodeResult, setQrCodeResult] = useState<string | null>(null);
  // const [start, setStart] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(true);

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
          setQrCodeResult(code.data);
          stopCamera();
        }
      }
    }
  };

  const startCamera = async () => {
    if (!stream) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        // console.log(stream);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError(true);
      }
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
      stream = null;
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
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
              stopCamera();
              setQrCodeResult(code.data);
              setActive(false);
              // Assuming `stopCamera` is a function you've defined somewhere to stop the camera
            } else {
              setActive(true);
              setQrCodeResult("No QR code found in the uploaded image.");
              console.log("No QR code found in the uploaded image.");
            }
          }
        };
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
    if (!stream) {
      startCamera();
    }

    return () => {
      stopCamera();
      clearInterval(interval);
    };
  }, []);

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
          <div className="flex items-center justify-center">
            <div className="border-2 border-[#1272BA] p-4 rounded-md size-[240px] flex items-center justify-center relative">
              {error ? (
                <div className="text-[red]">
                  You haven't permission to access the camera. <br /> <br />
                  You can Upload QR Code from Gallery.
                </div>
              ) : (
                <>
                  <video ref={videoRef} className=""></video>
                  <div className="absolute bg-transparent  w-full h-full p-2">
                    {/* animate-[animationName_easingFunction_durationInSeconds_iterationsCount_delayInSeconds_direction] */}
                    {active && (
                      <div
                        className="h-1 bg-[#45A5ED]  shadow-[0_0_6px_1px_rgba(69,165,237,1)]
                      animate-[scanning_1s_ease-in-out_infinite_alternate]
                    "
                      ></div>
                    )}
                  </div>
                </>
              )}
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
            <div className="bg-[#313437] rounded-full p-4">
              <img
                src="./icons/qr_code.svg"
                alt="my-qr-code"
                className="size-4"
              />
            </div>
            <p className="">My QR</p>
          </div>
          <label
            htmlFor="qr"
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
            onClick={() => handleFromFile()}
          >
            <div className="p-4 bg-[#313437] rounded-full">
              <img src="./icons/photo.svg" alt="gallery" className="size-4" />
            </div>
            <p className="">
              Scan from <br />
              Gallery
            </p>
          </label>
          <div className="cursor-pointer flex flex-col items-center justify-center gap-1">
            <div className="p-4 bg-[#313437] rounded-full">
              <img
                src="./icons/flashlight.svg"
                alt="flashlight"
                className="size-5"
              />
            </div>
            <p>Flash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
