import { useContext } from "react";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { Avatar, Chip } from "@nextui-org/react";

const ShareProfile = () => {
  const { savedUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const socialIcons = [
    {
      icon: "/whatsapp.svg",
      url: `https://api.whatsapp.com/send?text=http://localhost:5173/${savedUserData?.data.name}`,
    },
    {
      icon: "/facebook.svg",
      url: `https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/${savedUserData?.data.name}`,
    },
    {
      icon: "/insta.svg",
      url: `https://www.instagram.com/?url=http://localhost:5173/${savedUserData?.data.name}`,
    },
    {
      icon: "/telegram.svg",
      url: `https://t.me/share/url?url=http://localhost:5173/${savedUserData?.data.name}`,
    },
  ];

  return (
    <div className="flex flex-1 flex-col justify-around ">
      <img
        src="/left-arrow.svg"
        alt="navigation-back"
        className="w-5 h-5 mb-4"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex flex-col justify-between  bg-[#E8F4FD] rounded-lg">
        <div className="flex justify-center items-center m-2 rounded-lg">
          <QRCode
            value={`http://localhost:5173/${savedUserData?.data.name}`}
            size={320}
            className="rounded-lg mt-6"
          />
        </div>
        {/* <User
          className="text-black"
          name={savedUserData?.data.name}
          description={savedUserData?.data.purpose}
          avatarProps={{
            src: savedUserData?.data.avatar,
          }}
        /> */}
        <div className="flex justify-between m-4 text-[#1A1D21]">
          <div className="flex flex-col gap-2">
            <div className="self-stretch text-3xl font-bold ">
              {savedUserData?.data.name}
            </div>
            <div className="text-sm">{savedUserData?.data.bio}</div>
            <div className="text-sm">{savedUserData?.data.email}</div>
            <div className="text-sm">{savedUserData?.data.mobile}</div>
            <div className="text-sm">{savedUserData?.data.location}</div>
            <Chip color="success" className="text-sm">
              {savedUserData?.data.purpose}
            </Chip>
          </div>
          <Avatar src={savedUserData?.data.avatar} className="min-w-32 h-32" />
        </div>
        <div className="flex flex-wrap justify-center space-x-4">
          {savedUserData?.data.interests.map((int) => (
            <Chip
              color="primary"
              key={int.value}
              isDisabled
              className="mb-2 mr-1"
            >
              {int.label}
            </Chip>
          ))}
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
