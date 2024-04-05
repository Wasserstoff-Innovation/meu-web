const Footer = () => {
  return (
    <div className="absolute w-[24rem] bottom-0 -mx-6  z-100 bg-[#313437] ">
      <div className="flex justify-around p-4">
        <img src="./map.svg" alt="map" className="size-6 cursor-pointer" />
        <img
          src="./select_window_2.svg"
          alt="select window"
          className="size-6 cursor-pointer"
        />
        <img
          src="./groups.svg"
          alt="groups"
          className="size-8 cursor-pointer"
        />
        <img src="./contract.svg" alt="map" className="size-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
