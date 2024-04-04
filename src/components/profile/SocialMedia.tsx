const data = [
  { icon: "./04 Infinity Mark HEX black @2x.svg", name: "infinite" },
  { icon: "./Vector.svg", name: "linkedin" },

  { icon: "./telegram.svg", name: "telegram" },
  { icon: "./twitter.svg", name: "twitter" },
  { icon: "./internet.svg", name: "internet" },
  { icon: "./link.svg", name: "link" },
];

const SocialMedia = () => {
  return (
    <div className="flex gap-2 justify-evenly">
      {data.map((social, index) => (
        <div
          className="bg-white p-1 sm:p-2 sm:px-4 cursor-pointer rounded-full"
          key={index}
        >
          <img src={social.icon} alt={social.name} className="size-[16px] " />
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
