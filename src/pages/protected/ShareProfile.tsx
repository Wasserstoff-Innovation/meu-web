import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@nextui-org/react";
import { useAppSelector } from "../../redux/hooks";
import { getProfileUrl } from "../../utils";

const ShareProfile = () => {
  const { userDoc } = useAppSelector((state) => state.main);
  const navigate = useNavigate();
  const profileUrl = getProfileUrl(userDoc?.data.userId) 
  const socialIcons = [
    {
      name: "Whatapp",
      icon: "/whatsapp.svg",
      url: `https://api.whatsapp.com/send?text=${profileUrl}`,
    },
    {
      name: "Facebook",
      icon: "/facebook.svg",
      url: `https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`,
    },
    {
      name: "Instagram",
      icon: "/insta.svg",
      url: `https://www.instagram.com/?url=${profileUrl}`,
    },
    {
      name: "Telegram",
      icon: "/telegram.svg",
      url: `https://t.me/share/url?url=${profileUrl}`,
    },
  ];

  return (
    <div className="flex flex-1 flex-col px-6">
      <div className="py-4">
        <img
          src="/left-arrow.svg"
          alt="navigation-back"
          className="size-5 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="flex flex-col justify-between bg-[#E8F4FD] p-2 rounded-lg">
        <div className="flex justify-center items-center ">
          <div className="bg-[#09395D] rounded-lg p-4">
            <QRCode
              value={profileUrl}
              size={300}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-[#1A1D21] px-4 p-2">
          <div className="flex flex-col gap-2 h-full">
            <div className="self-stretch text-3xl font-bold ">
              {userDoc?.data.name}
            </div>
            <div className="text-sm">{userDoc?.data.bio}</div>
          </div>
          <Avatar
            src={userDoc?.data.avatar || "/avatar.png"}
            className="min-w-32 h-32 rounded-md border-2 border-black"
          />
        </div>
      </div>

      <div
        className="flex flex-col py-4 gap-4
       text-xl font-semibold text-white"
      >
        <div>Share your profile</div>
        <div className="flex justify-between">
          {socialIcons.map((icon, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center font-thin text-lg">
                <a href={icon.url} target="_blank" rel="noopener noreferrer">
                  <img src={icon.icon} alt="" className="w-12 h-12" />
                </a>
                <p>{icon.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareProfile;
