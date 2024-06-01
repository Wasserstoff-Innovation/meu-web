import { useNavigate } from "react-router-dom";
const About = () => {
  const Navigate = useNavigate();
  // const [isVisible, setIsVisible] = useState(true);
  // const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const backNavigate = () => {
    Navigate("/settings");
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center">
        <img
          src="/icons/left-arrow.svg"
          alt="back-navigation"
          className="w-4 h-4 cursor-pointer"
          onClick={backNavigate}
        />
        <div>About</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className=" flex gap-3 bg-[#313436] items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/icons/contract.svg"
            alt="icon"
            className="cursor-pointer w-5 h-5"
          />
          <div>Terms of Services</div>
        </div>
        <div className=" flex gap-3 bg-[#313436] items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/icons/contract.svg"
            alt="block"
            className="cursor-pointer w-5 h-5"
          />
          <div>Privacy Policy</div>
        </div>
        <div className=" flex gap-3 bg-[#313436] items-center border-gray-400 px-4 py-2 rounded-md w-full">
          <img
            src="/icons/contract.svg"
            alt="block"
            className="cursor-pointer w-5 h-5"
          />
          <div>Release Notes</div>
        </div>
      </div>
    </div>
  );
};

export default About;
