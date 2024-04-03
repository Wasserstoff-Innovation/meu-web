const ShareProfile = () => {
  const socialIcons = [
    {
      icon: "/whatsapp.svg",
    },
    {
      icon: "/facebook.svg",
    },
    {
      icon: "/insta.svg",
    },
    {
      icon: "/telegram.svg",
    }
  ];
  return (
    <div className="flex flex-col py-[45px]">
      <img src="/left-arrow.svg" alt="navigation-back" className="w-6 h-6 mb-8"/>
      <div className="flex flex-col h-[80vh] bg-[#E8F4FD] rounded-lg">
        <div className="flex justify-center items-center w-[97%] h-[70vh] bg-[#09395D] m-2 rounded-lg">
          {/* Content inside this div */}
        </div>
        <div className="flex justify-between m-2 text-[#1A1D21]">
        <div className="flex flex-col">
          <div className="self-stretch text-2xl text-primary-300 font-bold">John Doe</div>
          <div className="font-semibold">@johndoe</div>
          <div>I'm an MEU, where are you</div>
        </div>
        <div className="w-[100px] bg-black rounded-lg border-[1px] border-[black]">
          <img src="" alt=""/>
        </div>
        </div>
      </div>
      <div className="flex flex-col space-y-8 text-2xl mt-6 font-semibold text-[#F9F9F9]">
          <div> Share your profile</div>
          <div className="flex justify-between">
          {socialIcons.map((icon, index) => (
            <div key={index} className="flex items-center justify-center mr-2">
              <img src={icon.icon} alt="" className="w-[50px] h-[50px]" />
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default ShareProfile;
