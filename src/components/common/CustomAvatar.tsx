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
      maxWidthOrHeight: 300,
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
      content={
        <>
          <label htmlFor="avatar">
            {loading ? (
              <Spinner />
            ) : (
              <img src="/camara.svg" alt="camera" className="h-9 w-8" />
            )}
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChangeImage}
            hidden
            id="avatar"
            disabled={loading}
          />
        </>
      }
      placement="bottom-right"
    >
      <a href={src} target="_blank">
        <Avatar src={src} className="self-center w-32 h-32 cursor-pointer" />
      </a>
    </Badge>
  );
};

export default CustomAvatar;
