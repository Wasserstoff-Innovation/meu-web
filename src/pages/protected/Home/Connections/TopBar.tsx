import React from "react";
import { useNavigate } from "react-router-dom";

const topBarData = [
  { heading: "Connections", path: "/connections" },
  { heading: "Requests", path: "/requests" },
  { heading: "Sent", path: "/sent" },
];

const App: React.FC = () => {
  const Navigate = useNavigate();
  const pathName = window.location.pathname;
  return (
    <div className=" -mx-6 px-4 pt-4 p-1 flex flex-col gap-4">
      <div className="bg-[#313437] rounded-full px-2 p-1 flex justify-between items-center">
        
        {topBarData.map((top, index) => (
          <div
            key={index}
            className={` cursor-pointer w-full flex justify-center ${
              pathName === top.path && "bg-[#5F6164]  rounded-full"
            }`}
            onClick={() => Navigate(`${top.path}`)}
          >
            <p className="p-1">{top.heading}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;