import React, { useState } from "react";
import { Switch } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const Privacy = () => {
  const Navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const backNavigate = () =>{
    Navigate("/settings")
  }

  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center">
        <img src="/left-arrow.svg" alt="back-navigation" className="w-4 h-4 cursor-pointer"
        onClick={backNavigate}/>
        <div>Other</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className=" flex gap-3 border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src= "/icons/clear.svg"
            alt="icon"
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer w-5 h-5"
          />
          <div> Clear Cache</div>
        </div>
        <div className=" flex gap-3 border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/icons/haptic.svg"
            alt="block"
            className="cursor-pointer w-5 h-5"
          />
          <div> Enable Haptic Feedback</div>
        </div>
        <div className=" flex gap-3 border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/icons/request.svg"
            alt="block"
            className="cursor-pointer w-5 h-5"
          />
          <div className="flex justify-between w-full ">
            <div> Notification</div>
            <Switch defaultSelected={isNotificationEnabled} onChange={() => setIsNotificationEnabled(!isNotificationEnabled)}></Switch>
          </div>
        </div>
        <div className=" flex justify-center bg-[#DB4437] px-4 py-2 rounded-md w-full">
          
          <div>Request Data</div>
        </div>
        
      </div>
    </div>
  );
};

export default Privacy;
