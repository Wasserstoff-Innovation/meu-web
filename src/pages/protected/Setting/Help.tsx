import  { useState } from "react";
import { useNavigate  } from "react-router-dom";


const Privacy = () => {
  // State variables for each switch
  const Navigate =useNavigate ();
  const [isVisible, setIsVisible] = useState(true);
  const backNavigate = () =>{
    Navigate("/settings")
  }

  return (
    <div className="flex flex-col justify-start gap-6">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center ">
        <img src="/icons/left-arrow.svg" alt="back-navigation" className="w-4 h-4 cursor-pointer"
        onClick={backNavigate}
        />
        <div>Help</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className=" flex gap-3 border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src= "/icons/help.svg"
            alt="icon"
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer w-5 h-5"
          />
          <div>Help Center</div>
        </div>
        <div className=" flex gap-3 border items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/icons/contact.svg"
            alt="block"
            className="cursor-pointer w-5 h-5"
          />
          <div>Help Us</div>
        </div>
        </div>
    </div>
  );
};

export default Privacy;
