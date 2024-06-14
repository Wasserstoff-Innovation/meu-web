import { IUserwithPrivateData } from "../../types/user";

type SocialMediaProps = {
  linkedIn?: IUserwithPrivateData["privateData"]["linkedin"];
  twitter?: IUserwithPrivateData["privateData"]["twitter"];
};

const SocialMedia = ({ linkedIn, twitter }: SocialMediaProps) => {
  const data = [
    // { icon: "/icons/04 Infinity Mark HEX black @2x.svg", name: "infinite" },
    {
      icon: "/icons/Vector.svg",
      name: "linkedin",
      verified: !!linkedIn?.email_verified,
      url: `https://www.linkedin.com/in/${linkedIn?.name}`,
    },
    // { icon: "../telegram.svg", name: "telegram" },
    {
      icon: "/icons/twitter.svg",
      name: "twitter",
      verified: !!twitter?.username,
      url: `https://twitter.com/${twitter?.username}`,
    },
    // { icon: "/icons/internet.svg", name: "internet" },
    // { icon: "/icons/link.svg", name: "link" },
  ];
  return (
    <div className="flex gap-4 justify-start">
      {data.map((social, index) => {
        if (social.verified)
          return (
            <a href={social.url}
              className="bg-white p-1 sm:p-2 sm:px-4 cursor-pointer rounded-full"
              key={index}
            >
              <img
                src={social.icon}
                alt={social.name}
                className="size-[16px]"
              />
            </a>
          );
      })}
    </div>
  );
};

export default SocialMedia;
