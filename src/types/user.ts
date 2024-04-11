interface ObjectType {
  label: string;
  value: string;
}

export type IUser = {
  name: string;
  email: string;
  mobile: string;
  location: string;
  bio: string;
  avatar: string;
  pronounns: string;
  interests: ObjectType[];
  purpose: string;
  linkedin: {
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
  };
  twitter: {
    id: string;
    username: string;
    name: string;
  };
  telegram: string;
};
