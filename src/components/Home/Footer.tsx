import { useNavigate } from "react-router-dom";

const Footer = () => {
  const Navigate = useNavigate();
  return (
    <div className="sticky bottom-0  -mx-6   z-10 bg-[#313437] ">
      <div className="flex justify-around items-center p-4">
        <div onClick={() => Navigate("/map-view")}>
          <img src="./map.svg" alt="map" className="size-6 cursor-pointer" />
        </div>
        <div onClick={() => Navigate("/")}>
          <img
            src="./select_window_2.svg"
            alt="select window"
            className="size-6 cursor-pointer"
          />
        </div>
        <div onClick={() => Navigate("/connections")}>
          <img
            src="./groups.svg"
            alt="groups"
            className="size-8 cursor-pointer"
          />
        </div>
        <div onClick={() => Navigate("/contracts")}>
          <img
            src="./contract.svg"
            alt="map"
            className="size-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
