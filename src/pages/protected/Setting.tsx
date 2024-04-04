import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from React Router

const Settings = () => {
  const Navigate = useNavigate();
  const Data = [
    {
      icon: "/interests.svg",
      name: "Interests",
      path: "/interests" // Define the path for each
    },
    {
      icon: "/search.svg",
      name: "Purpose",
      path: "/purpose"
    },
    {
      icon: "/privacy.svg",
      name: "Privacy",
      path: "/privacy"
    },
    {
      icon: "/other.svg",
      name: "Other",
      path: "/other"
    },
  ];

  const About = [
    {
      icon: "/share.svg",
      name: "Share MEU",
      path: "/share"
    },
    {
      icon: "/grade.svg",
      name: "Rate MEU",
      path: "/rate"
    },
    {
      icon: "/help.svg",
      name: "Help",
      path: "/help"
    },
    {
      icon: "/about.svg",
      name: "About",
      path: "/about"
    },
  ];
  const handleNavigation = (path:string) => {
    Navigate(path); // Navigate to the specified path
  };

  return (
    <div className="flex flex-col justify-between h-[95vh] gap-6">
      <div className="flex gap-2  text-2xl">
        <img src="/left-arrow.svg" alt="back-navigation w-4 h-4" />
        <div>setting</div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex gap-3 bg-[#313437] p-5 rounded-md cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white">
            <img src="" alt="" />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">John Doe</div>
            <div className="font-semibold text-sm">@johndoe</div>
          </div>
        </div>

        <div className="font-semibold text-lg mt-4">SETTING</div>
        <div className="flex flex-col bg-[#313437] rounded-md">
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
            <div>
               <div key={index} onClick={() => handleNavigation(data.path)}> 
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
      </div>
      <div>
        <div className="w-full text-center bg-[#313437] text-[#DB4437] p-2">
          <button>Logout</button>
        </div>
        <div className="h-10 bg-foreground text-center text-white p-4 w-full">
          <p>Made with ❤️ in India, at Wasserstoff</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;