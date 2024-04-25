import { IUser, IUserwithPrivateData } from "./user";

export type IConnection = {
  connectionId: string;
  user: IUser;
};

export type IConnectionwithPrivateData = {
  connectionId: string;
  user: IUserwithPrivateData;
};
