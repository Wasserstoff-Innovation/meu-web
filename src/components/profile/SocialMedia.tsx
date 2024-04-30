import { IUserwithPrivateData } from "../../types/user";

type SocialMediaProps = {
  linkedIn?: IUserwithPrivateData["privateData"]["linkedin"];
  twitter?: IUserwithPrivateData["privateData"]["twitter"];
};

const SocialMedia = ({ linkedIn, twitter }: SocialMediaProps) => {
  const data = [
    // { icon: "../04 Infinity Mark HEX black @2x.svg", name: "infinite" },
    {
      icon: "../Vector.svg",
      name: "linkedin",
      verified: !!linkedIn?.email_verified,
      url: `https://www.linkedin.com/in/${linkedIn?.name}`,
    },
    // { icon: "../telegram.svg", name: "telegram" },
    {
      icon: "../twitter.svg",
      name: "twitter",
      verified: !!twitter?.username,
      url: `https://twitter.com/${twitter?.username}`,
    },
    // { icon: "../internet.svg", name: "internet" },
    // { icon: "../link.svg", name: "link" },
  ];
  return (
    <div className="flex gap-4 justify-start">
      {data.map((social, index) => {
        if (social.verified)
          return (
            <div
              className="bg-white p-1 sm:p-2 sm:px-4 cursor-pointer rounded-full"
              key={index}
            >
              <img
                src={social.icon}
                alt={social.name}
                className="size-[16px] "
              />
            </div>
          );
      })}
    </div>
  );
};

export default SocialMedia;
