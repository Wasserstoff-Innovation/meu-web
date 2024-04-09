interface ObjectType {
    label: string;
    value: string;
}

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
  interests: ObjectType[];
  purpose: string;
  socials: {
    linkedin: string;
    twitter: string;
    telegram: string;
  };
};
