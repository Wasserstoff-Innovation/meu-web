import { useState } from "react";
import QRCode from "qrcode.react";

const ShareProfile = () => {
  const [username] = useState("johndoe");

  const socialIcons = [
    {
      icon: "/whatsapp.svg",
      url: `https://api.whatsapp.com/send?text=http://localhost:5173/${username}`
    },
    {
      icon: "/facebook.svg",
      url: `https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/${username}`
    },
    {
      icon: "/insta.svg",
      url: `https://www.instagram.com/?url=http://localhost:5173/${username}`
    },
    {
      icon: "/telegram.svg",
      url: `https://t.me/share/url?url=http://localhost:5173/${username}`
    }
  ];
  
  return (
    <div className="flex flex-col justify-center">
      <img src="/left-arrow.svg" alt="navigation-back" className="w-5 h-5 mb-4"/>
      <div className="flex flex-col justify-between h-[70vh] bg-[#E8F4FD] rounded-lg">
        <div className="flex justify-center items-center m-2 rounded-lg">
          <QRCode value={`http://localhost:5173/${username}`}  size={320} className="rounded-lg" />
        </div>
        <div className="flex justify-between m-4 text-[#1A1D21]">
          <div className="flex flex-col gap-2">
            <div className="self-stretch text-3xl font-bold ">John Doe</div>
            <div className="text-lg">@{username}</div>
            <div className="text-sm">I'm an MEU, where are you</div>
          </div>
          <div className="w-24 h-24 bg-black rounded-lg border border-black"></div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 text-xl mt-4 font-semibold text-white">
        <div>Share your profile</div>
        <div className="flex justify-between">
          {socialIcons.map((icon, index) => (
            <div key={index} className="flex items-center justify-center">
              <a href={icon.url} target="_blank" rel="noopener noreferrer">
                <img src={icon.icon} alt="" className="w-12 h-12" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareProfile;
