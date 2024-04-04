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
    <div className="flex flex-col p-[-10px] justify-center">
      <img src="/left-arrow.svg" alt="navigation-back" className="w-5 h-5 mb-4"/>
      <div className="flex flex-col h-[75vh] bg-[#E8F4FD] rounded-lg">
        <div className="flex justify-center items-center h-[65vh] bg-[#09395D] m-2 rounded-lg">
          {/* Content inside this div */}
        </div>
        <div className="flex justify-between m-2 text-[#1A1D21]">
        <div className="flex flex-col gap-2">
          <div className="self-stretch text-3xl text-[#1A1D21] font-bold ">John Doe</div>
          <div className="text-lg font-semibold">@johndoe</div>
          <div className="text-sm font-semibold">I'm an MEU, where are you</div>
        </div>
        <div className="w-[100px] h-[120px] bg-black rounded-lg border-[1px] border-[black]">
          <img src="" alt=""/>
        </div>
        </div>
      </div>
      <div className="flex flex-col space-y-8 text-2xl mt-4 font-semibold text-[#F9F9F9]">
          <div> Share your profile</div>
          <div className="flex justify-between">
          {socialIcons.map((icon, index) => (
            <div key={index} className="flex items-center justify-center mr-2">
              <img src={icon.icon} alt="" className="w-[60px] h-[60px]" />
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default ShareProfile;
