interface ObjectType {
  label: string;
  value: string;
}

// city:address.city,
//       state:address.state,
//       country:address.country,
//       lattitude:address.lattitude,
//       longitude:address.longitude

export type IUser = {
  name: string;
  email: string;
  mobile: string;
  location: {
    city:string,
    country:string,
    state:string,
    latitude:number,
    longitude:number
  };
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
