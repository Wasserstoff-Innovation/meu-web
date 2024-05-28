import { Avatar, Badge, Spinner } from "@nextui-org/react";
import imageCompression from "browser-image-compression";
import React, { useContext, useState } from "react";
import { uploadAvatar } from "../../api/juno/uploader";
import { AuthContext } from "../../context/Auth";

type CustomAvatarProps = {
  src: string;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
};
const CustomAvatar = ({ src, setSrc }: CustomAvatarProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    setLoading(true);
    console.log(imageFile);
    if (!imageFile) return;
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 1 / 3,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      );
      console.log(compressedFile);
      const result = await uploadAvatar(compressedFile, user);
      console.log(result);
      if (!result) return;
      setSrc(result.downloadUrl);
    } catch (error) {
      console.error("Error compressing image: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
      <Badge
      className="top-[250px] right-[220px]"
        content={
          <>
            <div className="text center bg-transparent flex justify-center items-center">
            <label htmlFor="avatar">
              {loading ? (
                <Spinner />
              ) : (
                <img src="/icons/camara.svg" alt="camera" className="" />
              )}
            </label>
            <p className="mx-2">Update Profile Picture</p>       
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChangeImage}
              hidden
              id="avatar"
              disabled={loading}
            />
            </div>
          </>
        }
        
      >
        {/* <a href={src} target="_blank" className="bg-slate-800 w-full">
          <img src={src} className=" w-96 h-60 cursor-pointer" />
        </a> */}

        <div className="relative">
          <a href={src} target="_blank" className="w-full">
            <img
              src={src}
              className="w-[450px] h-72 cursor-pointer"
            />
          </a>
          <div className="absolute bottom-0 left-0 w-full h-36" style={{
              background: 'linear-gradient(to bottom, transparent, rgba(17, 24, 28, 0.1), rgba(17, 24, 28, 0.2), rgba(17, 24, 28, 0.3), rgba(17, 24, 28, 0.4), rgba(17, 24, 28, 0.5), rgba(17, 24, 28, 0.6), rgba(17, 24, 28, 0.7), rgba(17, 24, 28, 0.8), rgba(17, 24, 28, 0.9), rgb(17, 24, 28))'
            }}/>
          
        </div>
      </Badge>
  );
};

export default CustomAvatar;
