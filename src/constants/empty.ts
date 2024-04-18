import { IUserwithPrivateData } from "../types/user";

export const EmptyUser: IUserwithPrivateData = {
  id: "",
  name: "",
  bio: "Hi ,I am on MEU",
  avatar:
    "https://gravatar.com/avatar/352f4215d50c5b4f6763e3d29b7fb1d5?s=400&d=robohash&r=x",
  pronouns: "he/him",
  interests: [],
  purpose: "networking",
  privateData: {
    email: "",
    mobile: {
      countryCode: "+91",
      mobileNumber: "",
    },
    location: {
      city: "",
      state: "",
      country: "",
      latitude: 0,
      longitude: 0,
    },
    linkedin: {
      email: "",
      email_verified: false,
      name: "",
      picture: "",
    },
    twitter: {
      id: "",
      username: "",
      name: "",
    },
    telegram: "",
  },
};
