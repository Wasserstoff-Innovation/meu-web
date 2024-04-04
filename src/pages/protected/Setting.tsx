import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from React Router

const Settings = () => {
  const Navigate = useNavigate();
  const Data = [
    {
      icon: "/interests.svg",
      name: "Interests",
      path: "/settings/interests" // Define the path for each
    },
    {
      icon: "/search.svg",
      name: "Purpose",
      path: "/settings/purpose"
    },
    {
      icon: "/privacy.svg",
      name: "Privacy",
      path: "/settings/privacy"
    },
    {
      icon: "/other.svg",
      name: "Other",
      path: "/settings/other"
    },
  ];

  const About = [
    {
      icon: "/share.svg",
      name: "Share MEU",
      path: "/settings/share"
    },
    {
      icon: "/grade.svg",
      name: "Rate MEU",
      path: "/settings/rate"
    },
    {
      icon: "/help.svg",
      name: "Help",
      path: "/settings/help"
    },
    {
      icon: "/about.svg",
      name: "About",
      path: "/settings/about"
    },
  ];
  const handleNavigation = (path:string) => {
    Navigate(path); // Navigate to the specified path
  };
  const handlenavigate = () =>{
    Navigate("/settings/editProfile")
  }

  return (
    <div className="flex flex-col justify-between h-[95vh] gap-6">
      <div className="flex gap-2  text-2xl cursor-pointer">
        <img src="/left-arrow.svg" alt="back-navigation w-4 h-4" />
        <div>setting</div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex gap-3 bg-[#313437] p-5 rounded-md cursor-pointer" onClick={handlenavigate}>
          <div className="w-12 h-12 rounded-full bg-white">
            <img 
            src="https://s3-alpha-sig.figma.com/img/41bd/111a/617b61c4709a03d3444b62e630fc9ca2?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fzFa2JZZQFXYmu2ML7zzufdA3URFClJHqeYGy2ifR40nDr8gYWI4FktGK4hFqXsnJ6GA~J3JhYmZLcNlSJKFvzY5mV6DQXcLnFAHIAJFlz2oKeIu6hXZuaeCgCXFt8j1anZ9MtY9vsvnN5scB1LgR9S30lC-p05jU3YBJkkYurfQ787CAo7TMJD53IHpHrK-cXQ45PIIQJam5iH~Nm3MZZAjL2nxljDTiZ0D-0C0udb1sfeghjooJ~LiPL-0l91dwifpbYgpOv9ygcVaDUX3eL5KGB1o8F3WaIbc2jbjx~t5enk2byc3YLnN3jSUGDHETbewpqKjQtyex4ryK6S0QA__" alt="" className="rounded-full" />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">John Doe</div>
            <div className="font-semibold text-sm">@johndoe</div>
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
               <div  onClick={() => handleNavigation(data.path)}> 
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