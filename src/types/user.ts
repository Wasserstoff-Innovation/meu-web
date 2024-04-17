interface ObjectType {
  label: string;
  value: string;
}

export type IUser = {
  id: string;
  name: string;
  email: string;
  mobile: {
    countryCode:string,
    mobileNumber:string
  };
  location: {
    city:string,
    country:string,
    state:string,
    latitude:number,
    longitude:number
  };
  bio: string;
  avatar: string;
  pronouns: string;
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
