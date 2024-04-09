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
  linkedin: string;
  twitter: {
    id: string;
    username: string;
    name: string;
  };
  telegram: string;
};
