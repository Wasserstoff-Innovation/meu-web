export type IUser = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  username: string;
  bio: string;
  avatar: string;
  pronounns: string;
  interests: string[];
  purpose: string;
  socials: {
    linkedin: string;
    twitter: string;
    telegram: string;
  };
};
