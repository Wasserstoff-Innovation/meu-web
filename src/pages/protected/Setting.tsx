import { useNavigate } from "react-router-dom";
import { signOut } from "@junobuild/core";
import { useAppSelector } from "../../redux/hooks";
import { persistor } from "../../redux/store";
import { Avatar } from "@nextui-org/react";

const Settings = () => {
  const navigate = useNavigate();
  const { userDoc } = useAppSelector((state) => state.main);
  const Data = [
    {
      icon: "/interests.svg",
      name: "Interests",
      path: "/settings/interests",
    },
    {
      icon: "/search.svg",
      name: "Purpose",
      path: "/settings/purpose",
    },
    {
      icon: "/privacy.svg",
      name: "Privacy",
      path: "/settings/privacy",
    },
    {
      icon: "/other.svg",
      name: "Other",
      path: "/settings/other",
    },
  ];

  const About = [
    {
      icon: "/share.svg",
      name: "Share MEU",
      path: "/settings/share",
    },
    {
      icon: "/grade.svg",
      name: "Rate MEU",
      path: "/settings/rate",
    },
    {
      icon: "/help.svg",
      name: "Help",
      path: "/settings/help",
    },
    {
      icon: "/about.svg",
      name: "About",
      path: "/settings/about",
    },
  ];
  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the specified path
  };
  const handlenavigate = () => {
    navigate("/settings/editProfile");
  };

  return (
    <div className="flex flex-1 flex-col justify-around gap-2 ">
      <div className="flex gap-2 mt-4  text-2xl cursor-pointer">
        <div className="flex gap-2 items-center p-2 ">
          <img
            src="/left-arrow.svg"
            alt="back-navigation w-4 h-4"
            onClick={() => {
              navigate("/");
            }}
          />
          Setting
        </div>
      </div>
      <div className="flex flex-col flex-1 h-[70vh]">
        <div
          className="flex gap-3 bg-[#313437] p-5 rounded-md cursor-pointer"
          onClick={handlenavigate}
        >
          <Avatar src={userDoc?.data.avatar} size="lg" />
          <div className="flex flex-col">
            <div className="font-bold text-xl">{userDoc?.data.name}</div>
            <div className="font-semibold text-sm">{userDoc?.data.purpose}</div>
            {userDoc?.updated_at ? (
              <div className="text-sm">
                Last Updated on:{" "}
                {new Date(Number(userDoc?.updated_at)).toDateString()}
              </div>
            ) : null}
          </div>
        </div>

        <div className="font-semibold text-lg mt-4">SETTING</div>
        <div className="flex flex-col bg-[#313437] rounded-md cursor-pointer">
          {Data.map((data, index) => (
            <div key={index} onClick={() => handleNavigation(data.path)}>
              <div className="flex gap-2 items-center p-2 ">
                <img src={data.icon} alt="icon" className="w-4 h-4" />
                <div>{data.name}</div>
              </div>
              {data.name !== "Other" && (
                <hr className="border-[#D9D9D9] border-[0.5px]" />
              )}
            </div>
          ))}
        </div>

        <div className="font-semibold text-lg mt-4">ABOUT</div>
        <div className="flex flex-col bg-[#313437] rounded-md">
          {About.map((data, index) => (
            <div key={index}>
              <div onClick={() => handleNavigation(data.path)}>
                <div className="flex gap-2 items-center p-2 cursor-pointer">
                  <img src={data.icon} alt="icon" className="w-4 h-4" />
                  <div>{data.name}</div>
                </div>
                {index < About.length - 1 && (
                  <hr className="border-[#D9D9D9] border-[0.5px]" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div
            className="w-full text-center mt-6 bg-[#313437] text-[#DB4437] p-2"
            onClick={async () => {
              console.log("signing out");
              await signOut();
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("isOnBoarded");
              await persistor.purge();
              navigate("/login");
            }}
          >
            <button>Logout</button>
          </div>
        </div>
        <div className="h-10  bg-foreground text-center text-white p-4 w-full">
          <p>Made with ❤️ in India, at Wasserstoff</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
