

export interface IUser {
  userId: string;
  name: string;
  bio: string;
  avatar: string;
  pronouns: string;
  interests: string[];
  purpose: string;
}

export interface PrivateData {
  email: string;
  mobile: {
    countryCode: string;
    mobileNumber: string;
  };
  location: {
    city: string;
    country: string;
    state: string;
    latitude: number;
    longitude: number;
  };
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
}

export interface IUserwithPrivateData extends IUser {
  privateData: PrivateData;
}
