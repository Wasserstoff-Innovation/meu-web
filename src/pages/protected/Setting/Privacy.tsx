import  { useState } from "react";
import { Switch } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const Navigete =useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isDiscoverable, setIsDiscoverable] = useState(true);
  const [isMapNavigationEnabled, setIsMapNavigationEnabled] = useState(true);
  
  const backNavigate = () =>{
    Navigete("/settings")
  }
  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center">
        <img src="/left-arrow.svg" alt="back-navigation" className="w-4 h-4 cursor-pointer" 
        onClick={backNavigate}
        />
        <div>Privacy</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className=" flex gap-3 border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src= "/!visibility.svg"
            alt="icon"
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer w-5 h-5"
          />
          <div> Hidden User</div>
        </div>
        <div className=" flex gap-3 border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/block.svg"
            alt="block"
            className="cursor-pointer w-5 h-5"
          />
          <div> Blocked User</div>
        </div>
        <div className=" flex gap-3  border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/notification.svg"
            alt="notification"
            className="cursor-pointer w-5 h-5"
          />
          <div className="flex justify-between w-full ">
            <div> Notification</div>
            <Switch defaultSelected={isNotificationEnabled} onChange={() => setIsNotificationEnabled(!isNotificationEnabled)}></Switch>
          </div>
        </div>
        <div>When enabled, you will receive notifications when you get a new connection request</div>
        <div className=" flex gap-3  border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/discoverable.svg"
            alt="discoverable"
            className="cursor-pointer w-5 h-5"
          />
          <div className="flex justify-between w-full ">
            <div> Discoverable</div>
            <Switch defaultSelected={isDiscoverable} onChange={() => setIsDiscoverable(!isDiscoverable)}></Switch>
          </div>
        </div>
        <div>When enabled, others will see your profile in their recommendations</div>
        <div className=" flex gap-3  border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/compass.svg"
            alt="map-navigation"
            className="cursor-pointer w-5 h-5"
          />
          <div className="flex justify-between w-full ">
            <div> Map Navigation</div>
            <Switch defaultSelected={isMapNavigationEnabled} onChange={() => setIsMapNavigationEnabled(!isMapNavigationEnabled)}></Switch>
          </div>
        </div>
        <div>When enabled, you will be able to discover others and get directions to their location and vice-versa</div>
      </div>
    </div>
  );
};

export default Privacy;
